
/*
 * Deepwork Timer and Todo List
 */

document.addEventListener('DOMContentLoaded', () => {
    initTimer();
    initTodo();
    initEmailForm();
});

/* -------------------------------------------------------------------------- */
/*                                    Timer                                   */
/* -------------------------------------------------------------------------- */
function initTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const lapDisplay = document.getElementById('lap-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(elapsedTime);

        // Calculate laps (every 20 minutes)
        const minutes = Math.floor(elapsedTime / 60);
        const laps = Math.floor(minutes / 20);
        lapDisplay.textContent = `deepwork session ${laps + 1}`;
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        // Adjust start time to account for previously elapsed time
        // We use setInterval for simplicity in this context, but Date.now() delta is more accurate for long periods.
        // Let's use Date.now() to prevent drift.
        const startTimestamp = Date.now() - (elapsedTime * 1000);

        timerInterval = setInterval(() => {
            const now = Date.now();
            elapsedTime = Math.floor((now - startTimestamp) / 1000);
            updateDisplay();
        }, 1000);
    }

    function pauseTimer() {
        if (!isRunning) return;

        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        clearInterval(timerInterval);
    }

    function resetTimer() {
        pauseTimer();
        elapsedTime = 0;
        updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

/* -------------------------------------------------------------------------- */
/*                                    Todo                                    */
/* -------------------------------------------------------------------------- */
function initTodo() {
    const todoBody = document.getElementById('todo-body');
    const addTaskBtn = document.getElementById('add-task-btn');

    function createRow() {
        const tr = document.createElement('tr');
        tr.className = 'todo-row';
        tr.innerHTML = `
            <td><input type="text" class="todo-input" placeholder="Task..."></td>
            <td class="text-center"><input type="checkbox" class="todo-check"></td>
            <td><input type="text" class="todo-input" placeholder="Remarks..."></td>
        `;
        return tr;
    }

    addTaskBtn.addEventListener('click', () => {
        const newRow = createRow();
        todoBody.appendChild(newRow);
        // Focus on the first input of the new row
        newRow.querySelector('input').focus();
    });

    // Optional: Add strikethrough style when checked
    todoBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('todo-check')) {
            const row = e.target.closest('tr');
            const taskInput = row.querySelector('td:first-child .todo-input');
            if (e.target.checked) {
                taskInput.style.textDecoration = 'line-through';
                taskInput.style.color = 'var(--text-muted)';
            } else {
                taskInput.style.textDecoration = 'none';
                taskInput.style.color = 'var(--text-secondary)';
            }
        }
    });
}

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
                    messageDiv.textContent = 'welcome to my list, ' + user + ' 🎉';
                    messageDiv.style.color = 'var(--text-muted)';
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    messageDiv.textContent = 'error.';
                    messageDiv.style.color = 'red';
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}
