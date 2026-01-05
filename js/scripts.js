$(document).ready(function() {	

let lastScroll = 0;

jQuery(window).on("scroll", function () {
    const current = jQuery(this).scrollTop();

    // Show when scrolling UP & passed 500px
    if (current < lastScroll && current > 500) {
        jQuery(".scrolltotop").fadeIn();
    } 
    // Hide when scrolling DOWN or back above threshold
    else {
        jQuery(".scrolltotop").fadeOut();
    }

    lastScroll = current;
});

// Scroll to top on click
jQuery(".scrolltotop").click(function () {
    jQuery("html").animate({ scrollTop: 0 }, 550);
    return false;
});


// Menu hide on scroll down, show on scroll up
jQuery(function ($) {
  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();

    if (scrollTop > lastScrollTop && scrollTop > 20) {
      // scrolling DOWN → hide header
      $(".header-inner").addClass("header-hide").removeClass("header-show");
    } else {
      // scrolling UP → show header
      $(".header-inner").addClass("header-show").removeClass("header-hide");
    }

    lastScrollTop = scrollTop;
  });
});



  
// accordion js
$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    var links = this.el.find('.link');
    links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
      $this = $(this),
      $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
      $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    }
  };

  var accordion = new Accordion($('#accordion'), false);

  // ✅ Open first item by default
  $('#accordion .link').first().parent().addClass('open');
  $('#accordion .link').first().next('.submenu').show();
});









		
});



// Sidebar Accordion js code
function toggleAccordion(index) {
  const content = document.getElementById(`content-${index}`);
  const icon = document.getElementById(`icon-${index}`);

  const minusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#B2B2B2" class="w-4 h-4" aria-hidden="true">
      <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
  `;

  const plusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#B2B2B2" class="w-4 h-4" aria-hidden="true">
      <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
  `;

  const allContents = document.querySelectorAll('[id^="content-"]');

  allContents.forEach((other) => {
    if (other === content) return; 
    // collapse it
    other.style.maxHeight = '0';
    const otherId = other.id; 
    const otherIndex = otherId.split('-')[1];
    const otherIcon = document.getElementById(`icon-${otherIndex}`);
    if (otherIcon) otherIcon.innerHTML = plusSVG;
    const otherButton = document.querySelector(`[onclick="toggleAccordion(${otherIndex})"]`);
    if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
  });

  const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
  if (isOpen) {
    content.style.maxHeight = '0';
    if (icon) icon.innerHTML = plusSVG;
    const btn = document.querySelector(`[onclick="toggleAccordion(${index})"]`);
    if (btn) btn.setAttribute('aria-expanded', 'false');
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    if (icon) icon.innerHTML = minusSVG;
    const btn = document.querySelector(`[onclick="toggleAccordion(${index})"]`);
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}




// Sidebar with overlay handle js
(function () {
  const body = document.body;

  let overlay = document.querySelector('.mobile-sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-sidebar-overlay';
    document.body.appendChild(overlay);
  }

  const toggleAll = () => {
    const isMobile = window.matchMedia('(max-width: 991px)').matches;

    document.querySelector('.sidebar-wrap')?.classList.toggle('active');
    document.querySelector('.content-wrap')?.classList.toggle('active');
    document.querySelector('.swiperbuttonsld')?.classList.toggle('active');
    document.querySelector('.swiperbuttonsld02')?.classList.toggle('active');

    // ✅ NEW: toggle .main-active on .main
    document.querySelector('.main')?.classList.toggle('main-active');

    if (isMobile) {
      overlay.classList.toggle('active');

      // lock/unlock body scroll
      if (overlay.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }

    } else {
      overlay.classList.remove('active');
      body.style.overflow = '';
    }
  };

  document.querySelectorAll('.menu-open').forEach(button => {
    button.addEventListener('click', toggleAll);
  });

  // Clicking overlay closes the menu
  overlay.addEventListener('click', () => {
    document.querySelector('.sidebar-wrap')?.classList.remove('active');
    document.querySelector('.content-wrap')?.classList.remove('active');
    document.querySelector('.swiperbuttonsld')?.classList.remove('active');
    document.querySelector('.swiperbuttonsld02')?.classList.remove('active');

    // ❗ NEW: remove main-active when closing
    document.querySelector('.main')?.classList.remove('main-active');

    overlay.classList.remove('active');
    body.style.overflow = ''; 
  });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 991px)').matches) {
      overlay.classList.remove('active');
      body.style.overflow = '';
      
      // ❗ NEW: remove main-active on resize back to desktop
      document.querySelector('.main')?.classList.remove('main-active');
    }
  });
})();




const menuItems = document.querySelectorAll('.menu-wrap li');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});




// disabled body scroll when sidebar scroll
(function () {
  const sidebar = document.querySelector('.sidebar-wrap');
  if (!sidebar) return;

  sidebar.addEventListener('wheel', e => {
    const top = sidebar.scrollTop === 0;
    const bottom = Math.ceil(sidebar.scrollTop + sidebar.clientHeight) >= sidebar.scrollHeight;
    if ((e.deltaY < 0 && top) || (e.deltaY > 0 && bottom)) e.preventDefault();
  }, { passive: false });

  let startY = 0;
  sidebar.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  sidebar.addEventListener('touchmove', e => {
    const y = e.touches[0].clientY;
    const delta = startY - y;
    const top = sidebar.scrollTop === 0;
    const bottom = Math.ceil(sidebar.scrollTop + sidebar.clientHeight) >= sidebar.scrollHeight;
    if ((delta < 0 && top) || (delta > 0 && bottom)) e.preventDefault();
  }, { passive: false });
})();
 

// buttons slider js code 
    const slider = new Swiper('.swiperbuttonsld', {
    slidesPerView: 9,
    spaceBetween: 12,
    freeMode: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320:   { slidesPerView: 4 },
        480:   { slidesPerView: 4 },
        640:   { slidesPerView: 4 },
        768:   { slidesPerView: 4 },
        991:   { slidesPerView: 3 },
        1199:  { slidesPerView: 4 },
        1300:  { slidesPerView: 8 }
    }
    });

    const nextBtn = document.querySelector('.swiper-button-next');
    const prevBtn = document.querySelector('.swiper-button-prev');

    function updateNavOpacity() {
    if (!nextBtn || !prevBtn) return;

    // use slider internal state (more reliable)
    const atEnd = slider.isEnd;
    const atBeginning = slider.isBeginning;

    if (atEnd) {
        nextBtn.style.opacity = '0.1';
        nextBtn.style.pointerEvents = 'none';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.pointerEvents = 'auto';
    }

    if (atBeginning) {
        prevBtn.style.opacity = '0';
        prevBtn.style.pointerEvents = 'none';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.pointerEvents = 'auto';
    }
    }

    slider.on('init', updateNavOpacity);
    slider.on('slideChange', updateNavOpacity);
    slider.on('transitionEnd', updateNavOpacity);
    slider.on('resize', updateNavOpacity);
    slider.on('observerUpdate', updateNavOpacity);

    updateNavOpacity();
    // buttons slider js code 




      // Language Dropdown Functions
        let isDropdownOpen = false;

        function toggleDropdown() {
            isDropdownOpen = !isDropdownOpen;
            const menu = document.getElementById('dropdownMenu');
            const arrow = document.getElementById('dropdownArrow');
            
            if (isDropdownOpen) {
                menu.classList.remove('hidden');
                arrow.classList.add('rotate-180');
            } else {
                menu.classList.add('hidden');
                arrow.classList.remove('rotate-180');
            }
        }

        function selectLanguage(language) {
            document.getElementById('selectedLanguage').textContent = language;
            toggleDropdown();
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const dropdown = document.getElementById('languageDropdown');
            const menu = document.getElementById('dropdownMenu');
            
            if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
                if (isDropdownOpen) {
                    toggleDropdown();
                }
            }
        });

        // Checkbox Toggle Functions
        function toggleCheckbox(id) {
            const checkIcon = document.getElementById(id + 'Check');
            
            if (checkIcon.classList.contains('hidden')) {
                checkIcon.classList.remove('hidden');
            } else {
                checkIcon.classList.add('hidden');
            }
        }