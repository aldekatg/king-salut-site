// Cart functionality
class CartManager {
  constructor() {
    this.cartItems = this.loadCartFromStorage();
    this.deliveryCost = 2200;
    this.couponDiscount = 0;
    this.init();
  }

  init() {
    this.renderCartItems();
    this.updateOrderSummary();
    this.bindEvents();
    this.formatPhoneInput();
  }

  // Load cart from localStorage
  loadCartFromStorage() {
    const savedCart = localStorage.getItem('kingSalutCart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Save cart to localStorage
  saveCartToStorage() {
    localStorage.setItem('kingSalutCart', JSON.stringify(this.cartItems));
  }

  // Render cart items
  renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    if (this.cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
          <p style="color: #666; text-align: center;">Ваша корзина пуста</p>
        </div>
      `;
      return;
    }

    cartItemsContainer.innerHTML = this.cartItems.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; color: #999; font-size: 24px;">
            <i class="fas fa-image"></i>
          </div>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-info cart-item-headers">
            <div class="cart-item-price">Цена</div>
            <div class="cart-item-price">Количество</div>
            <div class="cart-item-total">Сумма</div>
          </div>
          <div class="cart-item-info cart-item-data">
            <div class="cart-item-price">${this.formatPrice(item.price)} тг</div>
            <div class="quantity-controls">
              <button class="quantity-btn minus" onclick="cartManager.updateQuantity(${item.id}, -1)">-</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="99" 
                     onchange="cartManager.setQuantity(${item.id}, this.value)">
              <button class="quantity-btn plus" onclick="cartManager.updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total">${this.formatPrice(item.price * item.quantity)} тг</div>
          </div>
        </div>
        <div class="cart-item-remove" onclick="cartManager.removeItem(${item.id})">
          <i class="fas fa-times"></i>
        </div>
      </div>
    `).join('');
  }

  // Update item quantity
  updateQuantity(itemId, change) {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, Math.min(99, item.quantity + change));
      this.saveCartToStorage();
      this.renderCartItems();
      this.updateOrderSummary();
    }
  }

  // Set item quantity
  setQuantity(itemId, quantity) {
    const item = this.cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, Math.min(99, parseInt(quantity) || 1));
      this.saveCartToStorage();
      this.renderCartItems();
      this.updateOrderSummary();
    }
  }

  // Remove item from cart
  removeItem(itemId) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCartToStorage();
    this.renderCartItems();
    this.updateOrderSummary();
  }

  // Update order summary
  updateOrderSummary() {
    const orderTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalTotal = orderTotal + this.deliveryCost - this.couponDiscount;

    document.getElementById('orderTotal').textContent = this.formatPrice(orderTotal) + ' тг';
    document.getElementById('deliveryCost').textContent = this.deliveryCost > 0 ? this.formatPrice(this.deliveryCost) + ' тг' : 'Бесплатно';
    document.getElementById('finalTotal').textContent = this.formatPrice(finalTotal) + ' тг';
  }

  // Format price
  formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Format phone input
  formatPhoneInput() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
          if (value.length <= 1) {
            value = '+7 (' + value;
          } else if (value.length <= 4) {
            value = '+7 (' + value.slice(1);
          } else if (value.length <= 7) {
            value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4);
          } else if (value.length <= 9) {
            value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
          } else {
            value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
          }
        }
        e.target.value = value;
      });
    }
  }

  // Apply coupon
  applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.trim();
    const applyBtn = document.getElementById('applyCouponBtn');
    
    if (!couponCode) {
      this.showNotification('Введите код купона', 'error');
      return;
    }

    // Simulate coupon validation
    const validCoupons = {
      'SALUT10': 0.1,
      'NEWYEAR20': 0.2,
      'WELCOME15': 0.15
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      const orderTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      this.couponDiscount = Math.floor(orderTotal * validCoupons[couponCode.toUpperCase()]);
      this.updateOrderSummary();
      this.showNotification(`Купон применен! Скидка: ${this.formatPrice(this.couponDiscount)} тг`, 'success');
      applyBtn.textContent = 'Применен';
      applyBtn.disabled = true;
      applyBtn.style.backgroundColor = '#28a745';
    } else {
      this.showNotification('Неверный код купона', 'error');
    }
  }

  // Show notification
  showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-weight: 500;
      max-width: 300px;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Bind events
  bindEvents() {
    // Coupon application
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
      applyCouponBtn.addEventListener('click', () => this.applyCoupon());
    }

    // Order placement
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', () => this.placeOrder());
    }

    // Form validation
    this.setupFormValidation();
  }

  // Setup form validation
  setupFormValidation() {
    const form = document.querySelector('.order-form-section');
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  // Validate individual field
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'Это поле обязательно для заполнения';
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Введите корректный email адрес';
    } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Введите корректный номер телефона';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  // Show field error
  showFieldError(field, message) {
    this.clearFieldError(field);
    
    field.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
      color: #dc3545;
      font-size: 12px;
      margin-top: 5px;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
  }

  // Clear field error
  clearFieldError(field) {
    field.style.borderColor = '#e1e5e9';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // Validate email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone
  isValidPhone(phone) {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(phone);
  }

  // Place order
  placeOrder() {
    const form = document.querySelector('.order-form-section');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;

    // Validate all required fields
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }

    if (this.cartItems.length === 0) {
      this.showNotification('Ваша корзина пуста', 'error');
      return;
    }

    // Collect form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      comment: document.getElementById('comment').value,
      delivery: document.querySelector('input[name="delivery"]:checked').value,
      payment: document.querySelector('input[name="payment"]:checked').value,
      items: this.cartItems,
      total: this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      deliveryCost: this.deliveryCost,
      couponDiscount: this.couponDiscount,
      finalTotal: this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + this.deliveryCost - this.couponDiscount
    };

    // Show loading state
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const originalText = placeOrderBtn.textContent;
    placeOrderBtn.textContent = 'Обрабатываем заказ...';
    placeOrderBtn.disabled = true;

    // Simulate order processing
    setTimeout(() => {
      console.log('Order data:', formData);
      this.showNotification('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.', 'success');
      
      // Reset form
      form.reset();
      this.cartItems = [];
      this.couponDiscount = 0;
      this.saveCartToStorage();
      this.renderCartItems();
      this.updateOrderSummary();
      
      // Reset button
      placeOrderBtn.textContent = originalText;
      placeOrderBtn.disabled = false;
    }, 2000);
  }
}

// Initialize cart when DOM is loaded
let cartManager;
document.addEventListener('DOMContentLoaded', () => {
  console.log('Cart page loaded, initializing cart manager...');
  try {
    cartManager = new CartManager();
    console.log('Cart manager initialized successfully');
  } catch (error) {
    console.error('Error initializing cart manager:', error);
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
