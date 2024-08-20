document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.getElementById('closeModal');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}
                <button data-name="${item.name}">Remover</button>
            `;
            cartItems.appendChild(listItem);
        });

        totalPrice.textContent = total.toFixed(2);

        document.querySelectorAll('#cartItems button').forEach(button => {
            button.addEventListener('click', (event) => {
                const name = event.target.getAttribute('data-name');
                cart = cart.filter(item => item.name !== name);
                updateCart();
            });
        });
    }
});
