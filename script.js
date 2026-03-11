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

    // Add event listeners to buy buttons for interaction
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Added to cart! Thank you for supporting Daisy & Biscuit!');
        });
    });
});
