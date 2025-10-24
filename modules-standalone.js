// Автономная версия модульной системы (работает без сервера)
class StandaloneModuleLoader {
  constructor() {
    this.modules = new Map();
    this.initModules();
  }

  initModules() {
    // Встроенный контент header
    const headerContent = `
<!-- Header -->
<header class="header">
  <!-- Top Black Bar -->
  <div class="header-top">
    <div class="container">
      <div class="header-top-content">
        <!-- Logo -->
        <div class="logo">
          <img
            src="images/icons/crown-icon.svg"
            alt="Crown"
            class="logo-icon"
          />
        </div>

        <!-- Contact -->
        <div class="contact">
          <i class="fas fa-phone"></i>
          <span>+7 (776) 456 78 68</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom White Bar -->
  <div class="header-bottom">
    <div class="container">
      <div class="header-bottom-content">
        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Navigation -->
        <nav class="nav">
          <a href="#" class="nav-link">Главная</a>
          <a href="#" class="nav-link dropdown">
            Каталог
            <i class="fas fa-chevron-down"></i>
          </a>
          <a href="#" class="nav-link">По событиям</a>
          <a href="#" class="nav-link">Доставка и оплата</a>
          <a href="#" class="nav-link">О компании</a>
        </nav>

        <!-- Search -->
        <div class="search">
          <input type="text" placeholder="Поиск по 1789 товаров" />
          <i class="fas fa-search"></i>
        </div>

        <!-- Icons -->
        <div class="icons">
          <i class="fas fa-shopping-cart"></i>
          <i class="fas fa-balance-scale"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  <div class="mobile-menu-overlay"></div>
  <div class="mobile-menu">
    <nav class="nav">
      <a href="#" class="nav-link">Главная</a>
      <a href="#" class="nav-link dropdown">
        Каталог
        <i class="fas fa-chevron-down"></i>
      </a>
      <a href="#" class="nav-link">По событиям</a>
      <a href="#" class="nav-link">Доставка и оплата</a>
      <a href="#" class="nav-link">О компании</a>
    </nav>
  </div>
</header>`;

    // Встроенный контент footer
    const footerContent = `
<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-left">
        <div class="logo">
          <img
            src="images/icons/logo-vert.png"
            alt="Logo Vertical"
            class="logo-icon-footer"
          />
        </div>
      </div>

      <div class="footer-center">
        <div class="social-links">
          <a href="#" class="social-link">
            <i class="fab fa-facebook"></i>
            <span>Facebook</span>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-vk"></i>
            <span>VKontakte</span>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-twitter"></i>
            <span>Twitter</span>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-youtube"></i>
            <span>YouTube</span>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-telegram"></i>
            <span>Telegram</span>
          </a>
        </div>
        <div class="company-info">
          <p>
            TOO King Salute, 12-й микрорайон 7/2 с. Алматы, Индекс 050035
          </p>
        </div>
      </div>
    </div>
  </div>
</footer>`;

    this.modules.set('header', headerContent);
    this.modules.set('footer', footerContent);
  }

  loadModule(moduleName, targetElement) {
    if (this.modules.has(moduleName)) {
      const html = this.modules.get(moduleName);
      if (targetElement) {
        targetElement.innerHTML = html;
        console.log(`Модуль ${moduleName} загружен из встроенного контента`);
      }
      return html;
    } else {
      console.error(`Модуль ${moduleName} не найден`);
      return null;
    }
  }

  loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      console.log('Найден контейнер header-container, загружаем модуль');
      this.loadModule('header', headerContainer);
    } else {
      console.error('Контейнер header-container не найден');
    }
  }

  loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      console.log('Найден контейнер footer-container, загружаем модуль');
      this.loadModule('footer', footerContainer);
    } else {
      console.error('Контейнер footer-container не найден');
    }
  }

  loadAllModules() {
    this.loadHeader();
    this.loadFooter();
  }
}

// Инициализация автономного загрузчика модулей
const standaloneModuleLoader = new StandaloneModuleLoader();

// Загружаем модули после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM загружен, начинаем загрузку модулей (автономная версия)');
  standaloneModuleLoader.loadAllModules();
  console.log('Все модули загружены (автономная версия)');
});
