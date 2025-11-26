document.addEventListener('DOMContentLoaded', () => {
    initEmailForm();
});

/* -------------------------------------------------------------------------- */
/*                                 Email Form                                 */
/* -------------------------------------------------------------------------- */
function initEmailForm() {
    const placeholder = document.getElementById('email-form-placeholder');
    if (!placeholder) return;

    // Load the component
    fetch(`components/email-form.html?t=${new Date().getTime()}`)
        .then(response => response.text())
        .then(html => {
            placeholder.innerHTML = html;
            setupFormListeners();
        })
        .catch(err => console.error('Error loading email form:', err));

    function setupFormListeners() {
        const form = document.getElementById('email-form');
        const messageDiv = document.getElementById('form-message');

        // REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzO5zw20VIybHAyrBEqn2wF-XKonxAvUM7J5GzSH5bLp5MAUSPzqa49W8d0Lk0FH1M/exec';

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (SCRIPT_URL === '') {
                messageDiv.textContent = 'Error: Script URL not configured.';
                messageDiv.style.color = 'red';
                return;
            }

            const emailInput = document.getElementById('email-input');
            const submitBtn = form.querySelector('button[type="submit"]');

            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '...';
            submitBtn.disabled = true;
            messageDiv.textContent = '';

            const formData = new FormData(form);

            // Add a client-side device ID for rate limiting (since GAS can't see IPs)
            let deviceId = localStorage.getItem('deepwork_device_id');
            if (!deviceId) {
                deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
                localStorage.setItem('deepwork_device_id', deviceId);
            }
            formData.append('deviceId', deviceId);

            // We use no-cors because Google Apps Script redirects, which CORS blocks.
            // However, with no-cors we can't read the response.
            // Standard practice for simple forms is to assume success if no network error.
            fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
                .then(() => {
                    let user = formData.get("email").split("@")[0];
                    messageDiv.textContent = 'accepted ' + user + ' 🎉';
                    messageDiv.style.color = 'var(--text-muted)';
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    messageDiv.textContent = 'system busy, send hi on x/twitter';
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}
