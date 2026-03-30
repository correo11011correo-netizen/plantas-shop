let cart = {};

const plants = {
    p1: { name: "Monstera Deliciosa", price: 8500 },
    p2: { name: "Ficus Lyrata", price: 12000 },
    p3: { name: "Sansevieria", price: 4500 },
    p4: { name: "Pothos Dorado", price: 3200 },
    p5: { name: "Calathea Orbifolia", price: 9800 },
    p6: { name: "Suculenta Variada", price: 1500 }
};

function updateQty(id, delta) {
    if (!cart[id]) cart[id] = 0;
    cart[id] += delta;
    if (cart[id] < 0) cart[id] = 0;
    
    document.getElementById(`qty-${id}`).textContent = cart[id];
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const section = document.getElementById('cart-section');
    
    container.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            const p = plants[id];
            const subtotal = p.price * cart[id];
            total += subtotal;

            const div = document.createElement('div');
            div.className = "cart-item";
            div.innerHTML = `<span>${cart[id]}x ${p.name}</span> <span>$${subtotal.toLocaleString()}</span>`;
            container.appendChild(div);
        }
    });

    totalEl.textContent = total.toLocaleString();
    section.style.display = total > 0 ? "block" : "none";
}

function sendOrder() {
    const phone = "5491151623621";
    let text = "🌿 *Nuevo Pedido de Plantas*\n\n";
    let total = 0;

    Object.keys(cart).forEach(id => {
        if (cart[id] > 0) {
            text += `• ${cart[id]}x ${plants[id].name}\n`;
            total += plants[id].price * cart[id];
        }
    });

    text += `\n💰 *Total: $${total.toLocaleString()}*\n\n📍 _¿Hacen envíos a mi zona?_`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}
