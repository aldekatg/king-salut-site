# Модальное окно корзины KING SALUT

## 🛒 **Описание функциональности**

Модальное окно корзины появляется при нажатии на кнопку "Купить" на любой карточке товара.

## 🎯 **Основные возможности:**

### ✅ **Отображение товара:**

- Изображение товара
- Название товара
- Цена за единицу
- Выбор количества (1-99)
- Автоматический расчет суммы

### ✅ **Интерактивность:**

- Кнопки "+" и "-" для изменения количества
- Прямой ввод количества в поле
- Автоматическое обновление суммы
- Валидация количества (минимум 1, максимум 99)

### ✅ **Действия:**

- **"Оформить заказ"** - отправляет заказ в WhatsApp
- **"Продолжить покупки"** - закрывает модальное окно
- **Крестик (×)** - закрывает модальное окно
- **Клик вне окна** - закрывает модальное окно

## 🔧 **Техническая реализация:**

### 📱 **HTML структура:**

```html
<div id="cartModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Ваши товары:</h2>
      <span class="close">&times;</span>
    </div>
    <div class="modal-body">
      <div class="cart-item">
        <div class="cart-item-image">
          <img id="cartItemImage" src="" alt="" />
        </div>
        <div class="cart-item-details">
          <h3 id="cartItemName"></h3>
          <div class="cart-item-info">
            <div class="info-row">
              <span class="label">Цена</span>
              <span class="label">Кол-во</span>
              <span class="label">Сумма</span>
            </div>
            <div class="info-row">
              <span id="cartItemPrice" class="price"></span>
              <div class="quantity-controls">
                <button class="quantity-btn minus">-</button>
                <input
                  type="number"
                  id="cartItemQuantity"
                  value="1"
                  min="1"
                  max="99"
                />
                <button class="quantity-btn plus">+</button>
              </div>
              <span id="cartItemTotal" class="total"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary btn-checkout">Оформить заказ</button>
      <a href="#" class="continue-shopping">Продолжить покупки</a>
    </div>
  </div>
</div>
```

### 🎨 **CSS стили:**

#### Основные стили модального окна:

```css
.modal {
  display: none;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s ease;
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
```

#### Стили товара в корзине:

```css
.cart-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.cart-item-image {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  transition: all 0.3s ease;
}
```

### ⚙️ **JavaScript функциональность:**

#### Показ модального окна:

```javascript
function showCartModal(product) {
  const modal = document.getElementById("cartModal");
  const cartItemImage = document.getElementById("cartItemImage");
  const cartItemName = document.getElementById("cartItemName");
  const cartItemPrice = document.getElementById("cartItemPrice");
  const cartItemQuantity = document.getElementById("cartItemQuantity");
  const cartItemTotal = document.getElementById("cartItemTotal");

  // Заполняем данные товара
  cartItemImage.src = product.image;
  cartItemImage.alt = product.name;
  cartItemName.textContent = product.name;
  cartItemPrice.textContent = product.currentPrice + " ₸";
  cartItemQuantity.value = 1;
  cartItemTotal.textContent = product.currentPrice + " ₸";

  // Показываем модальное окно
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}
```

#### Обновление суммы:

```javascript
function updateTotal() {
  const quantity = parseInt(cartItemQuantity.value);
  const price = parseInt(product.currentPrice.replace(/\s/g, ""));
  const total = quantity * price;
  cartItemTotal.textContent = total.toLocaleString() + " ₸";
}
```

#### Обработка заказа:

```javascript
checkoutBtn.addEventListener("click", () => {
  const productName = document.getElementById("cartItemName").textContent;
  const quantity = document.getElementById("cartItemQuantity").value;
  const total = document.getElementById("cartItemTotal").textContent;

  const phoneNumber = "77764567868";
  const message = `Здравствуйте! Хочу оформить заказ:\nТовар: ${productName}\nКоличество: ${quantity} шт.\nСумма: ${total}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
  closeModal();
});
```

## 📱 **Адаптивность:**

### 🖥️ **Desktop (1200px+):**

- Модальное окно: 500px ширина
- Товар в горизонтальном расположении
- Кнопки количества в ряд

### 📱 **Tablet (768px-1199px):**

- Модальное окно: 90% ширины экрана
- Товар в горизонтальном расположении
- Сохранена функциональность

### 📱 **Mobile (до 768px):**

- Модальное окно: 95% ширины экрана
- Товар в вертикальном расположении
- Изображение товара: 200px высота
- Информация в одну колонку
- Кнопки количества по центру

## ✨ **Анимации:**

### 🎬 **Появление модального окна:**

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

## 🔄 **Интеграция с WhatsApp:**

### 📞 **Формат сообщения:**

```
Здравствуйте! Хочу оформить заказ:
Товар: Салют Звезда/Жулдыз 19 зарядов
Количество: 2 шт.
Сумма: 28 000 ₸
```

### 🔗 **Ссылка WhatsApp:**

- Номер: `77764567868`
- Формат: `https://wa.me/77764567868?text=...`
- Кодировка: `encodeURIComponent()`

## ✅ **Преимущества:**

1. **Удобство**: Быстрое добавление в корзину
2. **Наглядность**: Четкое отображение товара и суммы
3. **Гибкость**: Изменение количества
4. **Интеграция**: Прямая связь с WhatsApp
5. **Адаптивность**: Работает на всех устройствах
6. **Анимации**: Плавные переходы
7. **UX**: Интуитивно понятный интерфейс

## 🎯 **Использование:**

1. Пользователь нажимает "Купить" на карточке товара
2. Открывается модальное окно с информацией о товаре
3. Пользователь может изменить количество
4. Сумма автоматически пересчитывается
5. При нажатии "Оформить заказ" открывается WhatsApp
6. Модальное окно закрывается

Модальное окно корзины полностью готово к использованию!
