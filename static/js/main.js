// ========== 头条轮播逻辑 ==========
(function() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const container = document.querySelector('.carousel-container');
  let currentIndex = 0;
  let autoplayTimer;
  const total = slides.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.remove('bg-white/50', 'w-3');
        dot.classList.add('bg-white', 'w-6');
      } else {
        dot.classList.remove('bg-white', 'w-6');
        dot.classList.add('bg-white/50', 'w-3');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  // 绑定事件
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      currentIndex = i;
      updateCarousel();
      startAutoPlay();
    });
  });

  if (container) {
    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);
  }

  // 触摸滑动支持
  let touchStartX = 0;
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    heroCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoPlay();
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? prevSlide() : nextSlide();
      }
      startAutoPlay();
    });
  }

  // 启动
  updateCarousel();
  startAutoPlay();
})();

// ========== 移动端菜单 ==========
(function() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
})();

// ========== 搜索框：回车跳转搜索页 ==========
(function() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = '/search/?q=' + encodeURIComponent(input.value.trim());
    }
  });
})();

// ========== Tab切换逻辑 ==========
(function() {
  const tabLatest = document.getElementById('tabLatest');
  const tabHot = document.getElementById('tabHot');
  const panelLatest = document.getElementById('panelLatest');
  const panelHot = document.getElementById('panelHot');

  if (!tabLatest || !tabHot) return;

  function activateTab(activeTab, inactiveTab, activePanel, inactivePanel) {
    // 激活当前Tab
    activeTab.classList.add('text-primary', 'border-b-2', 'border-primary');
    activeTab.classList.remove('text-muted');
    activeTab.querySelector('span').classList.add('bg-primary');
    activeTab.querySelector('span').classList.remove('bg-muted');

    // 取消另一个Tab
    inactiveTab.classList.remove('text-primary', 'border-b-2', 'border-primary');
    inactiveTab.classList.add('text-muted');
    inactiveTab.querySelector('span').classList.remove('bg-primary');
    inactiveTab.querySelector('span').classList.add('bg-muted');

    // 切换面板
    activePanel.classList.remove('hidden');
    inactivePanel.classList.add('hidden');
  }

  tabLatest.addEventListener('click', () => {
    activateTab(tabLatest, tabHot, panelLatest, panelHot);
  });

  tabHot.addEventListener('click', () => {
    activateTab(tabHot, tabLatest, panelHot, panelLatest);
  });
})();
