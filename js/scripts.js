window.animSpeed    = parseFloat(localStorage.getItem('animSpeed') || '1.75');
window.getAnimDelay = ms => Math.round(ms / window.animSpeed);

function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.toggle('active');
        const btn = document.querySelector(`[aria-controls="${menuId}"]`);
        if (btn) {
            const isOpen = menu.classList.contains('active');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            btn.classList.toggle('active', isOpen);
            const chevron = btn.querySelector('.accordion-icon');
            if (chevron) chevron.style.transform = isOpen ? 'rotate(-180deg)' : '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('/components/navbar.html')
            .then(res => res.text())
            .then(html => {
                navbarContainer.innerHTML = html;

                const currentPath = window.location.pathname;
                navbarContainer.querySelectorAll('a.nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && (currentPath === href || (currentPath === '/' && href === '/index.html'))) {
                        link.classList.add('active');
                        const parentSubmenu = link.closest('.submenu');
                        if (parentSubmenu) {
                            parentSubmenu.classList.add('active');
                            const btn = document.querySelector(`[aria-controls="${parentSubmenu.id}"]`);
                            if (btn) {
                                btn.setAttribute('aria-expanded', 'true');
                                btn.classList.add('active');
                                const chevron = btn.querySelector('.accordion-icon');
                                if (chevron) chevron.style.transform = 'rotate(-180deg)';
                            }
                        }
                    }
                });

                const menuToggle = document.getElementById('menu-toggle');
                const sidebar    = document.getElementById('sidebar');
                const isMobile   = () => window.innerWidth <= 768;

                function setSidebarOpen(open) {
                    const icon = menuToggle ? menuToggle.querySelector('i') : null;
                    if (isMobile()) {
                        if (open) sidebar && sidebar.classList.add('open');
                        else      sidebar && sidebar.classList.remove('open');
                    } else {
                        if (open) {
                            document.body.classList.remove('sidebar-collapsed');
                            localStorage.setItem('sidebarOpen', '1');
                        } else {
                            document.body.classList.add('sidebar-collapsed');
                            localStorage.setItem('sidebarOpen', '0');
                        }
                    }
                    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
                }

                const saved = localStorage.getItem('sidebarOpen');
                if (saved !== null) setSidebarOpen(saved === '1');
                else setSidebarOpen(!isMobile());

                if (menuToggle) {
                    menuToggle.addEventListener('click', () => {
                        const isOpen = isMobile()
                            ? (sidebar && sidebar.classList.contains('open'))
                            : !document.body.classList.contains('sidebar-collapsed');
                        setSidebarOpen(!isOpen);
                    });
                }

                document.addEventListener('click', e => {
                    if (isMobile() && sidebar && sidebar.classList.contains('open')) {
                        if (!sidebar.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
                            setSidebarOpen(false);
                        }
                    }
                });

                function applyTheme(theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                    localStorage.setItem('theme', theme);
                    const icon  = document.getElementById('theme-icon');
                    const label = document.getElementById('theme-label');
                    if (icon)  icon.className  = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
                    if (label) label.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
                }

                const themeBtn = document.getElementById('theme-toggle-btn');
                if (themeBtn) {
                    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
                    themeBtn.addEventListener('click', () => {
                        const cur = document.documentElement.getAttribute('data-theme');
                        applyTheme(cur === 'dark' ? 'light' : 'dark');
                    });
                }
            })
            .catch(err => console.error('Error al cargar el navbar:', err));
    }

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('/components/footer.html')
            .then(res => res.text())
            .then(html => { footerContainer.innerHTML = html; })
            .catch(err => console.error('Error al cargar el footer:', err));
    }

    const accessibilityBtn   = document.getElementById('accessibility-btn');
    const accessibilityPanel = document.getElementById('accessibility-panel');

    if (accessibilityBtn && accessibilityPanel) {
        accessibilityBtn.addEventListener('click', () => {
            accessibilityPanel.classList.toggle('d-none');
        });

        document.getElementById('increase-text').addEventListener('change', e => {
            document.documentElement.style.fontSize = e.target.checked ? '1.2rem' : '1rem';
        });
        document.getElementById('high-contrast').addEventListener('change', e => {
            document.body.style.backgroundColor = e.target.checked ? '#000' : '';
            document.body.style.color           = e.target.checked ? '#fff' : '';
        });
        document.getElementById('readable-font').addEventListener('change', e => {
            document.body.style.fontFamily = e.target.checked ? "'Arial', sans-serif" : "'Outfit', sans-serif";
        });
        document.getElementById('underline-links').addEventListener('change', e => {
            document.querySelectorAll('a').forEach(a => {
                a.style.textDecoration = e.target.checked ? 'underline' : 'none';
            });
        });
    }

    document.addEventListener('show.bs.modal', e => {
        const ANIM_IDS = ['animationModal', 'shellSortModal', 'radixSortModal'];
        if (!ANIM_IDS.includes(e.target.id)) return;

        const header = e.target.querySelector('.modal-header');
        if (header && !header.querySelector('.anim-speed-ctrl')) {
            const speed = window.animSpeed;
            const ctrl  = document.createElement('div');
            ctrl.className = 'anim-speed-ctrl d-flex align-items-center gap-2 ms-auto';
            ctrl.innerHTML = `
                <label for="animSpeedSlider" class="text-muted small mb-0 text-nowrap">
                    <i class="fa-solid fa-gauge-simple-high"></i>&nbsp;Velocidad:
                </label>
                <input type="range" class="form-range" id="animSpeedSlider"
                       min="0.5" max="3.5" step="0.25" value="${speed}"
                       style="width:90px">
                <span id="animSpeedLabel" class="text-muted small text-nowrap">${speed}&times;</span>`;
            header.appendChild(ctrl);
            ctrl.querySelector('#animSpeedSlider').addEventListener('input', ev => {
                window.animSpeed    = parseFloat(ev.target.value);
                window.getAnimDelay = ms => Math.round(ms / window.animSpeed);
                localStorage.setItem('animSpeed', window.animSpeed);
                ctrl.querySelector('#animSpeedLabel').textContent = `${window.animSpeed}×`;
            });
        }

        const body = e.target.querySelector('.modal-body');
        if (body) {
            let badge = body.querySelector('.anim-step-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'anim-step-badge';
                body.appendChild(badge);
            }
            badge.textContent  = 'Paso 0';
            badge.dataset.step = '0';
        }
    });

    initScrollReveal();
});

function initScrollReveal() {
    const targets = document.querySelectorAll('section, .card, table, .alert, .list-group, .pregunta-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    targets.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}
