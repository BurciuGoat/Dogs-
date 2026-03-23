document.addEventListener('DOMContentLoaded', () => {
    // Get navigation links
    const linkPhotos = document.getElementById('link-photos');
    const linkProducts = document.getElementById('link-products');

    // Get sections
    const photosSection = document.getElementById('photos-section');
    const productsSection = document.getElementById('products-section');

    // Function to switch views
    function switchView(showPhotos) {
        photosSection.classList.toggle('active-view', showPhotos);
        photosSection.classList.toggle('hidden-view', !showPhotos);

        productsSection.classList.toggle('active-view', !showPhotos);
        productsSection.classList.toggle('hidden-view', showPhotos);

        // Update active states on nav
        linkPhotos.classList.toggle('active', showPhotos);
        linkProducts.classList.toggle('active', !showPhotos);
    }

    // Add event listeners to navigation links
    linkPhotos.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(true);
    });

    linkProducts.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(false);
    });

    // --- Cart State Management ---
    let cart = [];
    let discountApplied = false;
    let discountRate = 0.15; // 15% discount for UCSD students

    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Toggle Cart Sidebar
    function toggleCart() {
        cartSidebar.classList.toggle('open');
    }

    cartToggleBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);

    // Render Cart Items
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">&times;</button>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
        }

        if (discountApplied) {
            total = total * (1 - discountRate);
        }

        cartTotalAmount.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
        checkoutBtn.disabled = cart.length === 0;
    }

    // Add item to cart logic
    // We use event delegation on products-section as items might be dynamically handled
    productsSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('buy-btn')) {
            const productCard = e.target.closest('.product-card');
            if (productCard) {
                const name = productCard.dataset.name;
                const price = parseFloat(productCard.dataset.price);
                cart.push({ name, price });
                renderCart();
                cartSidebar.classList.add('open');
            }
        }
    });

    // Remove item from cart logic
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            cart.splice(index, 1);
            renderCart();
        }
    });

    // Initialize Empty Cart UI
    renderCart();

    // Update the cart button text directly as requested
    document.querySelector('#cart-count').textContent = '3';

    // --- UCSD Discount Logic ---
    const ucsdEmailInput = document.getElementById('ucsd-email');
    const ucsdBtn = document.getElementById('ucsd-btn');
    const ucsdMessage = document.getElementById('ucsd-message');

    ucsdBtn.addEventListener('click', () => {
        const email = ucsdEmailInput.value.trim();
        if (email.endsWith('.ucsd.edu') || email.endsWith('@ucsd.edu')) {
            discountApplied = true;
            ucsdMessage.textContent = 'Student verified! 15% discount applied to your cart. Good luck on finals!';
            ucsdMessage.className = 'ucsd-message ucsd-success';
            renderCart(); // Re-render to show discounted total
            ucsdBtn.disabled = true; // Prevent multiple applications
        } else {
            ucsdMessage.textContent = 'Invalid email. Please use a valid .ucsd.edu email address.';
            ucsdMessage.className = 'ucsd-message ucsd-error';
        }
    });

    // --- Checkout Modal Logic ---
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const paymentForm = document.getElementById('payment-form');

    // Open Modal
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            paymentModal.classList.add('active');
            cartSidebar.classList.remove('open'); // Close sidebar when opening modal
        }
    });

    // Close Modal
    closeModalBtn.addEventListener('click', () => {
        paymentModal.classList.remove('active');
    });

    // Handle Payment Submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Mock successful payment
        alert('Payment successful! Your heroic gear is on its way.');

        // Reset state
        cart = [];
        discountApplied = false;

        // Reset UCSD UI
        ucsdEmailInput.value = '';
        ucsdBtn.disabled = false;
        ucsdMessage.textContent = '';
        ucsdMessage.className = 'ucsd-message';

        renderCart();
        paymentModal.classList.remove('active');
        paymentForm.reset();
    });

});
