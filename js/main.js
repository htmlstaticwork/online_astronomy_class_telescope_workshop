document.addEventListener('DOMContentLoaded', () => {
    // 0. Premium Header — Add .scrolled class on scroll for glow effect
    const header = document.querySelector('header');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run on load
    }
    // 1. Dark Mode Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const moonIcon = '<i data-lucide="moon"></i>';
    const sunIcon = '<i data-lucide="sun"></i>';
    
    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggles.forEach(toggle => {
            toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        });
        lucide.createIcons();
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    });

    // FAQ Accordion
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    lucide.createIcons();

    // RTL Toggle Logic — persists via localStorage
    const rtlToggles = document.querySelectorAll('.rtl-toggle');

    const applyDir = (dir) => {
        document.documentElement.dir = dir;
        localStorage.setItem('dir', dir);
    };

    // Restore saved direction on load
    const savedDir = localStorage.getItem('dir') || 'ltr';
    applyDir(savedDir);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.dir || 'ltr';
            applyDir(currentDir === 'ltr' ? 'rtl' : 'ltr');
        });
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });

    // 2. Mobile Menu Logic (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Optional: Change hamburger icon to 'X' if open
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 3. Dashboard Sidebar Toggle Logic
    const dashHamburger = document.getElementById('dash-hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (dashHamburger && sidebar) {
        const openSidebar = () => {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        dashHamburger.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }
    }

    // Note: The custom IntersectionObserver logic has been removed in favor of the global AOS library
    // to ensure a single, consistent animation engine across the platform.
});
