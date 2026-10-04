// Syvox Store - shopping cart logic (localStorage)
(function () {
  var CART_KEY = 'syvox_cart';

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function renderCart() {
    var list = document.getElementById('cart-items');
    var total = document.getElementById('cart-total');
    if (!list || !total) return;

    var cart = loadCart();
    list.innerHTML = '';
    var sum = 0;

    cart.forEach(function (item, index) {
      sum += item.price;
      var li = document.createElement('li');
      var name = document.createElement('span');
      name.textContent = item.name + ' — $' + item.price.toFixed(2);
      var remove = document.createElement('button');
      remove.textContent = 'Remove';
      remove.addEventListener('click', function () {
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
      });
      li.appendChild(name);
      li.appendChild(remove);
      list.appendChild(li);
    });

    total.textContent = 'Total: $' + sum.toFixed(2);
  }

  // Wire up "Add to Cart" buttons
  document.querySelectorAll('.add-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cart = loadCart();
      cart.push({ name: btn.dataset.name, price: parseFloat(btn.dataset.price) });
      saveCart(cart);
      renderCart();
      var original = btn.textContent;
      btn.textContent = 'Added! ✓';
      setTimeout(function () { btn.textContent = original; }, 1200);
    });
  });

  // Checkout placeholder - link to Tebex when connected
  var checkout = document.getElementById('checkout');
  if (checkout) {
    checkout.addEventListener('click', function () {
      var cart = loadCart();
      if (cart.length === 0) {
        alert('Your cart is empty. Add some items first!');
        return;
      }
      alert('Checkout coming soon! Connect a Tebex store (free at tebex.io) to accept real payments.');
    });
  }

  renderCart();
})();
