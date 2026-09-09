/**
 * EXCLUSIVE E-COMMERCE - CORE JAVASCRIPT LOGIC
 */

// Global State
const state = {
  cart: [],
  wishlist: new Set(),
  backendProducts: [],
  activeCategory: 'Camera',
  countdownTotalSeconds: (3 * 86400) + (23 * 3600) + (19 * 60) + 56, // 03d 23h 19m 56s from screenshot
};

// Initial featured promo items matching screenshot
const PROMO_PRODUCTS = {
  'promo-1': {
    id: 'promo-1',
    name: 'HAVIT HV-G92 Gamepad',
    price: 120,
    oldPrice: 160,
    discount: '-40%',
    image: 'assets/images/gamepad.jpg',
    category: 'Jogos',
    rating: 5,
    reviews: 88,
    desc: 'Gamepad ergonômico USB com vibração dupla, botões táteis de alta precisão e acabamento emborrachado para máximo conforto durante longas sessões.'
  },
  'promo-2': {
    id: 'promo-2',
    name: 'AK-900 Wired Keyboard',
    price: 960,
    oldPrice: 1160,
    discount: '-35%',
    image: 'assets/images/keyboard.jpg',
    category: 'Computador',
    rating: 5,
    reviews: 75,
    desc: 'Teclado mecânico gamer com retroiluminação RGB Chroma dinâmica, switches mecânicos de resposta rápida e construção em alumínio escovado.'
  },
  'promo-3': {
    id: 'promo-3',
    name: 'IPS LCD Gaming Monitor',
    price: 370,
    oldPrice: 400,
    discount: '-30%',
    image: 'assets/images/monitor.jpg',
    category: 'Computador',
    rating: 5,
    reviews: 99,
    desc: 'Monitor gamer curvo IPS de 165Hz com tempo de resposta de 1ms, suporte a FreeSync e contraste ultra vivo com tecnologia HDR.'
  },
  'promo-4': {
    id: 'promo-4',
    name: 'Placa de Vídeo ASRock Radeon',
    price: 375,
    oldPrice: 400,
    discount: '-25%',
    image: 'assets/images/gpu.jpg',
    category: 'Computador',
    rating: 5,
    reviews: 98,
    desc: 'Placa gráfica potente equipada com arquitetura RDNA 3, 16GB GDDR6, refrigeração com fans duplos silenciosos e suporte a Ray Tracing de última geração.'
  }
};

// ---------------------------------------------------------------------------
// 1. COUNTDOWN TIMER
// ---------------------------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-minutes');
  const secsEl = document.getElementById('timer-seconds');

  function updateTimer() {
    if (state.countdownTotalSeconds <= 0) return;

    state.countdownTotalSeconds--;

    const d = Math.floor(state.countdownTotalSeconds / 86400);
    const h = Math.floor((state.countdownTotalSeconds % 86400) / 3600);
    const m = Math.floor((state.countdownTotalSeconds % 3600) / 60);
    const s = state.countdownTotalSeconds % 60;

    if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateTimer, 1000);
}

// ---------------------------------------------------------------------------
// 2. HERO BANNER SLIDER
// ---------------------------------------------------------------------------
function initHeroSlider() {
  const dots = document.querySelectorAll('.hero-dot');
  const heroImg = document.getElementById('heroImg');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      if (heroImg) {
        heroImg.style.opacity = '0.7';
        setTimeout(() => {
          heroImg.style.opacity = '1';
        }, 200);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 3. CART SYSTEM
// ---------------------------------------------------------------------------
function addToCart(product) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`"${product.name}" adicionado ao carrinho!`);
}

function updateCartQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }

  updateCartUI();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  updateCartUI();
  showToast('Item removido do carrinho.');
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const cartCountEl = document.getElementById('cartCount');
  const cartDrawerCountEl = document.getElementById('cartDrawerCount');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const container = document.getElementById('cartItemsContainer');

  if (cartCountEl) cartCountEl.textContent = totalCount;
  if (cartDrawerCountEl) cartDrawerCountEl.textContent = totalCount;
  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  if (container) {
    if (state.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" style="margin-bottom:12px;">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Seu carrinho está vazio.</p>
        </div>`;
    } else {
      container.innerHTML = state.cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
              <span>${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
              <button onclick="removeFromCart('${item.id}')" style="margin-left:auto; color:#999; font-size:12px;">Remover</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

function checkout() {
  if (state.cart.length === 0) {
    showToast('Adicione produtos ao carrinho antes de finalizar.');
    return;
  }

  // Fecha o drawer lateral para ir para a aba
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');

  // Se não estiver logado, vai para a aba de login obrigatório
  if (!state.user) {
    const subtitleEl = document.getElementById('loginSubtitle');
    if (subtitleEl) subtitleEl.textContent = 'Entre na sua conta para finalizar a compra';

    showTab('login');
    showToast('Faça login para continuar para a forma de pagamento.');
    return;
  }

  // Se já logado, vai direto para a aba de formas de pagamento
  showTab('checkout');
}

function finalizeOrder() {
  const userName = state.user ? (state.user.name || 'Cliente') : 'Cliente';
  showToast(`Compra finalizada com sucesso! Parabéns, ${userName}! 🎉`);
  state.cart = [];
  updateCartUI();

  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// ---------------------------------------------------------------------------
// NAVEGAÇÃO ENTRE ABAS (HOME / LOGIN / CHECKOUT CONFORME PRINTS)
// ---------------------------------------------------------------------------
function showTab(tabName) {
  const homeView = document.getElementById('homeView');
  const loginView = document.getElementById('loginView');
  const checkoutView = document.getElementById('checkoutView');

  const brandLogo = document.getElementById('brand-logo');
  const headerBackBtn = document.getElementById('headerBackBtn');
  const headerNav = document.getElementById('headerNav');
  const headerLoginTitle = document.getElementById('headerLoginTitle');
  const headerCartTitle = document.getElementById('headerCartTitle');
  const navLinkHome = document.getElementById('navLinkHome');

  if (tabName === 'checkout') {
    if (homeView) homeView.style.display = 'none';
    if (loginView) loginView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'block';

    if (brandLogo) brandLogo.style.display = 'none';
    if (headerBackBtn) headerBackBtn.style.display = 'inline-flex';
    if (headerNav) headerNav.style.display = 'none';
    if (headerLoginTitle) headerLoginTitle.style.display = 'none';
    if (headerCartTitle) headerCartTitle.style.display = 'block';

    updateCheckoutTotals();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tabName === 'login') {
    if (homeView) homeView.style.display = 'none';
    if (loginView) loginView.style.display = 'block';
    if (checkoutView) checkoutView.style.display = 'none';

    if (brandLogo) brandLogo.style.display = 'none';
    if (headerBackBtn) headerBackBtn.style.display = 'inline-flex';
    if (headerNav) headerNav.style.display = 'none';
    if (headerLoginTitle) headerLoginTitle.style.display = 'block';
    if (headerCartTitle) headerCartTitle.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const emailField = document.getElementById('loginEmail');
      if (emailField) emailField.focus();
    }, 150);
  } else {
    // Aba Home
    if (homeView) homeView.style.display = 'block';
    if (loginView) loginView.style.display = 'none';
    if (checkoutView) checkoutView.style.display = 'none';

    if (brandLogo) brandLogo.style.display = 'inline-block';
    if (headerBackBtn) headerBackBtn.style.display = 'none';
    if (headerNav) headerNav.style.display = 'block';
    if (headerLoginTitle) headerLoginTitle.style.display = 'none';
    if (headerCartTitle) headerCartTitle.style.display = 'none';
    if (navLinkHome) navLinkHome.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Atualiza os valores do resumo de pagamento
function updateCheckoutTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutFrete = document.getElementById('checkoutFrete');
  const checkoutTotal = document.getElementById('checkoutTotal');

  if (checkoutSubtotal) {
    checkoutSubtotal.textContent = `R$ ${subtotal > 0 ? subtotal.toFixed(2).replace('.', ',') : '000,00'}`;
  }
  if (checkoutFrete) {
    checkoutFrete.textContent = 'R$ 00,00';
  }
  if (checkoutTotal) {
    checkoutTotal.textContent = `R$ ${subtotal > 0 ? subtotal.toFixed(2).replace('.', ',') : '000,00'}`;
  }
}

// ---------------------------------------------------------------------------
// FORMAS DE PAGAMENTO (CARTÃO, PIX, BOLETO CONFORME PRINT)
// ---------------------------------------------------------------------------
let currentPaymentMethod = 'card';

function selectPaymentMethod(method) {
  currentPaymentMethod = method;

  const btnCard = document.getElementById('btnMethodCard');
  const btnPix = document.getElementById('btnMethodPix');
  const btnBoleto = document.getElementById('btnMethodBoleto');

  const cardFields = document.getElementById('cardFields');
  const pixFields = document.getElementById('pixFields');
  const boletoFields = document.getElementById('boletoFields');

  if (btnCard) btnCard.classList.toggle('active', method === 'card');
  if (btnPix) btnPix.classList.toggle('active', method === 'pix');
  if (btnBoleto) btnBoleto.classList.toggle('active', method === 'boleto');

  if (cardFields) cardFields.style.display = method === 'card' ? 'block' : 'none';
  if (pixFields) pixFields.style.display = method === 'pix' ? 'block' : 'none';
  if (boletoFields) boletoFields.style.display = method === 'boleto' ? 'block' : 'none';
}

function copyPixKey() {
  navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136exclusive-loja-9948293758291');
  showToast('Chave Pix copiada para a área de transferência!');
}

function handleConfirmPayment(e) {
  if (e) e.preventDefault();

  const termsAgree = document.getElementById('termsAgree');
  if (!termsAgree || !termsAgree.checked) {
    showToast('Por favor, concorde com os termos de compra.');
    return;
  }

  if (currentPaymentMethod === 'card') {
    const cardNumber = document.getElementById('cardNumber');
    const cardHolder = document.getElementById('cardHolder');
    if (cardNumber && !cardNumber.value.trim()) {
      showToast('Por favor, preencha o número do cartão.');
      cardNumber.focus();
      return;
    }
    if (cardHolder && !cardHolder.value.trim()) {
      showToast('Por favor, preencha o nome impresso no cartão.');
      cardHolder.focus();
      return;
    }
  }

  const btn = document.getElementById('btnConfirmPayment');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Processando pagamento...';
  }

  setTimeout(() => {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const formatted = subtotal > 0 ? `R$ ${subtotal.toFixed(2).replace('.', ',')}` : 'R$ 000,00';

    showToast(`Pagamento de ${formatted} confirmado com sucesso! Pedido aprovado! 🎉`);

    state.cart = [];
    updateCartUI();

    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Confirmar pagamento';
    }

    // Retorna para a home page
    showTab('home');
  }, 1000);
}

function handleLogin(e) {
  if (e) e.preventDefault();
  const emailField = document.getElementById('loginEmail');
  const passwordField = document.getElementById('loginPassword');
  const email = emailField ? emailField.value.trim() : '';
  const password = passwordField ? passwordField.value : '';

  if (!email || !password) {
    showToast('Por favor, informe e-mail e senha.');
    return;
  }

  const name = email.split('@')[0];
  state.user = { email, name };

  showToast(`Login realizado com sucesso! Bem-vindo(a), ${name}!`);

  // Se havia pedido em andamento no carrinho, avança para a tela de pagamento
  if (state.cart.length > 0) {
    setTimeout(() => {
      showTab('checkout');
    }, 400);
  } else {
    showTab('home');
  }
}

function handleSocialLogin(provider) {
  state.user = { email: `usuario_${provider.toLowerCase()}@exemplo.com`, name: `Usuário ${provider}` };
  showToast(`Conectado com ${provider} com sucesso!`);

  if (state.cart.length > 0) {
    setTimeout(() => {
      showTab('checkout');
    }, 400);
  } else {
    showTab('home');
  }
}

function handleForgotPassword() {
  const emailField = document.getElementById('loginEmail');
  const email = emailField ? emailField.value.trim() : '';
  if (email) {
    showToast(`Instruções de recuperação enviadas para: ${email}`);
  } else {
    showToast('Digite seu e-mail no campo acima para recuperar a senha.');
  }
}

function handleSignupClick() {
  const emailField = document.getElementById('loginEmail');
  const email = (emailField && emailField.value.trim()) || 'novo_usuario@exemplo.com';
  state.user = { email, name: email.split('@')[0] };
  showToast('Conta criada com sucesso! Você já está autenticado.');

  if (state.cart.length > 0) {
    setTimeout(() => {
      showTab('checkout');
    }, 400);
  } else {
    showTab('home');
  }
}

// ---------------------------------------------------------------------------
// 4. WISHLIST SYSTEM
// ---------------------------------------------------------------------------
function toggleWishlist(id, btn) {
  if (state.wishlist.has(id)) {
    state.wishlist.delete(id);
    if (btn) btn.classList.remove('active');
    showToast('Removido dos favoritos.');
  } else {
    state.wishlist.add(id);
    if (btn) btn.classList.add('active');
    showToast('Adicionado aos favoritos!');
  }

  const wishlistCountEl = document.getElementById('wishlistCount');
  if (wishlistCountEl) {
    wishlistCountEl.textContent = state.wishlist.size;
  }
}

// ---------------------------------------------------------------------------
// 5. QUICK VIEW MODAL
// ---------------------------------------------------------------------------
function openQuickView(product) {
  const modal = document.getElementById('quickViewModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalPriceCurrent = document.getElementById('modalPriceCurrent');
  const modalPriceOld = document.getElementById('modalPriceOld');
  const modalDesc = document.getElementById('modalDesc');
  const modalBadge = document.getElementById('modalBadge');
  const modalAddBtn = document.getElementById('modalAddBtn');

  if (modalImg) modalImg.src = product.image;
  if (modalTitle) modalTitle.textContent = product.name;
  if (modalPriceCurrent) modalPriceCurrent.textContent = `$${product.price}`;
  if (modalPriceOld) modalPriceOld.textContent = product.oldPrice ? `$${product.oldPrice}` : '';
  if (modalDesc) modalDesc.textContent = product.desc || 'Produto de alta performance selecionado para você.';
  if (modalBadge) modalBadge.textContent = product.discount || 'Destaque';

  if (modalAddBtn) {
    modalAddBtn.onclick = () => {
      addToCart(product);
      closeQuickView();
    };
  }

  if (modal) modal.classList.add('open');
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('open');
}

// ---------------------------------------------------------------------------
// 6. TOAST NOTIFICATIONS
// ---------------------------------------------------------------------------
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DB4444" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---------------------------------------------------------------------------
// 7. CATEGORIES INTERACTION
// ---------------------------------------------------------------------------
function initCategories() {
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      categoryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const cat = card.dataset.category;
      state.activeCategory = cat;
      showToast(`Categoria selecionada: ${cat}`);
      filterProductsByCategory(cat);
    });
  });
}

function filterProductsByCategory(categoryName) {
  const cards = document.querySelectorAll('#flashSalesGrid .product-card');
  cards.forEach(card => {
    const id = card.dataset.id;
    const prod = PROMO_PRODUCTS[id];
    if (!prod) return;

    if (categoryName === 'Camera') {
      // Keep all visible as in the screenshot default
      card.style.display = 'flex';
    } else if (prod.category.toLowerCase().includes(categoryName.toLowerCase())) {
      card.style.display = 'flex';
      card.style.boxShadow = '0 0 0 2px #DB4444';
      setTimeout(() => card.style.boxShadow = '', 1500);
    } else {
      card.style.display = 'flex'; // Keep layout intact, subtle opacity
      card.style.opacity = '0.5';
      setTimeout(() => card.style.opacity = '1', 1000);
    }
  });
}

// ---------------------------------------------------------------------------
// 8. SEARCH FILTER
// ---------------------------------------------------------------------------
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('#flashSalesGrid .product-card');

    cards.forEach(card => {
      const id = card.dataset.id;
      const prod = PROMO_PRODUCTS[id];
      if (!prod) return;

      const match = prod.name.toLowerCase().includes(query) ||
                    prod.category.toLowerCase().includes(query);
      card.style.display = match ? 'flex' : 'none';
    });
  });
}

// ---------------------------------------------------------------------------
// 9. BACKEND API INTEGRATION (FLASK / EXCEL)
// ---------------------------------------------------------------------------
async function loadBackendProducts() {
  const catalogoSection = document.getElementById('catalogoSection');
  const statusEl = document.getElementById('catalogoStatus');
  const gridEl = document.getElementById('backendProductsGrid');

  try {
    const resp = await fetch('http://localhost:5000/api/produtos', { method: 'GET' });
    if (!resp.ok) throw new Error('API não disponível');

    const products = await resp.json();
    state.backendProducts = products;

    if (statusEl) {
      statusEl.textContent = `${products.length} produtos carregados diretamente da planilha Excel (data/produtos.xlsx).`;
    }

    if (gridEl) {
      gridEl.innerHTML = products.map(p => `
        <article class="product-card">
          <div class="product-img-wrapper">
            <span class="product-badge" style="background:#2f5597;">${p.categoria}</span>
            <img src="${p.imagem_url}" alt="${p.nome}" class="product-img" onerror="this.src='assets/images/gamepad.jpg'">
            <button class="add-to-cart-btn" onclick="addToCart({id: 'be-${p.id}', name: '${p.nome.replace(/'/g, "\\'")}', price: ${p.preco}, image: '${p.imagem_url}'})">
              Adicionar ao Carrinho
            </button>
          </div>
          <div class="product-info">
            <h3 class="product-name">${p.nome}</h3>
            <div class="product-price-row">
              <span class="price-current">R$ ${Number(p.preco).toFixed(2)}</span>
            </div>
            <p style="font-size:12px; color:#777;">Estoque: ${p.estoque} un.</p>
          </div>
        </article>
      `).join('');
    }
  } catch (err) {
    if (statusEl) {
      statusEl.textContent = 'Backend Flask não conectado no momento. Inicie com "python app.py" para sincronização com Excel.';
    }
  }
}

// ---------------------------------------------------------------------------
// 10. ATTACH EVENT LISTENERS & SETUP
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initHeroSlider();
  initCategories();
  initSearch();

  // Cart Button on Header
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', toggleCart);

  // Add To Cart Buttons on Promo Cards
  document.querySelectorAll('#flashSalesGrid .add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const product = PROMO_PRODUCTS[id];
      if (product) addToCart(product);
    });
  });

  // Wishlist Toggle Buttons
  document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      toggleWishlist(id, btn);
    });
  });

  // Quick View Buttons
  document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const product = PROMO_PRODUCTS[id];
      if (product) openQuickView(product);
    });
  });

  // "Catálogo" Button toggle
  const btnCatalogo = document.getElementById('btnCatalogo');
  const catalogoSection = document.getElementById('catalogoSection');
  if (btnCatalogo && catalogoSection) {
    btnCatalogo.addEventListener('click', () => {
      const isHidden = catalogoSection.style.display === 'none';
      catalogoSection.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        catalogoSection.scrollIntoView({ behavior: 'smooth' });
        loadBackendProducts();
      }
    });
  }

  // Language toggle notice
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      showToast('Idioma selecionado: Português (Brasil)');
    });
  }

  // Newsletter subscription
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value;
      if (email) {
        showToast('Obrigado por se inscrever! Cupom de 10% enviado.');
        document.getElementById('newsletterEmail').value = '';
      }
    });
  }

  // Horizontal scroll arrows for promo cards
  const promoGrid = document.getElementById('flashSalesGrid');
  const promoPrev = document.getElementById('promoPrev');
  const promoNext = document.getElementById('promoNext');

  if (promoPrev && promoGrid) {
    promoPrev.addEventListener('click', () => {
      promoGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }
  if (promoNext && promoGrid) {
    promoNext.addEventListener('click', () => {
      promoGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // Formatação automática do número do cartão (#### #### #### ####)
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      val = val.replace(/(\d{4})(?=\d)/g, '$1 ');
      e.target.value = val;
    });
  }

  // Formatação da validade do cartão (MM/AA)
  const cardExpiryInput = document.getElementById('cardExpiry');
  if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
    });
  }

  // Formatação do CVV (números apenas)
  const cardCvvInput = document.getElementById('cardCvv');
  if (cardCvvInput) {
    cardCvvInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
});
