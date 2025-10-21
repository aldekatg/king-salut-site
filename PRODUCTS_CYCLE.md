# Цикл товаров KING SALUT

## 🔄 Реализация через JavaScript циклы

### 📊 **Структура данных товаров:**

```javascript
const productsData = [
    {
        id: 1,
        name: "Салют VIP ХАН 188 зарядов",
        image: "images/products/salyut-vip-1.jpg",
        currentPrice: "14 000",
        oldPrice: "18 000",
        discount: "-20%",
        badge: "Топ продаж",
        category: "new"
    },
    // ... остальные товары
];
```

### 🏗️ **Функция создания карточки:**

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
            <button class="btn btn-buy" onclick="addToCart(${product.id})">Купить</button>
            <button class="btn btn-whatsapp" onclick="orderViaWhatsApp(${product.id})">
                <i class="fab fa-whatsapp"></i>
                Заказ по Whatsapp
            </button>
        </div>
    `;
}
```

### 🔄 **Циклы для рендеринга:**

#### 1. Фильтрация по категориям:
```javascript
const newProducts = productsData.filter(product => product.category === 'new');
const topProducts = productsData.filter(product => product.category === 'top');
```

#### 2. Ограничение количества (первые 4):
```javascript
const newProductsToShow = newProducts.slice(0, 4);
const topProductsToShow = topProducts.slice(0, 4);
```

#### 3. Генерация HTML через map():
```javascript
newProductsContainer.innerHTML = newProductsToShow.map(product => createProductCard(product)).join('');
topProductsContainer.innerHTML = topProductsToShow.map(product => createProductCard(product)).join('');
```

### 🎯 **Интерактивность:**

#### Добавление в корзину:
```javascript
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        alert(`Товар "${product.name}" добавлен в корзину!`);
    }
}
```

#### Заказ через WhatsApp:
```javascript
function orderViaWhatsApp(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        const phoneNumber = '77764567868';
        const message = `Здравствуйте! Хочу заказать товар: ${product.name} за ${product.currentPrice} ₸`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}
```

### 📱 **Кнопка "Показать все":**

```javascript
document.querySelectorAll('.btn-show-all').forEach(btn => {
    btn.addEventListener('click', function() {
        const section = this.closest('.products-section');
        const grid = section.querySelector('.products-grid');
        const sectionTitle = section.querySelector('.section-title').textContent;
        
        if (sectionTitle === 'Новинки') {
            const allNewProducts = productsData.filter(product => product.category === 'new');
            grid.innerHTML = allNewProducts.map(product => createProductCard(product)).join('');
        } else if (sectionTitle === 'Топ продаж') {
            const allTopProducts = productsData.filter(product => product.category === 'top');
            grid.innerHTML = allTopProducts.map(product => createProductCard(product)).join('');
        }
        
        this.style.display = 'none';
    });
});
```

### ✅ **Преимущества циклического подхода:**

1. **🔄 DRY принцип**: Нет дублирования кода
2. **📊 Централизованные данные**: Все товары в одном массиве
3. **🎯 Легкое управление**: Добавление/удаление товаров через массив
4. **🔧 Гибкость**: Легко изменить количество отображаемых товаров
5. **📱 Интерактивность**: Каждый товар имеет уникальный ID
6. **🎨 Консистентность**: Одинаковый дизайн всех карточек

### 🚀 **Инициализация:**

```javascript
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(); // Запускаем рендеринг при загрузке страницы
});
```

### 📈 **Возможности расширения:**

- Добавление новых категорий товаров
- Фильтрация по цене, типу, бренду
- Сортировка по популярности, цене, дате
- Пагинация для больших каталогов
- Поиск по названию товара

Теперь товары генерируются динамически через JavaScript циклы!
