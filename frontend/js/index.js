// ১. গ্লোবাল ভ্যারিয়েবল
let allProducts = [];

// ২. প্রোডাক্ট লোড করার ফাংশন
async function loadProducts() {
    try {
        // Node.js API থেকে fetch
        const response = await fetch('http://localhost:5000/products'); 
        const products = await response.json();
        
        allProducts = products; // গ্লোবাল ভ্যারিয়েবলে ডাটা সেভ
        displayPlants(products); // প্রোডাক্ট দেখানোর ফাংশন কল

    } catch (error) {
        console.error("ডাটা লোড করতে সমস্যা হচ্ছে:", error);
    }
}

// ৩. প্রোডাক্ট ডিসপ্লে করার ফাংশন
function displayPlants(productsList) {
    const grid = document.getElementById('trending-grid');
    if(!grid) return;
    
    grid.innerHTML = ''; // আগের ডাটা ক্লিয়ার

    productsList.forEach(prod => {
        grid.innerHTML += `
            <div class="product">
                <img src="${prod.img}" alt="${prod.title}" class="pimg">
                <div class="pbody">
                    <h3 class="ptitle">${prod.title}</h3>
                    <p class="price">$${prod.price}</p>
                    <div class="pactions">
                        <button class="add" onclick="addToCartById(${prod.id})">Add to Cart</button>
                    </div>
                </div>
            </div>`;
    });
}

// ৪. কার্টে অ্যাড করার ফাংশন
window.addToCartById = function(id) {
    const item = allProducts.find(p => p.id == id);
    if (!item) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${item.title} added to cart!`);
};

// ৫. সার্চ এবং ফিল্টার লজিক
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allProducts.filter(p => p.title.toLowerCase().includes(term));
    displayPlants(filtered);
});

window.filterPlants = function(cat) {
    if(cat === 'All') {
        displayPlants(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === cat);
        displayPlants(filtered);
    }
};

// পেজ লোড হলে রান হবে
window.onload = function() {
    loadProducts();
};