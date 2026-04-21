/**
 * scripts.js
 * Lógica compartida: sidebar, navbar, footer, accesibilidad y sorteo de equipos.
 * Se carga en todas las páginas del proyecto.
 */

// Función global para alternar submenús del sidebar
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.toggle('active');
        const btn = document.querySelector(`[aria-controls="${menuId}"]`);
        if (btn) {
            const isOpen = menu.classList.contains('active');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const chevron = btn.querySelector('.sidebar-chevron');
            if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Cargar navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('/components/navbar.html')
            .then(res => res.text())
            .then(html => {
                navbarContainer.innerHTML = html;

                // Marcar el enlace activo según la ruta actual
                const currentPath = window.location.pathname;
                navbarContainer.querySelectorAll('.nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === '/index.html'))) {
                        link.setAttribute('aria-current', 'page');
                        link.classList.add('active');
                        const parentSubmenu = link.closest('.submenu');
                        if (parentSubmenu) {
                            parentSubmenu.classList.add('active');
                            const btn = document.querySelector(`[aria-controls="${parentSubmenu.id}"]`);
                            if (btn) {
                                btn.setAttribute('aria-expanded', 'true');
                                const chevron = btn.querySelector('.sidebar-chevron');
                                if (chevron) chevron.style.transform = 'rotate(180deg)';
                            }
                        }
                    }
                });

                // Sidebar toggle (desktop icon-rail / mobile overlay)
                const toggleBtn = document.getElementById('sidebar-toggle-btn');
                const openBtn   = document.getElementById('sidebar-open-btn');
                const overlay   = document.getElementById('sidebar-overlay');
                const isMobile  = () => window.innerWidth <= 768;

                const collapseDesktop = () => {
                    document.body.classList.add('sidebar-collapsed');
                    localStorage.setItem('sidebar-collapsed', 'true');
                };
                const expandDesktop = () => {
                    document.body.classList.remove('sidebar-collapsed');
                    localStorage.setItem('sidebar-collapsed', 'false');
                };
                const openMobile  = () => document.body.classList.add('sidebar-open');
                const closeMobile = () => document.body.classList.remove('sidebar-open');

                if (!isMobile() && localStorage.getItem('sidebar-collapsed') === 'true') {
                    collapseDesktop();
                }

                if (toggleBtn) {
                    toggleBtn.addEventListener('click', () => {
                        if (isMobile()) closeMobile();
                        else document.body.classList.contains('sidebar-collapsed') ? expandDesktop() : collapseDesktop();
                    });
                }
                if (openBtn)  openBtn.addEventListener('click',  openMobile);
                if (overlay)  overlay.addEventListener('click',  closeMobile);
            })
            .catch(err => console.error('Error al cargar el navbar:', err));
    }

    // Cargar footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        fetch('/components/footer.html')
            .then(res => res.text())
            .then(html => { footerContainer.innerHTML = html; })
            .catch(err => console.error('Error al cargar el footer:', err));
    }

    // Panel de accesibilidad
    const accessibilityBtn   = document.getElementById('accessibility-btn');
    const accessibilityPanel = document.getElementById('accessibility-panel');

    if (accessibilityBtn && accessibilityPanel) {
        accessibilityBtn.addEventListener('click', () => {
            accessibilityPanel.style.display =
                accessibilityPanel.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('increase-text').addEventListener('change', e => {
            document.documentElement.style.fontSize = e.target.checked ? '1.2rem' : '1rem';
        });
        document.getElementById('high-contrast').addEventListener('change', e => {
            document.body.style.backgroundColor = e.target.checked ? '#000' : '';
            document.body.style.color           = e.target.checked ? '#fff' : '';
        });
        document.getElementById('readable-font').addEventListener('change', e => {
            document.body.style.fontFamily = e.target.checked ? "'Arial', sans-serif" : "'Rubik', sans-serif";
        });
        document.getElementById('underline-links').addEventListener('change', e => {
            document.querySelectorAll('a').forEach(a => {
                a.style.textDecoration = e.target.checked ? 'underline' : 'none';
            });
        });
    }

    // Sorteo de equipos
    const sorteoBtn = document.getElementById('sorteoBtn');
    if (sorteoBtn) {
        sorteoBtn.addEventListener('click', realizarSorteo);
    }
});

function realizarSorteo() {
    let lideres   = ['David Castro', 'Bryant Dzul', 'Michael Alavez'];
    let miembrosA = ['Castillo Pinzón', 'Salomón Campos', 'Diaz León'];
    let miembrosB = ['Inurreta Brito', 'Pool Cruz', 'Barbosa Vidal'];
    let proyectos = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3'];

    const pick = arr => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
    const equipos = [];

    while (lideres.length > 0) {
        equipos.push({
            lider:    pick(lideres),
            miembroA: pick(miembrosA),
            miembroB: pick(miembrosB),
            proyecto: pick(proyectos),
        });
    }

    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    resultDiv.innerHTML = '';

    equipos.forEach((equipo, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <strong>Equipo ${index + 1}:</strong><br>
                <strong>Líder:</strong> ${equipo.lider}<br>
                <strong>Miembro A:</strong> ${equipo.miembroA}<br>
                <strong>Miembro B:</strong> ${equipo.miembroB}<br>
                <strong>Proyecto:</strong> ${equipo.proyecto}
            `;
            resultDiv.appendChild(div);
            div.style.opacity = 0;
            div.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                div.style.transition = 'opacity 0.5s, transform 0.5s';
                div.style.opacity = 1;
                div.style.transform = 'translateY(0)';
            }, 50);
        }, index * 1500);
    });
}
