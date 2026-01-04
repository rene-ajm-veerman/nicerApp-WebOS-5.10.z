class naVividMenu {
  constructor(menuElId = 'siteMenu', openBtnId = 'btnShowStartMenu') {
    const menu = document.getElementById(menuElId);
    if (!menu) return;

    const openBtn = document.getElementById(openBtnId);

    if (menu.dataset.initialized) return;
    menu.dataset.initialized = 'true';

    // Add classes
    menu.querySelectorAll('li').forEach(li => {
      li.classList.add('menu-item');
      if (li.querySelector('ul')) li.classList.add('has-submenu');
    });
    menu.querySelectorAll('ul ul').forEach(ul => ul.classList.add('submenu'));
    if (menu.firstElementChild?.tagName === 'UL') {
      menu.firstElementChild.classList.add('menu-root');
    }

    // Progressive z-index for deep nesting
    let baseZ = 100000000;
    menu.style.zIndex = baseZ; // Main menu

    const submenus = menu.querySelectorAll('.submenu');
    submenus.forEach((sm, index) => {
      sm.style.zIndex = baseZ + (index + 1) * 10; // Deeper = higher
    });

    // Main menu styling
    menu.style.position = 'fixed';
    menu.style.left = '40px';
    menu.style.bottom = '80px';
    menu.style.display = 'none';
    menu.style.zIndex = '100000';

    // Toggle main menu (uncommented & fixed)
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && (!openBtn || e.target !== openBtn)) {
        menu.style.display = 'none';
        menu.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
      }
    });

    // Submenu hover with delay
    const hoverDelay = 120; // ms - fast but stable
    let openTimeout, closeTimeout;

    menu.querySelectorAll('.has-submenu').forEach(item => {
      const submenu = item.querySelector(':scope > .submenu');
      if (!submenu) return;

      submenu.style.display = 'none';
      submenu.style.position = 'absolute';

      const openSubmenu = () => {
          debugger;
        submenu.style.display = 'block';

        // Reset position
        submenu.style.left = '100%';
        submenu.style.right = 'auto';
        submenu.style.top = '0';
        submenu.style.opacity = 1;
        submenu.style.bottom = 'auto';

        submenu.getBoundingClientRect(); // reflow

        const rect = submenu.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        if (rect.right > vw) {
          submenu.style.left = 'auto';
          submenu.style.right = '100%';
        }

        const newRect = submenu.getBoundingClientRect();
        if (newRect.bottom > vh) {
          submenu.style.top = 'auto';
          submenu.style.bottom = '0';
        }
      };

      const closeSubmenu = () => {
        submenu.style.display = 'none';
      };

      item.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
        openTimeout = setTimeout(openSubmenu, hoverDelay);
      });

      // Close when leaving the entire item+submenu area
      item.addEventListener('mouseleave', () => {
        clearTimeout(openTimeout);
        closeTimeout = setTimeout(closeSubmenu, hoverDelay * 2);
      });

      // Cancel close if entering submenu directly
      submenu.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
      });

      submenu.addEventListener('mouseleave', () => {
        closeTimeout = setTimeout(closeSubmenu, hoverDelay);
      });
    });
  }
}
