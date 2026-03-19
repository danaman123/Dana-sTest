/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===== MENU DATA ===== */
const menuData = {
  drinks: [
    { icon: '☕', name: 'Cà Phê Sữa Đá', desc: 'Classic Vietnamese iced coffee with condensed milk', price: '45,000 ₫' },
    { icon: '🥤', name: 'Capybara Coconut Latte', desc: 'Espresso blended with fresh Da Nang coconut milk', price: '65,000 ₫' },
    { icon: '🍵', name: 'Jasmine Green Tea', desc: 'Fragrant jasmine blossoms, locally sourced', price: '40,000 ₫' },
    { icon: '🥭', name: 'Mango Passion Smoothie', desc: 'Da Nang mango, passion fruit, fresh lime juice', price: '55,000 ₫' },
    { icon: '🧋', name: 'Taro Bubble Tea', desc: 'Creamy taro with tapioca pearls', price: '60,000 ₫' },
    { icon: '🍋', name: 'Canh Chua Lemonade', desc: 'Vietnamese sour lemonade with salt & chili rim', price: '45,000 ₫' },
  ],
  food: [
    { icon: '🥐', name: 'Bánh Mì Capybara', desc: 'Toasted baguette, pâté, pickled daikon, cilantro, jalapeño', price: '55,000 ₫' },
    { icon: '🍰', name: 'Pandan Cheesecake', desc: 'Silky cheesecake with pandan swirl & coconut cream', price: '70,000 ₫' },
    { icon: '🥗', name: 'Green Mango Salad', desc: 'Shredded green mango, peanuts, dried shrimp, fish sauce dressing', price: '65,000 ₫' },
    { icon: '🍜', name: 'Mì Quảng Mini', desc: 'Signature Da Nang noodles — small portion, full flavour', price: '80,000 ₫' },
    { icon: '🍡', name: 'Bánh Bao Capybara', desc: 'Steamed bao buns shaped like capybaras, lotus paste filling', price: '75,000 ₫' },
    { icon: '🍦', name: 'Coconut Soft Serve', desc: 'Fresh coconut soft serve with pandan drizzle', price: '50,000 ₫' },
  ],
  specials: [
    { icon: '🦫', name: 'The Capybara Platter', desc: 'Curated fruit & veg snacks (the same ones our capybaras love!)', price: '120,000 ₫' },
    { icon: '🎂', name: 'Birthday Capybara Cake', desc: 'Bespoke celebration cake shaped like your favourite capybara', price: 'From 350,000 ₫' },
    { icon: '🍉', name: 'Watermelon Float', desc: 'Fresh watermelon juice topped with coconut sorbet — Mưa\'s fav!', price: '75,000 ₫' },
    { icon: '🌿', name: 'Herb Garden Mocktail', desc: 'Mint, lemongrass, cucumber — as fresh as our habitat', price: '65,000 ₫' },
  ],
};

/* ===== RENDER MENU ===== */
function renderMenu(tab) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[tab] || [];
  grid.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="menu-icon">${item.icon}</div>
      <div class="menu-info">
        <div class="menu-name">${item.name}</div>
        <div class="menu-desc">${item.desc}</div>
        <div class="menu-price">${item.price}</div>
      </div>
    </div>
  `).join('');
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.tab);
  });
});

// Initial render
renderMenu('drinks');

/* ===== BOOKING FORM ===== */
// Set min date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

const bookingForm = document.getElementById('bookingForm');
const formSuccess  = document.getElementById('formSuccess');

bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  // Simulate booking submission
  const btn = bookingForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  setTimeout(() => {
    formSuccess.style.display = 'block';
    bookingForm.reset();
    btn.disabled = false;
    btn.textContent = 'Confirm Reservation';
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1200);
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.capy-card, .menu-item, .gallery-item, .info-block').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});
