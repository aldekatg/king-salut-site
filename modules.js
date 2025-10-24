// Модульная система для загрузки header и footer
class ModuleLoader {
  constructor() {
    this.modules = new Map();
  }

  async loadModule(moduleName, targetElement) {
    try {
      // Проверяем, есть ли уже кэшированная версия
      if (this.modules.has(moduleName)) {
        if (targetElement) {
          targetElement.innerHTML = this.modules.get(moduleName);
        }
        return this.modules.get(moduleName);
      }
      
      const response = await fetch(`${moduleName}.html`, {
        cache: 'force-cache',
        headers: {
          'Cache-Control': 'max-age=3600'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      
      // Сохраняем модуль в кэше
      this.modules.set(moduleName, html);
      
      // Вставляем HTML в целевой элемент
      if (targetElement) {
        targetElement.innerHTML = html;
      }
      
      return html;
    } catch (error) {
      console.error(`Ошибка загрузки модуля ${moduleName}:`, error);
      return null;
    }
  }


  async loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      await this.loadModule('header', headerContainer);
    }
  }

  async loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      await this.loadModule('footer', footerContainer);
    }
  }

  async loadAllModules() {
    await Promise.all([
      this.loadHeader(),
      this.loadFooter()
    ]);
  }
}

// Инициализация загрузчика модулей
const moduleLoader = new ModuleLoader();

// Загружаем модули после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  moduleLoader.loadAllModules();
});
