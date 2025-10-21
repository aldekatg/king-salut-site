# Структура изображений для проекта KING SALUT

## Организация папок:

```
king-salut-site/
├── images/
│   ├── backgrounds/          # Фоновые изображения
│   │   ├── hero-bg.jpg       # Главный фон с фейерверками
│   │   ├── fireworks-1.jpg   # Дополнительные фоны
│   │   └── fireworks-2.jpg
│   ├── icons/                # Иконки и логотипы
│   │   ├── logo.png          # Логотип KING SALUT
│   │   ├── crown-icon.png    # Иконка короны
│   │   └── fire-icon.png     # Иконка огня
│   └── products/             # Изображения товаров
│       ├── salyut-vip-1.jpg  # Салют VIP ХАН
│       ├── salyut-vip-2.jpg
│       ├── salyut-new-year.jpg
│       └── salyut-kids.jpg
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Рекомендуемые размеры изображений:

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

## Оптимизация изображений:

1. **Сжатие**: Используйте инструменты типа TinyPNG или ImageOptim
2. **WebP формат**: Для лучшей производительности
3. **Responsive images**: Разные размеры для разных экранов

## Примеры использования в коде:

```html
<!-- Фоновое изображение -->
<div class="hero" style="background-image: url('images/backgrounds/hero-bg.jpg')">

<!-- Логотип -->
<img src="images/icons/logo.png" alt="KING SALUT" class="logo-img">

<!-- Товар -->
<img src="images/products/salyut-vip-1.jpg" alt="Салют VIP ХАН">
```

## Альтернативные варианты организации:

### Вариант 1: По типам контента
```
assets/
├── images/
├── fonts/
├── icons/
└── videos/
```

### Вариант 2: По секциям
```
images/
├── header/
├── hero/
├── products/
├── footer/
└── ui/
```

### Вариант 3: Минималистичный
```
img/
├── bg/
├── products/
└── icons/
```
