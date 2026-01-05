document.addEventListener("DOMContentLoaded", function() {



  // chat user sidebar handle js
  const profileOverlay = document.querySelector('.mobile-sidebar-overlay02');
  const userSidebar = document.querySelector('.chat-user-sidebar');
  const chatBoxWrap = document.querySelector('.chat-box-wrap');

  /* ----------------------------------
      HANDLE profile-bar RESPONSIVELY
  -----------------------------------*/
  function updateProfileBarClass() {
    document.querySelectorAll('.profile-settings-scroll').forEach(el => {
      if (window.innerWidth <= 1399) {
        el.classList.add('profile-bar');
      } else {
        el.classList.remove('profile-bar');
      }
    });
  }

  // Run on load
  updateProfileBarClass();

  // Run on resize
  window.addEventListener('resize', updateProfileBarClass);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.profile-bar');
    if (!btn) return;

    // Toggle sidebar & overlay
    userSidebar.classList.toggle('active');
    profileOverlay.classList.toggle('active');
    chatBoxWrap.classList.toggle('user-profile-inactive');

    // Toggle body classes
    document.body.classList.toggle('user-profile-open');
    document.body.classList.toggle('ct-us-bar-inactive');

    // Lock / unlock body scroll
    if (userSidebar.classList.contains('active')) {
      document.body.classList.add('body-scroll-locked');
    } else {
      document.body.classList.remove('body-scroll-locked');
    }

    if (
      window.innerWidth <= 1399 &&
      btn.classList.contains('profile-settings-scroll')
    ) {
      setTimeout(() => {
        userSidebar.scrollTop = userSidebar.scrollHeight;
      }, 350);
    }
  });
  profileOverlay.addEventListener('click', () => {
    userSidebar.classList.remove('active');
    profileOverlay.classList.remove('active');
    chatBoxWrap.classList.remove('user-profile-inactive');

    document.body.classList.remove(
      'user-profile-open',
      'ct-us-bar-inactive',
      'body-scroll-locked'
    );
  });
  // chat user sidebar handle js




// Sidebar with overlay handle js
(function () {
  const body = document.body;

  let overlay = document.querySelector('.mobile-sidebar-overlay03');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-sidebar-overlay03';
    document.body.appendChild(overlay);
  }

  const toggleAll = () => {

    document.querySelector('.sidebar-wrap')?.classList.toggle('active');
    document.querySelector('.content-wrap')?.classList.toggle('active');
    document.querySelector('.swiperbuttonsld')?.classList.toggle('active');
    document.querySelector('.swiperbuttonsld02')?.classList.toggle('active');
    document.querySelector('.main')?.classList.toggle('main-active');

    // Always toggle overlay
    overlay.classList.toggle('active');

    // Toggle body class instead of overflow hidden
    if (overlay.classList.contains('active') && window.innerWidth <= 1400) {
      body.classList.add('sd-body');
    } else {
      body.classList.remove('sd-body');
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
    document.querySelector('.main')?.classList.remove('main-active');

    overlay.classList.remove('active');
    body.classList.remove('sd-body');
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



// Close when clicking on overlay
profileOverlay.addEventListener('click', () => {
  userSidebar?.classList.remove('active');
  profileOverlay?.classList.remove('active');

  // Re-enable full page scroll
  document.body.classList.remove('body-scroll-locked');
});



// In mobile chat box wrap handle
const chatBox = document.querySelector('.chat-box-wrap');
const userChatSidebar = document.querySelector('.chat-user-sidebar');

document.querySelectorAll('.chat-box-active').forEach(btn => {
  btn.addEventListener('click', () => {
    chatBox?.classList.add('active');
  });
});

document.querySelectorAll('.chat-box-hide').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // 🔥 VERY IMPORTANT

    // Always close sidebar first
    if (userChatSidebar?.classList.contains('active')) {
      userChatSidebar.classList.remove('active');
      return;
    }

    // Then close chat box
    if (chatBox?.classList.contains('active')) {
      chatBox.classList.remove('active');
    }
  });
});




  // chat card active class
    const cards = document.querySelectorAll('.chat-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      
      cards.forEach(c => c.classList.remove('active'));

      card.classList.add('active');

    });
  });


  // chat input file handle js
  const button = document.querySelector('.input-file');
  const realFileInput = document.getElementById('real-file');

  button.addEventListener('click', () => {
    realFileInput.click();   // open file dialog
  });

  realFileInput.addEventListener('change', () => {
    console.log("Selected file:", realFileInput.files[0]);
  });




// // disabled body content scroll when sidebar scrolling (768px and up only)
function lockScrollInside(elementSelector) {
  const el = document.querySelector(elementSelector);
  if (!el) return;

  el.addEventListener('wheel', function (e) {
    if (window.innerWidth < 768) return; // only activate for 768px and up

    const atTop = this.scrollTop === 0;
    const atBottom = this.scrollHeight - this.scrollTop === this.clientHeight;

    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
  }, { passive: false });
}

lockScrollInside('.chat-sidebar');
lockScrollInside('.chat-user-sidebar');



// absolute credit box handle
const creditBox = document.querySelector('.creadit-ab-box');

document.querySelectorAll('.creadit-button').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    creditBox.classList.toggle('active');
  });
});

creditBox.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    creditBox.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.creadit-ab-box') && !e.target.closest('.creadit-button')) {
    creditBox.classList.remove('active');
  }
});


const lightbox = document.getElementById("tailwindLightbox");
const lightboxImg = document.getElementById("tailwindLightboxImg");
const closeBtn = document.getElementById("lightboxClose");

document.querySelectorAll(".chat-lightbox-img").forEach(img => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;

    // Lock body scroll
    document.body.classList.add("lb-scroll-lock");

    // Show lightbox
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");

    // Animate in
    requestAnimationFrame(() => {
      lightbox.classList.remove("opacity-0");
      lightboxImg.classList.remove("scale-95", "opacity-0");
      lightboxImg.classList.add("scale-100", "opacity-100");
    });
  });
});

function closeLightbox() {
  // Animate out
  lightbox.classList.add("opacity-0");
  lightboxImg.classList.add("scale-95", "opacity-0");
  lightboxImg.classList.remove("scale-100", "opacity-100");

  setTimeout(() => {
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    lightboxImg.src = "";

    // Unlock body scroll
    document.body.classList.remove("lb-scroll-lock");
  }, 300);
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});


 // Keep the chat page in botoom by defalut
    window.addEventListener("load", () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "auto"
    });
    });


    
    // chat input search feature js
    const searchInput = document.querySelector('.chat-search-input');
    const searchContent = document.querySelector('.chat-search-content');
    const chatSidebar = document.querySelector('.chat-sidebar');
    const searchClose = document.querySelector('.search-close');

    if (searchInput && searchContent && chatSidebar) {
      searchInput.addEventListener('input', () => {
        if (searchInput.value.trim().length > 0) {
          searchContent.classList.add('active');
          chatSidebar.classList.add('search');
        } else {
          searchContent.classList.remove('active');
          chatSidebar.classList.remove('search');
        }
      });
    }

    // Close search when clicking close button
    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchInput.value = '';
        searchContent.classList.remove('active');
        chatSidebar.classList.remove('search');
      });
    }








});



