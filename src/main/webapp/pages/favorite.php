<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kesn Store</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="../css/favorite.css">
</head>
<body>
<div class="container">
    <div class="wishlist-header">
        <h2>DANH SÁCH YÊU THÍCH</h2>
        <p class="wishlist-count">Bạn có <span id="item-count">3</span> sản phẩm trong danh sách yêu thích</p>
    </div>

    <div class="clear-all">
        <button class="btn btn-remove" onclick="clearAllItems()">XÓA TẤT CẢ</button>
    </div>

    <div class="wishlist-grid" id="wishlist-grid">
        <div class="product-card" data-id="1">
            <div class="product-image">
                <img src="../img/giay3.jpg" alt="Giày Thể Thao Nam Classic">
                <div class="heart-icon" onclick="removeFromWishlist(1)"><i class="fas fa-heart"></i></div>
            </div>
            <div class="product-name">Giày Thể Thao Nam Classic</div>
             1.299.000 VNĐ
            <div class="product-actions">
                <button class="btn" onclick="addToCart(1)">THÊM VÀO GIỎ</button>
            </div>
        </div>
        <div class="product-card" data-id="2">
            <div class="product-image">
                <img src="../img/giay6.jpg" alt="Giày Thể Thao Nam Classic">
                <div class="heart-icon" onclick="removeFromWishlist(2)"><i class="fas fa-heart"></i></div>
            </div>
            <div class="product-name">Giày Thể Thao Nam Classic</div>
             1.299.000 VNĐ
            <div class="product-actions">
                <button class="btn" onclick="addToCart(2)">THÊM VÀO GIỎ</button>
            </div>
        </div>
        <div class="product-card" data-id="3">
            <div class="product-image">
                <img src="../img/giay2.jpg" alt="Giày Thể Thao Nam Classic">
                <div class="heart-icon" onclick="removeFromWishlist(3)"><i class="fas fa-heart"></i></div>
            </div>
            <div class="product-name">Giày Thể Thao Nam Classic</div>
            1.299.000 VNĐ
            <div class="product-actions">
                <button class="btn" onclick="addToCart(3)">THÊM VÀO GIỎ</button>
            </div>
    </div>
</div>

    <div class="empty-wishlist" id="empty-wishlist">
        <h3>DANH SÁCH YÊU THÍCH TRỐNG</h3>
        <p>Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
        <button class="btn-shop" onclick="goToShop()">MUA SẮM NGAY</button>
    </div>
</div>


<script>
    let wishlistItems = [1, 2, 3, 4, 5];

    function updateItemCount() {
        document.getElementById('item-count').textContent = wishlistItems.length;
    }

    function removeFromWishlist(productId) {
        const productCard = document.querySelector(`[data-id="${productId}"]`);
        if (productCard) {
            productCard.remove();
            wishlistItems = wishlistItems.filter(id => id !== productId);
            updateItemCount();
            checkEmptyWishlist();
        }
    }

    function addToCart(productId) {
        alert(`Đã thêm sản phẩm vào giỏ hàng!`);
    }

    function clearAllItems() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi danh sách yêu thích?')) {
            document.getElementById('wishlist-grid').innerHTML = '';
            wishlistItems = [];
            updateItemCount();
            checkEmptyWishlist();
        }
    }

    function checkEmptyWishlist() {
        const wishlistGrid = document.getElementById('wishlist-grid');
        const emptyWishlist = document.getElementById('empty-wishlist');
        
        if (wishlistItems.length === 0) {
            wishlistGrid.style.display = 'none';
            emptyWishlist.style.display = 'block';
            document.querySelector('.clear-all').style.display = 'none';
        } else {
            wishlistGrid.style.display = 'grid';
            emptyWishlist.style.display = 'none';
            document.querySelector('.clear-all').style.display = 'block';
        }
    }

    function goToShop() {
        alert('Chuyển đến trang mua sắm...');
    }
</script>
</body>
</html>