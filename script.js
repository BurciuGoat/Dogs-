document.addEventListener('DOMContentLoaded', () => {
    // Get navigation links
    const linkPhotos = document.getElementById('link-photos');
    const linkProducts = document.getElementById('link-products');

    // Get sections
    const photosSection = document.getElementById('photos-section');
    const productsSection = document.getElementById('products-section');

    // Function to switch views
    function switchView(showPhotos) {
        if (showPhotos) {
            // Show photos, hide products
            photosSection.classList.remove('hidden-view');
            photosSection.classList.add('active-view');

            productsSection.classList.remove('active-view');
            productsSection.classList.add('hidden-view');

            // Update active states on nav
            linkPhotos.classList.add('active');
            linkProducts.classList.remove('active');
        } else {
            // Show products, hide photos
            productsSection.classList.remove('hidden-view');
            productsSection.classList.add('active-view');

            photosSection.classList.remove('active-view');
            photosSection.classList.add('hidden-view');

            // Update active states on nav
            linkProducts.classList.add('active');
            linkPhotos.classList.remove('active');
        }
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

    // Add event listeners to buy buttons for interaction
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Added to cart! Thank you for supporting Daisy & Biscuit!');
        });
    });
});
