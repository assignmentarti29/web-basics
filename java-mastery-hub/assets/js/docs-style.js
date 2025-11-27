/**
 * Java Mastery Hub - MkDocs Material Theme Scripts
 * Handles theme switching, navigation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initCodeBlocks();
    initScrollSpy();
});

/**
 * Theme Management
 * Handles toggling between light and dark modes and persisting preference
 */
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('span') : null;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('md-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'slate' || (!savedTheme && systemDark)) {
        setTheme('slate');
    } else {
        setTheme('default');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-md-color-scheme');
            const newTheme = currentTheme === 'slate' ? 'default' : 'slate';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        body.setAttribute('data-md-color-scheme', theme);
        localStorage.setItem('md-theme', theme);

        // Update icon if exists
        if (icon) {
            icon.textContent = theme === 'slate' ? '☀️' : '🌙';
        }
    }
}

/**
 * Navigation Handling
 * Manages mobile sidebar toggle and active state highlighting
 */
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const sidebar = document.querySelector('.md-sidebar');
    const overlay = document.createElement('div');

    // Create overlay for mobile
    overlay.className = 'md-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5); z-index: 80;
        display: none; opacity: 0; transition: opacity 0.2s;
    `;
    document.body.appendChild(overlay);

    if (navToggle && sidebar) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        overlay.addEventListener('click', toggleSidebar);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    }

    function toggleSidebar() {
        const isActive = sidebar.classList.toggle('active');

        if (isActive) {
            overlay.style.display = 'block';
            setTimeout(() => overlay.style.opacity = '1', 10);
        } else {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.style.display = 'none', 200);
        }
    }

    // Sidebar Toggle Logic for Nested Items
    const toggles = document.querySelectorAll('.md-nav__toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.md-nav__item--nested');
            parent.classList.toggle('md-nav__item--expanded');
        });
    });

    // Highlight active link based on current URL
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.md-nav__link');

    // Clear any potentially wrong active classes first
    links.forEach(link => link.classList.remove('md-nav__link--active'));

    links.forEach(link => {
        // Strict matching
        if (link.href === window.location.href) {
            link.classList.add('md-nav__link--active');

            // Ensure parent is expanded if child is active
            const parentItem = link.closest('.md-nav__item--nested');
            if (parentItem) {
                parentItem.classList.add('md-nav__item--expanded');
            }
        }
    });
}

/**
 * Code Block Enhancements
 * Adds copy-to-clipboard functionality to all pre blocks
 */
function initCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        // Create copy button
        const button = document.createElement('button');
        button.className = 'md-clipboard';
        button.title = 'Copy to clipboard';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;

        // Add button to block
        block.style.position = 'relative';
        block.appendChild(button);

        // Handle click
        button.addEventListener('click', async () => {
            const code = block.querySelector('code');
            const text = code ? code.innerText : block.innerText;

            try {
                await navigator.clipboard.writeText(text);

                // Visual feedback
                const originalIcon = button.innerHTML;
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00bfa5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                button.style.opacity = '1';

                setTimeout(() => {
                    button.innerHTML = originalIcon;
                    button.style.opacity = '';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

/**
 * Scroll Spy & Smooth Scroll
 * Handles back-to-top button and smooth scrolling
 */
function initScrollSpy() {
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'md-fab md-fab--bottom-right';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed; bottom: 2rem; right: 2rem;
        width: 3rem; height: 3rem; border-radius: 50%;
        background: var(--md-primary-fg-color); color: white;
        border: none; cursor: pointer; font-size: 1.5rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        opacity: 0; transform: scale(0); transition: all 0.3s;
        z-index: 90; display: flex; align-items: center; justify-content: center;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'scale(1)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'scale(0)';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
