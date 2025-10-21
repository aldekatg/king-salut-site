# Выравнивание кнопок товаров KING SALUT

## 🎯 Проблема и решение

### ❌ **Проблема:**
Кнопки товаров располагались на разных уровнях из-за разной длины названий товаров:
- Короткие названия → кнопки выше
- Длинные названия → кнопки ниже

### ✅ **Решение:**
Использование CSS Grid для фиксированного позиционирования элементов карточки.

## 🔧 **Техническая реализация:**

### 📐 **CSS Grid структура:**

```css
.product-card {
    display: grid;
    grid-template-rows: auto auto 1fr auto auto;
    height: 100%;
    min-height: 400px;
}
```

### 📋 **Распределение строк:**

1. **Строка 1 (auto)**: Бейдж "Топ продаж"
2. **Строка 2 (auto)**: Изображение товара
3. **Строка 3 (1fr)**: Название товара (растягивается)
4. **Строка 4 (auto)**: Цена товара
5. **Строка 5 (auto)**: Контейнер кнопок

### 🎨 **Стили элементов:**

#### Бейдж:
```css
.product-badge {
    grid-row: 1;
    position: absolute;
    top: 15px;
    left: 15px;
}
```

#### Изображение:
```css
.product-image {
    grid-row: 2;
    margin: 0 0 16px 0;
}
```

#### Название товара:
```css
.product-name {
    grid-row: 3;
    align-self: start;
}
```

#### Цена:
```css
.product-price {
    grid-row: 4;
    align-self: end;
}
```

#### Контейнер кнопок:
```css
.product-buttons {
    grid-row: 5;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-self: end;
}
```

### 🔄 **JavaScript обновление:**

```javascript
function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-badge">${product.badge}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${product.currentPrice} ₸</span>
                <span class="old-price">${product.oldPrice} ₸</span>
                <span class="discount">${product.discount}</span>
            </div>
            <div class="product-buttons">
                <button class="btn btn-buy">Купить</button>
                <button class="btn btn-whatsapp">Заказ по Whatsapp</button>
            </div>
        </div>
    `;
}
```

## ✅ **Результат:**

### 🎯 **Преимущества:**

1. **Выравнивание**: Все кнопки на одном уровне
2. **Консистентность**: Одинаковая высота всех карточек
3. **Гибкость**: Названия любой длины не влияют на кнопки
4. **Визуальная чистота**: Аккуратный внешний вид

### 📱 **Адаптивность:**

- **Desktop**: Фиксированная высота 400px
- **Tablet**: Адаптивная высота
- **Mobile**: Компактная высота

### 🔧 **Ключевые особенности:**

- **Grid с 5 строками**: Четкое разделение элементов
- **Flexible строка**: Название товара растягивается
- **Fixed строки**: Бейдж, изображение, цена, кнопки
- **align-self: end**: Кнопки всегда внизу

### 🎨 **Визуальный эффект:**

- ✅ Все карточки одинаковой высоты
- ✅ Кнопки на одном горизонтальном уровне
- ✅ Названия товаров не влияют на позицию кнопок
- ✅ Чистый и профессиональный вид

Теперь все кнопки товаров всегда находятся на одном уровне!
