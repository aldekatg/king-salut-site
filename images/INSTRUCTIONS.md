# Как добавить изображения в проект KING SALUT

## 📁 Структура папок для изображений:

```
king-salut-site/
├── images/
│   ├── backgrounds/          # Фоновые изображения
│   │   ├── hero-bg.jpg       # Главный фон (1920x1080px)
│   │   ├── fireworks-1.jpg   # Дополнительные фоны
│   │   └── fireworks-2.jpg
│   ├── icons/                # Иконки и логотипы
│   │   ├── logo.png          # Логотип (200x60px)
│   │   ├── crown-icon.png    # Иконка короны (64x64px)
│   │   └── fire-icon.png     # Иконка огня (32x32px)
│   └── products/             # Изображения товаров
│       ├── salyut-vip-1.jpg  # Салют VIP ХАН (400x400px)
│       ├── salyut-vip-2.jpg
│       ├── salyut-new-year.jpg
│       └── salyut-kids.jpg
├── index.html
├── styles.css
├── script.js
└── README.md
```

## 🖼️ Рекомендуемые размеры:

### Фоновые изображения:
- **hero-bg.jpg**: 1920x1080px (Full HD)
- **fireworks-*.jpg**: 1920x600px

### Иконки:
- **logo.png**: 200x60px
- **crown-icon.png**: 64x64px
- **fire-icon.png**: 32x32px

### Товары:
- **product-*.jpg**: 400x400px (квадратные)
- Формат: JPG для фотографий, PNG для иконок с прозрачностью

## 📝 Как добавить изображения:

### 1. Создайте папки:
```bash
mkdir -p images/{backgrounds,icons,products}
```

### 2. Поместите файлы в соответствующие папки:
- Фоновые изображения → `images/backgrounds/`
- Иконки → `images/icons/`
- Товары → `images/products/`

### 3. Обновите код:

#### В HTML:
```html
<!-- Фоновое изображение -->
<div class="hero" style="background-image: url('images/backgrounds/hero-bg.jpg')">

<!-- Логотип -->
<img src="images/icons/logo.png" alt="KING SALUT" class="logo-img">

<!-- Товар -->
<img src="images/products/salyut-vip-1.jpg" alt="Салют VIP ХАН">
```

#### В CSS:
```css
.hero {
    background-image: url('images/backgrounds/hero-bg.jpg');
}
```

## 🔧 Оптимизация изображений:

### 1. Сжатие:
- Используйте TinyPNG или ImageOptim
- Оптимальный размер файла: < 200KB

### 2. Форматы:
- **JPG**: для фотографий
- **PNG**: для иконок с прозрачностью
- **WebP**: для лучшей производительности

### 3. Responsive images:
```html
<picture>
    <source media="(max-width: 768px)" srcset="images/products/salyut-mobile.jpg">
    <source media="(max-width: 1024px)" srcset="images/products/salyut-tablet.jpg">
    <img src="images/products/salyut-desktop.jpg" alt="Салют">
</picture>
```

## 🚀 Готовые изображения для проекта:

### Для hero секции:
- Скачайте изображение фейерверков (1920x1080px)
- Сохраните как `images/backgrounds/hero-bg.jpg`

### Для товаров:
- Скачайте изображения салютов (400x400px)
- Сохраните как `images/products/salyut-vip-1.jpg`, `salyut-vip-2.jpg` и т.д.

### Для иконок:
- Создайте логотип KING SALUT (200x60px)
- Сохраните как `images/icons/logo.png`

## ⚠️ Важные моменты:

1. **Fallback изображения**: Код уже настроен с fallback на placeholder'ы
2. **Альтернативный текст**: Всегда добавляйте `alt` атрибуты
3. **Производительность**: Оптимизируйте размеры файлов
4. **Кэширование**: Используйте версионирование для обновлений

## 📱 Мобильная оптимизация:

Для мобильных устройств создайте версии изображений меньшего размера:
- `images/products/salyut-vip-1-mobile.jpg` (200x200px)
- `images/backgrounds/hero-bg-mobile.jpg` (768x400px)
