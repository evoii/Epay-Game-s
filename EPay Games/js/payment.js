function addToCart(productName, price) {
    alert(productName + ' added to cart!');
}

function buyNow(productName, price) {
    localStorage.setItem('product', JSON.stringify({ name: productName, price: price }));
    window.location.href = 'buy.html';
}

function submitComment() {
    const commentInput = document.getElementById('comment-input');
    const comment = commentInput.value;
    if (comment) {
        const commentSection = document.getElementById('comments-section');
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.textContent = comment;
        commentSection.appendChild(newComment);
        commentInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const buyForm = document.getElementById('buy-form');
    if (buyForm) {
        const product = JSON.parse(localStorage.getItem('product'));
        if (product) {
            document.getElementById('product-name').value = product.name;
            document.getElementById('price').value = `$${product.price}`;
        }
        buyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const gameId = document.getElementById('game-id').value;
            localStorage.setItem('userDetails', JSON.stringify({ email, phone, gameId }));
            window.location.href = 'payment.html';
        });
    }

    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        const product = JSON.parse(localStorage.getItem('product'));
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (product && userDetails) {
            document.getElementById('product-details').textContent = `Product: ${product.name}, Price: $${product.price}, Email: ${userDetails.email}, Phone: ${userDetails.phone}, Game ID: ${userDetails.gameId}`;
        }

        const paymentMethod = document.getElementById('payment-method');
        const paypalInfo = document.getElementById('paypal-info');
        const upiInfo = document.getElementById('upi-info');
        
        paymentMethod.addEventListener('change', (e) => {
            if (e.target.value === 'paypal') {
                paypalInfo.style.display = 'block';
                upiInfo.style.display = 'none';
            } else if (e.target.value === 'upi') {
                paypalInfo.style.display = 'none';
                upiInfo.style.display = 'block';
            }
        });

        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (paymentMethod.value === 'upi') {
                const upiApp = document.getElementById('upi-app').value;
                const upiId = document.getElementById('upi-id').value;
                alert(`UPI Payment:\nApp: ${upiApp}\nUPI ID: ${upiId}`);
            } else if (paymentMethod.value === 'paypal') {
                alert('PayPal Payment ID: 123456789');
            }
        });
    }
});
