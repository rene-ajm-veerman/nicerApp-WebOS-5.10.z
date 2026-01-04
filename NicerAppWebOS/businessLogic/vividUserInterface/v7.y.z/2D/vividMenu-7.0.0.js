class naVividMenu {
  constructor(menuElId = 'siteMenu', openBtnId = 'btnShowStartMenu') {
    const menu = document.getElementById(menuElId);
    const openBtn = document.getElementById(openBtnId);

    if (!menu || !openBtn || menu.dataset.initialized) return;
    menu.dataset.initialized = 'true';

    // Add necessary classes (once)
    menu.querySelectorAll('li').forEach(li => {
      li.classList.add('menu-item');
      if (li.querySelector('ul')) li.classList.add('has-submenu');
    });
    menu.querySelectorAll('ul ul').forEach(ul => ul.classList.add('submenu'));
    if (menu.firstElementChild) menu.firstElementChild.classList.add('menu-root');

    // Position main menu at bottom-left (adjust as needed)
    menu.style.position = 'fixed';
    menu.style.left = '40px';
    menu.style.bottom = '100px'; // space for taskbar-like elements
    menu.style.display = 'none';

    // Toggle main menu visibility
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== openBtn) {
        menu.style.display = 'none';
        menu.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
      }
    });

    // Handle submenu hover with small delay
    const hoverDelay = 333; // ms
    let openTimeout, closeTimeout;

    menu.querySelectorAll('.has-submenu').forEach(item => {
      const submenu = item.querySelector(':scope > .submenu');

      if (!submenu) return;

      // Initial hidden state
      submenu.style.display = 'none';
      submenu.style.position = 'absolute';

      item.addEventListener('mouseenter', () => {
        clearTimeout(closeTimeout);
        openTimeout = setTimeout(() => {
          // Reset position for fresh calculation
          submenu.style.left = '100%';
          submenu.style.height = '100%';
          submenu.style.right = 'auto';
          submenu.style.top = '0';
          submenu.style.bottom = 'auto';
          submenu.style.display = 'block';

          // Force reflow
          submenu.getBoundingClientRect();

          const submenuRect = submenu.getBoundingClientRect();
          const vw = window.innerWidth;
          const vh = window.innerHeight;

          // Flip horizontally if overflowing right
          if (submenuRect.right > vw) {
            submenu.style.left = 'auto';
            submenu.style.right = '100%';
          }

          // Re-check rect after possible horizontal flip
          const newRect = submenu.getBoundingClientRect();

          // Flip vertically if overflowing bottom
          if (newRect.bottom > vh) {
              debugger;
            submenu.style.top = 'auto';
            submenu.style.bottom = '0';
          }
        }, hoverDelay);
      });

      item.addEventListener('mouseleave', () => {
        clearTimeout(openTimeout);
        closeTimeout = setTimeout(() => {
          submenu.style.display = 'none';
        }, hoverDelay * 2); // slightly longer close delay feels better
      });
    });
  }
}
