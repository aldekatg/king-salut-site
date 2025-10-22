// Данные товаров
const productsData = [
  {
    id: 1,
    name: "Салют VIP ХАН 188 зарядов",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "14 000",
    oldPrice: "18 000",
    discount: "-20%",
    badge: "Топ продаж",
    category: "new",
  },
  {
    id: 2,
    name: "Салют КАРНАВАЛЬНАЯ НОЧЬ 120 зарядов",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "12 500",
    oldPrice: "15 000",
    discount: "-17%",
    badge: "Топ продаж",
    category: "new",
  },
  {
    id: 3,
    name: "Салют НОВОГОДНИЙ 96 зарядов",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "9 800",
    oldPrice: "12 000",
    discount: "-18%",
    badge: "Топ продаж",
    category: "new",
  },
  {
    id: 4,
    name: "Салют ДЕТСКИЙ 64 заряда",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "6 500",
    oldPrice: "8 000",
    discount: "-19%",
    badge: "Топ продаж",
    category: "new",
  },
  {
    id: 5,
    name: "Салют VIP ХАН 188 зарядов",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "14 000",
    oldPrice: "18 000",
    discount: "-20%",
    badge: "Топ продаж",
    category: "top",
  },
  {
    id: 6,
    name: "Салют КАРНАВАЛЬНАЯ НОЧЬ 120 зарядов",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "12 500",
    oldPrice: "15 000",
    discount: "-17%",
    badge: "Топ продаж",
    category: "top",
  },
  {
    id: 7,
    name: "Салют НОВОГОДНИЙ 96 зарядов",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "9 800",
    oldPrice: "12 000",
    discount: "-18%",
    badge: "Топ продаж",
    category: "top",
  },
  {
    id: 8,
    name: "Салют ДЕТСКИЙ 64 заряда",
    image: "images/products/salyut-vip-1.jpg",
    currentPrice: "6 500",
    oldPrice: "8 000",
    discount: "-19%",
    badge: "Топ продаж",
    category: "top",
  },
];

// Функция создания карточки товара
function createProductCard(product) {
  return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-badge">${product.badge}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=VIP+ХАН'">
            </div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                <span class="current-price">${product.currentPrice} ₸</span>
                <span class="old-price">${product.oldPrice} ₸</span>
                <span class="discount">${product.discount}</span>
            </div>
            <div class="product-buttons">
                <button class="btn btn-buy" onclick="addToCart(${product.id})">Купить</button>
                <button class="btn btn-whatsapp" onclick="orderViaWhatsApp(${product.id})">
                    <i class="fab fa-whatsapp"></i>
                    Заказ по Whatsapp
                </button>
            </div>
        </div>
    `;
}

// Функция отображения товаров
function renderProducts() {
  const newProductsContainer = document.getElementById("new-products");
  const topProductsContainer = document.getElementById("top-products");

  // Фильтруем товары по категориям
  const newProducts = productsData.filter(
    (product) => product.category === "new"
  );
  const topProducts = productsData.filter(
    (product) => product.category === "top"
  );

  // Отображаем только первые 4 товара в каждой категории
  const newProductsToShow = newProducts.slice(0, 4);
  const topProductsToShow = topProducts.slice(0, 4);

  // Генерируем HTML для новинок
  newProductsContainer.innerHTML = newProductsToShow
    .map((product) => createProductCard(product))
    .join("");

  // Генерируем HTML для топ продаж
  topProductsContainer.innerHTML = topProductsToShow
    .map((product) => createProductCard(product))
    .join("");
}

// Функция добавления в корзину
function addToCart(productId) {
  const product = productsData.find((p) => p.id === productId);
  if (product) {
    showCartModal(product);
  }
}

// Функция показа модального окна корзины
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

  // Обработчики для кнопок количества
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");

  function updateTotal() {
    const quantity = parseInt(cartItemQuantity.value);
    const price = parseInt(product.currentPrice.replace(/\s/g, ""));
    const total = quantity * price;
    cartItemTotal.textContent = total.toLocaleString() + " ₸";
  }

  minusBtn.onclick = () => {
    if (cartItemQuantity.value > 1) {
      cartItemQuantity.value = parseInt(cartItemQuantity.value) - 1;
      updateTotal();
    }
  };

  plusBtn.onclick = () => {
    if (cartItemQuantity.value < 99) {
      cartItemQuantity.value = parseInt(cartItemQuantity.value) + 1;
      updateTotal();
    }
  };

  cartItemQuantity.onchange = updateTotal;
}

// Функция заказа через WhatsApp
function orderViaWhatsApp(productId) {
  const product = productsData.find((p) => p.id === productId);
  if (product) {
    const phoneNumber = "77764567868";
    const message = `Здравствуйте! Хочу заказать товар: ${product.name} за ${product.currentPrice} ₸`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }
}

// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  // Рендерим товары при загрузке страницы
  renderProducts();

  // Mobile Menu functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");

  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  }

  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Event listeners for mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
  }

  // Close mobile menu when clicking on nav links
  const mobileNavLinks = document.querySelectorAll(".mobile-menu .nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Обработчики модального окна корзины
  const modal = document.getElementById("cartModal");
  const closeBtn = document.querySelector(".close");
  const continueShoppingBtn = document.querySelector(".continue-shopping");
  const checkoutBtn = document.querySelector(".btn-checkout");

  // Закрытие модального окна
  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeModal);
  continueShoppingBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });

  // Закрытие при клике вне модального окна
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Обработка оформления заказа
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

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("i");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
        const faqIcon = faqItem.querySelector(".faq-question i");
        faqIcon.className = "fas fa-plus";
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        icon.className = "fas fa-minus";
      }
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add hover effects to product cards
document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

document.querySelectorAll(".btn-whatsapp").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    // Open WhatsApp with pre-filled message
    const phoneNumber = "77774567868";
    const message = "Здравствуйте! Хочу заказать салют.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });
});

// Floating WhatsApp button functionality
document
  .querySelector(".floating-whatsapp")
  .addEventListener("click", function () {
    const phoneNumber = "77774567868";
    const message = "Здравствуйте! Хочу заказать салют.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });

// Search functionality
const searchInput = document.querySelector(".search input");
if (searchInput) {
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const searchTerm = this.value.trim();
      if (searchTerm) {
        alert(`Поиск по запросу: "${searchTerm}"`);
        // Here you would implement actual search functionality
      }
    }
  });
}

// Category filter functionality
document.querySelectorAll(".category-filter").forEach((filter) => {
  filter.addEventListener("click", function () {
    // Remove active class from all filters
    document.querySelectorAll(".category-filter").forEach((f) => {
      f.classList.remove("active");
    });

    // Add active class to clicked filter
    this.classList.add("active");

    // Get filter text
    const filterText = this.querySelector(
      "span:not(.category-icon)"
    ).textContent;
    console.log(`Filtering by: ${filterText}`);

    // Here you would implement actual filtering functionality
    // For now, just show an alert
    alert(`Фильтр: ${filterText}`);
  });
});

// Show all buttons functionality
document.querySelectorAll(".btn-show-all").forEach((btn) => {
  btn.addEventListener("click", function () {
    const section = this.closest(".products-section");
    const grid = section.querySelector(".products-grid");
    const sectionTitle = section.querySelector(".section-title").textContent;

    if (sectionTitle === "Новинки") {
      const allNewProducts = productsData.filter(
        (product) => product.category === "new"
      );
      grid.innerHTML = allNewProducts
        .map((product) => createProductCard(product))
        .join("");
    } else if (sectionTitle === "Топ продаж") {
      const allTopProducts = productsData.filter(
        (product) => product.category === "top"
      );
      grid.innerHTML = allTopProducts
        .map((product) => createProductCard(product))
        .join("");
    }

    // Скрываем кнопку "Показать все" после клика
    this.style.display = "none";
  });
});

// Phone number click handler
document.querySelector(".contact").addEventListener("click", function () {
  const phoneNumber = "77774567868";
  window.location.href = `tel:${phoneNumber}`;
});

// Add scroll effect to header
window.addEventListener("scroll", function () {
  const headerTop = document.querySelector(".header-top");
  const headerBottom = document.querySelector(".header-bottom");

  if (window.scrollY > 100) {
    headerTop.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    headerBottom.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    headerBottom.style.backdropFilter = "blur(10px)";
  } else {
    headerTop.style.backgroundColor = "#000000";
    headerBottom.style.backgroundColor = "white";
    headerBottom.style.backdropFilter = "none";
  }
});

// Обработка ошибок загрузки изображений
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.log("Ошибка загрузки изображения:", this.src);
      // Создаем fallback изображение
      this.style.color = "white";
      this.style.display = "flex";
      this.style.alignItems = "center";
      this.style.justifyContent = "center";
      this.style.fontWeight = "bold";
      this.style.fontSize = "16px";
      this.alt = "Изображение недоступно";
    });

    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });
});

// Mobile menu toggle (for future mobile navigation)
function toggleMobileMenu() {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("mobile-open");
}

// Add mobile menu button if needed
if (window.innerWidth <= 768) {
  const headerContent = document.querySelector(".header-content");
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
    `;

  headerContent.appendChild(mobileMenuBtn);

  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
}
