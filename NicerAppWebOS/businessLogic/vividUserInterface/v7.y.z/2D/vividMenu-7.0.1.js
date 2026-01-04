class naVividMenu {
  constructor(menuElId = 'siteMenu', openBtnId = 'btnShowStartMenu') {
    const menu = document.getElementById(menuElId); // Main menu container
    if (!menu) return;

    const openBtn = document.getElementById(openBtnId);
    //if (!openBtn) return;

    // Prevent double init
    if (menu.dataset.initialized) return;
    menu.dataset.initialized = 'true';

    // Add classes
    var zi = 99999, zi2 = 0;
    menu.querySelectorAll('li').forEach(li => {
      li.classList.add('menu-item');
      if (li.querySelector('ul')) li.classList.add('has-submenu');
    });
    menu.querySelectorAll('ul ul').forEach(ul => ul.classList.add('submenu'));
    if (menu.firstElementChild.tagName === 'UL') {
      menu.firstElementChild.classList.add('menu-root');
      zi2 += 10;
      $(menu).css({zIndex:zi + zi2});
    }

    // Main menu styling
    menu.style.position = 'fixed';
    menu.style.left = '40px';
    menu.style.bottom = '80px'; // Adjust for your taskbar height
    menu.style.display = 'none';
    menu.style.zIndex = '1000';

    // Toggle main menu
    /*
    openBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = menu.style.display === 'none';
      menu.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        // Optional: recalculate position on open
        menu.style.bottom = '80px';
      }
    });
    */

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && e.target !== openBtn) {
        menu.style.display = 'none';
        menu.querySelectorAll('.submenu').forEach(sm => sm.style.display = 'none');
      }
    });

    // Submenu hover handling
    menu.querySelectorAll('.has-submenu').forEach(item => {
      const submenu = item.querySelector(':scope > .submenu');
      if (!submenu) return;

      submenu.style.display = 'none'; // Ensure hidden initially
      submenu.style.position = 'absolute';

      item.addEventListener('mouseenter', () => {
        // Show it first
        submenu.style.display = 'block';

        // Reset for fresh calculation
        submenu.style.left = '100%';
        submenu.style.right = 'auto';
        submenu.style.top = '0';
        submenu.style.bottom = 'auto';

        // Force reflow
        submenu.getBoundingClientRect();

        const rect = submenu.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Horizontal flip
        if (rect.right > vw) {
          submenu.style.left = 'auto';
          submenu.style.right = '100%';
        }

        // Re-check after flip
        const newRect = submenu.getBoundingClientRect();

        // Vertical flip
        if (newRect.bottom > vh) {
          submenu.style.top = 'auto';
          submenu.style.bottom = '0';
        }
      });

      /*
      item.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
      });*/
    });
  }
}
