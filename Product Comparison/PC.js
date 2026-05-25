 document.addEventListener('DOMContentLoaded', () => {
    const compareSelectionKey = 'compareSelection';
    const compareTargetKey = 'compareTarget';

    const catalog = [
        {
            id: 'asgaard-sofa',
            name: 'Asgaard Sofa',
            price: 'Rs. 250,000.00',
            image: 'Group 156.png',
            category: 'living',
            description: 'L-shaped sectional sofa with premium fabric and solid wood legs.',
            rating: 4.7,
            reviews: 204,
            salesPackage: '1 sectional sofa',
            modelNumber: 'TFCBLIGRBL6SRHS',
            secondaryMaterial: 'Solid Wood',
            configuration: 'L-shaped',
            upholsteryMaterial: 'Fabric + Cotton',
            upholsteryColor: 'Bright Grey & Lion',
            fillingMaterial: 'Foam',
            finishType: 'Bright Grey & Lion',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '280 KG',
            origin: 'India',
            width: '265.32 cm',
            height: '76 cm',
            depth: '167.76 cm',
            weight: '45 KG',
            seatHeight: '41.52 cm',
            legHeight: '5.46 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        },
        {
            id: 'outdoor-sofa-set',
            name: 'Outdoor Sofa Set',
            price: 'Rs. 224,000.00',
            image: 'Group 157.png',
            category: 'living',
            description: 'Three-piece outdoor seating set with weather-ready wicker details.',
            rating: 4.2,
            reviews: 145,
            salesPackage: '1 Three Seater, 2 Single Seater',
            modelNumber: 'DTUBLIGRBL56B',
            secondaryMaterial: 'Solid Wood',
            configuration: 'L-shaped',
            upholsteryMaterial: 'Fabric + Cotton',
            upholsteryColor: 'Bright Grey & Lion',
            fillingMaterial: 'Matte',
            finishType: 'Bright Grey & Lion',
            adjustableHeadrest: 'Yes',
            maximumLoadCapacity: '300 KG',
            origin: 'India',
            width: '265.32 cm',
            height: '76 cm',
            depth: '167.76 cm',
            weight: '65 KG',
            seatHeight: '41.52 cm',
            legHeight: '5.46 cm',
            warrantySummary: '1.2 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com',
            coveredInWarranty: 'Warranty of the product is limited to manufacturing defects only.',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '3 Months'
        },
        {
            id: 'oslo-lounge-chair',
            name: 'Oslo Lounge Chair',
            price: 'Rs. 180,000.00',
            image: 'Group 159.png',
            category: 'living',
            description: 'Curved lounge chair built for relaxed reading corners and modern spaces.',
            rating: 4.4,
            reviews: 96,
            salesPackage: '1 lounge chair',
            modelNumber: 'OSL-2026-CH',
            secondaryMaterial: 'Solid Wood',
            configuration: 'Single-seater',
            upholsteryMaterial: 'Premium Fabric',
            upholsteryColor: 'Warm Beige',
            fillingMaterial: 'Foam',
            finishType: 'Walnut',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '260 KG',
            origin: 'India',
            width: '80 cm',
            height: '92 cm',
            depth: '84 cm',
            weight: '26 KG',
            seatHeight: '42 cm',
            legHeight: '6 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        },
        {
            id: 'syltherine',
            name: 'Syltherine',
            price: 'Rs 2.500.000',
            image: '../Shop/image 1.png',
            category: 'dining',
            description: 'Stylish cafe chair designed for comfort and modern dining spaces.',
            rating: 4.8,
            reviews: 120,
            salesPackage: '1 dining chair',
            modelNumber: 'SLT-1001',
            secondaryMaterial: 'Solid Wood',
            configuration: 'Dining',
            upholsteryMaterial: 'Fabric',
            upholsteryColor: 'Ivory',
            fillingMaterial: 'Foam',
            finishType: 'Natural Oak',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '250 KG',
            origin: 'India',
            width: '44 cm',
            height: '82 cm',
            depth: '50 cm',
            weight: '11 KG',
            seatHeight: '47 cm',
            legHeight: '5 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        },
        {
            id: 'leviosa',
            name: 'Leviosa',
            price: 'Rs 2.500.000',
            image: '../Shop/image 2.png',
            category: 'dining',
            description: 'Elegant dining chair with a refined silhouette and warm finish.',
            rating: 4.5,
            reviews: 108,
            salesPackage: '1 dining chair',
            modelNumber: 'LVS-1002',
            secondaryMaterial: 'Solid Wood',
            configuration: 'Dining',
            upholsteryMaterial: 'Fabric',
            upholsteryColor: 'Soft Grey',
            fillingMaterial: 'Foam',
            finishType: 'Matte Walnut',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '250 KG',
            origin: 'India',
            width: '46 cm',
            height: '84 cm',
            depth: '52 cm',
            weight: '12 KG',
            seatHeight: '47 cm',
            legHeight: '5 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        },
        {
            id: 'lolito',
            name: 'Lolito',
            price: 'Rs 7.000.000',
            image: '../Shop/image 3.png',
            category: 'living',
            description: 'Luxury big sofa with plush cushioning and a statement silhouette.',
            rating: 4.6,
            reviews: 142,
            salesPackage: '1 three-seater sofa',
            modelNumber: 'LOL-3003',
            secondaryMaterial: 'Solid Wood',
            configuration: 'Three-seater',
            upholsteryMaterial: 'Premium Fabric',
            upholsteryColor: 'Cream',
            fillingMaterial: 'Foam',
            finishType: 'Muted Oak',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '320 KG',
            origin: 'India',
            width: '210 cm',
            height: '92 cm',
            depth: '92 cm',
            weight: '58 KG',
            seatHeight: '44 cm',
            legHeight: '5 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        },
        {
            id: 'respira',
            name: 'Respira',
            price: 'Rs 500.000',
            image: '../Shop/image 4.png',
            category: 'dining',
            description: 'Outdoor bar table and stool set for relaxed hosting and lounge zones.',
            rating: 4.4,
            reviews: 89,
            salesPackage: '1 bar table, 2 stools',
            modelNumber: 'RESP-5004',
            secondaryMaterial: 'Steel',
            configuration: 'Bar Set',
            upholsteryMaterial: 'Metal',
            upholsteryColor: 'Matte Black',
            fillingMaterial: 'Mesh',
            finishType: 'Powder-Coated',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '220 KG',
            origin: 'India',
            width: '110 cm',
            height: '103 cm',
            depth: '60 cm',
            weight: '33 KG',
            seatHeight: '74 cm',
            legHeight: '5 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        }
    ];

    const sectionRows = [
        {
            title: 'General',
            fields: [
                ['Sales Package', 'salesPackage'],
                ['Model Number', 'modelNumber'],
                ['Secondary Material', 'secondaryMaterial'],
                ['Configuration', 'configuration'],
                ['Upholstery Material', 'upholsteryMaterial'],
                ['Upholstery Color', 'upholsteryColor']
            ]
        },
        {
            title: 'Product',
            fields: [
                ['Filling Material', 'fillingMaterial'],
                ['Finish Type', 'finishType'],
                ['Adjustable Headrest', 'adjustableHeadrest'],
                ['Maximum Load Capacity', 'maximumLoadCapacity'],
                ['Origin of Manufacture', 'origin']
            ]
        },
        {
            title: 'Dimensions',
            fields: [
                ['Width', 'width'],
                ['Height', 'height'],
                ['Depth', 'depth'],
                ['Weight', 'weight'],
                ['Seat Height', 'seatHeight'],
                ['Leg Height', 'legHeight']
            ]
        },
        {
            title: 'Warranty',
            fields: [
                ['Warranty Summary', 'warrantySummary'],
                ['Warranty Service Type', 'warrantyServiceType'],
                ['Covered in Warranty', 'coveredInWarranty'],
                ['Not Covered in Warranty', 'notCovered'],
                ['Domestic Warranty', 'domesticWarranty']
            ]
        }
    ];

    const productsSection = document.querySelector('.products-row');
    const comparisonWrap = document.querySelector('.comparison-table-wrap');

    function getStoredPrimary() {
        try {
            return JSON.parse(localStorage.getItem(compareSelectionKey) || 'null');
        } catch (error) {
            return null;
        }
    }

    function getStoredTarget() {
        try {
            return JSON.parse(localStorage.getItem(compareTargetKey) || 'null');
        } catch (error) {
            return null;
        }
    }

    function slugify(text) {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    function createGenericProduct(productData) {
        const name = productData.name || 'Furniture Piece';
        return {
            id: productData.id || slugify(name),
            name,
            price: productData.price || 'Rs. 0',
            image: productData.image || 'Group 156.png',
            category: productData.category || 'living',
            description: productData.description || 'A premium furniture piece to compare.',
            rating: 4.5,
            reviews: 0,
            salesPackage: '1 piece',
            modelNumber: 'N/A',
            secondaryMaterial: 'Solid Wood',
            configuration: 'Modern',
            upholsteryMaterial: 'Fabric',
            upholsteryColor: 'Neutral',
            fillingMaterial: 'Foam',
            finishType: 'Premium Finish',
            adjustableHeadrest: 'No',
            maximumLoadCapacity: '300 KG',
            origin: 'India',
            width: '180 cm',
            height: '80 cm',
            depth: '90 cm',
            weight: '30 KG',
            seatHeight: '42 cm',
            legHeight: '5 cm',
            warrantySummary: '1 Year Manufacturing Warranty',
            warrantyServiceType: 'For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com',
            coveredInWarranty: 'Warranty Against Manufacturing Defect',
            notCovered: 'The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.',
            domesticWarranty: '1 Year'
        };
    }

    function normalizeProduct(productData) {
        const match = catalog.find(item => item.id === productData.id || item.name === productData.name);
        return match ? { ...match, ...productData } : createGenericProduct(productData);
    }

    function getRelatedProducts(primaryProduct) {
        const sameCategory = catalog.filter(product => product.category === primaryProduct.category && product.id !== primaryProduct.id);
        const fallback = catalog.filter(product => product.id !== primaryProduct.id);
        return sameCategory.length ? sameCategory : fallback;
    }

    function showToast(message) {
        let toast = document.querySelector('.premium-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'premium-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === product.id || item.name === product.name);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || existingItem.qty || 1) + 1;
            existingItem.qty = existingItem.quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                qty: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartItems', JSON.stringify(cart));
        const newCartCount = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 1), 0);
        localStorage.setItem('cartCount', newCartCount);
        showToast(`${product.name} added to cart.`);
    }

    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
        let html = '';

        for (let i = 0; i < fullStars; i += 1) {
            html += '<svg class="star" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>';
        }

        if (hasHalf) {
            html += '<svg class="star half" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>';
        }

        for (let i = 0; i < emptyStars; i += 1) {
            html += '<svg class="star empty" viewBox="0 0 24 24"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>';
        }

        return html;
    }

    function renderProductCard(product, isPrimary = false) {
        const badge = isPrimary ? 'Currently Comparing' : 'Comparable Match';
        return `
            <div class="product-card compare-product-card">
                <div class="product-img-wrap">
                    <span class="product-badge">${badge}</span>
                    <img src="${product.image}" alt="${product.name}" loading="lazy" />
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <div class="product-rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-count">${product.rating} &nbsp;|&nbsp; ${product.reviews} Reviews</span>
                </div>
                <p class="compare-product-description">${product.description}</p>
                <button class="btn-cart compare-card-btn" data-product-id="${product.id}">Add To Cart</button>
            </div>`;
    }

    function renderControls(primaryProduct, relatedProducts, selectedTarget) {
        const options = relatedProducts.map(product => `
            <option value="${product.id}" ${selectedTarget.id === product.id ? 'selected' : ''}>${product.name}</option>
        `).join('');

        return `
            <div class="add-product-card compare-controls-card">
                <svg viewBox="0 0 24 24" stroke-width="1.5" fill="none">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="16"/>
                    <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <p>Choose a related product to compare</p>
                <div class="compare-controls">
                    <label for="compare-select" class="compare-controls__label">Related products</label>
                    <select id="compare-select" class="compare-select">
                        <option value="">Select a product</option>
                        ${options}
                    </select>
                    <button class="btn-choose" id="compare-selector-btn">Compare</button>
                </div>
                <p class="compare-help">${primaryProduct.name} is currently being compared against ${selectedTarget.name}.</p>
            </div>`;
    }

    function renderRelatedGrid(relatedProducts, selectedTarget) {
        return `
            <div class="compare-related-grid">
                ${relatedProducts.map(product => `
                    <article class="compare-related-card ${selectedTarget.id === product.id ? 'compare-related-card--active' : ''}" data-product-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" />
                        <div class="compare-related-meta">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <div class="compare-related-footer">
                                <span>${product.price}</span>
                                <div>
                                    <button class="compare-select-btn btn-choose" data-product-id="${product.id}">Select</button>
                                    <button class="btn-cart compare-inline-btn" data-product-id="${product.id}">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </article>
                `).join('')}
            </div>`;
    }

    function renderTable(primaryProduct, compareProduct) {
        const rows = sectionRows.map(section => `
            <tr class="section-row">
                <td colspan="3"><span class="section-label">${section.title}</span></td>
            </tr>
            ${section.fields.map(([label, key]) => {
                const primaryValue = primaryProduct[key];
                const compareValue = compareProduct[key];

                let primaryCell = primaryValue;
                let compareCell = compareValue;

                if (key === 'adjustableHeadrest') {
                    primaryCell = primaryValue === 'Yes' ? '<span class="check">✓</span> Yes' : '<span class="cross">✕</span> No';
                    compareCell = compareValue === 'Yes' ? '<span class="check">✓</span> Yes' : '<span class="cross">✕</span> No';
                }

                if (key === 'maximumLoadCapacity') {
                    primaryCell = `<span class="attr-val highlight">${primaryValue}</span>`;
                    compareCell = `<span class="attr-val highlight">${compareValue}</span>`;
                }

                return `
                    <tr class="attr-row">
                        <td class="attr-name">${label}</td>
                        <td class="attr-val">${primaryCell}</td>
                        <td class="attr-val">${compareCell}</td>
                    </tr>`;
            }).join('')}
        `).join('');

        return `
            <table class="comparison-table">
                <tbody>
                    ${rows}
                    <tr class="cta-row">
                        <td></td>
                        <td><button class="btn-cart" data-product-id="${primaryProduct.id}">Add To Cart</button></td>
                        <td><button class="btn-cart" data-product-id="${compareProduct.id}">Add To Cart</button></td>
                    </tr>
                </tbody>
            </table>`;
    }

    function scrollToComparisonTop() {
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.querySelector('.main-content')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    function renderComparisonPage() {
        const storedPrimary = getStoredPrimary();
        const storedTarget = getStoredTarget();
        const primaryProduct = storedPrimary ? normalizeProduct(storedPrimary) : catalog[0];
        const relatedProducts = getRelatedProducts(primaryProduct);
        const resolvedTarget = storedTarget && relatedProducts.some(product => product.id === storedTarget.id)
            ? normalizeProduct(storedTarget)
            : normalizeProduct(relatedProducts[0] || primaryProduct);

        if (productsSection) {
            productsSection.innerHTML = `
                ${renderProductCard(primaryProduct, true)}
                ${renderProductCard(resolvedTarget)}
                ${renderControls(primaryProduct, relatedProducts, resolvedTarget)}
            `;
        }

        if (comparisonWrap) {
            comparisonWrap.innerHTML = renderTable(primaryProduct, resolvedTarget);
        }

        localStorage.setItem(compareTargetKey, JSON.stringify(resolvedTarget));
        scrollToComparisonTop();
    }

    renderComparisonPage();

    document.addEventListener('click', (event) => {
        const target = event.target.closest('button');

        if (!target) {
            return;
        }

        const productId = target.dataset.productId;
        if (!productId) {
            return;
        }

        if (target.classList.contains('compare-inline-btn') || target.classList.contains('compare-card-btn') || target.classList.contains('btn-cart')) {
            const selectedProduct = catalog.find(product => product.id === productId) || createGenericProduct({ id: productId, name: productId.replace(/-/g, ' ') });
            addToCart(selectedProduct);
            return;
        }

        if (target.classList.contains('compare-select-btn')) {
            const selectedProduct = catalog.find(product => product.id === productId) || createGenericProduct({ id: productId, name: productId.replace(/-/g, ' ') });
            localStorage.setItem(compareTargetKey, JSON.stringify(selectedProduct));
            renderComparisonPage();
        }
    });

    document.addEventListener('change', (event) => {
        if (event.target.id === 'compare-select') {
            const selectedProduct = catalog.find(product => product.id === event.target.value) || createGenericProduct({ id: event.target.value, name: event.target.value.replace(/-/g, ' ') });
            localStorage.setItem(compareTargetKey, JSON.stringify(selectedProduct));
            renderComparisonPage();
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.id === 'compare-selector-btn') {
            const select = document.getElementById('compare-select');
            if (!select || !select.value) {
                showToast('Please choose a product to compare.');
                return;
            }
            const selectedProduct = catalog.find(product => product.id === select.value) || createGenericProduct({ id: select.value, name: select.value.replace(/-/g, ' ') });
            localStorage.setItem(compareTargetKey, JSON.stringify(selectedProduct));
            renderComparisonPage();
        }
    });

    if (!document.querySelector('.premium-toast')) {
        const style = document.createElement('style');
        style.textContent = `
            .premium-toast {
                position: fixed;
                bottom: 28px;
                right: 28px;
                background: #b88e2f;
                color: #fff;
                padding: 12px 18px;
                border-radius: 999px;
                font-family: 'Jost', sans-serif;
                box-shadow: 0 12px 30px rgba(0,0,0,0.16);
                opacity: 0;
                transform: translateY(16px);
                transition: opacity 0.25s ease, transform 0.25s ease;
                z-index: 1000;
            }
            .premium-toast.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});
