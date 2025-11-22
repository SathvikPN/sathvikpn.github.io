/* 
 * Main JavaScript
 * Handles component loading, active state, and markdown rendering.
 */

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponents();
    initTime();
    initMobileMenu();
    highlightActiveLink();
    
    // Check if we are on the post page
    if (window.location.pathname.endsWith('post.html')) {
        loadPost();
    }
});

async function loadComponents() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (navbarPlaceholder) {
        try {
            const response = await fetch('components/navbar.html');
            const html = await response.text();
            navbarPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
    }

    if (footerPlaceholder) {
        try {
            const response = await fetch('components/footer.html');
            const html = await response.text();
            footerPlaceholder.innerHTML = html;
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.style.color = 'var(--text-primary)';
        } else {
            link.classList.remove('active');
        }
    });
}

function initTime() {
    function updateIndianTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: "numeric", hour12: true
        }).replace(/am|pm/i, m => m.toUpperCase());
        const text = `${timeString} · Bengaluru`;

        const desktopTime = document.getElementById('indian-time');
        const mobileTime = document.getElementById('indian-time-mobile');

        if (desktopTime) desktopTime.textContent = text;
        if (mobileTime) mobileTime.textContent = text;
    }

    updateIndianTime();
    setInterval(updateIndianTime, 1000);
}

function initMobileMenu() {
    // Since navbar is loaded dynamically, we need to use event delegation or wait for it to load
    // But since we await loadComponents(), we can attach listeners here.
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.style.display === 'none';
            mobileMenu.style.display = isHidden ? 'block' : 'none';
        });
    }
}

async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    const contentContainer = document.getElementById('post-content');
    const titleContainer = document.getElementById('post-title');
    const dateContainer = document.getElementById('post-date');

    if (!slug) {
        contentContainer.innerHTML = '<p>Post not found.</p>';
        return;
    }

    try {
        const response = await fetch(`posts/${slug}.md`);
        if (!response.ok) throw new Error('Post not found');
        
        const markdown = await response.text();
        
        // Simple frontmatter parsing (if needed in future, for now just rendering body)
        // Assuming the first line might be a title or we just render everything.
        // Let's use marked.js to render
        
        if (window.marked) {
            contentContainer.innerHTML = window.marked.parse(markdown);
            
            // Optional: Extract title from H1 if present
            const h1 = contentContainer.querySelector('h1');
            if (h1) {
                document.title = `${h1.innerText} - Sathvik PN`;
                if (titleContainer) titleContainer.innerText = h1.innerText;
                h1.style.display = 'none'; // Hide H1 if we are displaying it separately
            }
        } else {
            contentContainer.innerText = markdown;
        }

    } catch (error) {
        console.error('Error loading post:', error);
        contentContainer.innerHTML = '<p>Error loading post.</p>';
    }
}
