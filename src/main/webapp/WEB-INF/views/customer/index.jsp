<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kesn Store</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="css/trangchu.css">
</head>
<body>
  <div class="header-extra">
    <div class="extra-links">
      <a href="#">Gia nhập</a> |
      <a href="#">Trợ giúp</a> |
      <a href="#">Đăng nhập</a>|</i>
      <a href="#">Đăng ký</a>|</i>
    </div>
  </div>
  <div class="header">
    <div class="logo">
      <img src="img/logoxoaphong.png" alt="Kesn Store Logo">
    </div>
    <div class="nav">
      <a>Sản phẩm mới</a>
      <a>Giảm giá</a>
      <div class="search-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" class="search-bar" placeholder="Tìm kiếm sản phẩm">
      </div>
      <div class="icons">
        <i class="fas fa-heart"></i>
        <i class="fas fa-shopping-bag"></i>
        <i class="fas fa-user"></i>
      </div>
    </div>
  </div>

  <div class="banner">
    <div class="banner-item active">
      <img src="img/banner8.jpg" alt="Banner 1">
      <div class="banner-overlay">
        <h2>As you like</h2>
        <p>Khám phá bộ sưu tập mới nhất</p>
      </div>
    </div>
    <div class="banner-item">
      <img src="img/banner12.jpg" alt="Banner 2">
      <div class="banner-overlay" style="color:#de087e;">
        <h2>New interface</h2>
        <p>Tạo dấu ấn riêng của bạn</p>
      </div>
    </div>
    <div class="banner-item">
      <img src="img/banner6.jpg" alt="Banner 3">
      <div class="banner-overlay" style="color:#0300ac;">
        <h2>Always new</h2>
        <p>Định hình phong cách của bạn</p>
      </div>
    </div>
  </div>

  <div class="slogan">
    <h1>Kesn Store</h1>
    <h2>Just Your Shoes.</h2>
    <p>Giày không chỉ để đi – là để thể hiện chính mình</p>
  </div>

  <div class="khung">
    <div class="section-header">
      <h2>Thể thao</h2>
      <div class="nav-buttons">
        <i class="fas fa-chevron-left prev-btn" data-container="sportsContainer1"></i>
        <i class="fas fa-chevron-right next-btn" data-container="sportsContainer1"></i>
      </div>
    </div>
    <div class="sports-wrapper">
      <div class="sports" id="sportsContainer1">
        <div class="sport-item"><img src="img/fot.jpg" alt="Bóng đá"><span class="overlay-text">Bóng đá</span></div>
        <div class="sport-item"><img src="img/bas.jpg" alt="Bóng rổ"><span class="overlay-text">Bóng rổ</span></div>
        <div class="sport-item"><img src="img/base.jpg" alt="Bóng chày"><span class="overlay-text">Bóng chày</span></div>
        <div class="sport-item"><img src="img/run.jpg" alt="Chạy bộ"><span class="overlay-text">Chạy bộ</span></div>
        <div class="sport-item"><img src="img/rubdy.jpg" alt="Bóng bầu dục"><span class="overlay-text">Bóng bầu dục</span></div>
        <div class="sport-item"><img src="img/baset.jpg" alt="Cầu lông"><span class="overlay-text">Cầu lông</span></div>
        <div class="sport-item"><img src="img/skate.jpg" alt="Trượt ván"><span class="overlay-text">Trượt ván</span></div>
        <div class="sport-item"><img src="img/parkour.jpg" alt="Vượt chướng ngại vật"><span class="overlay-text">Parkour</span></div>
        <div class="sport-item"><img src="img/truottuyet.jpg" alt="Trượt tuyết"><span class="overlay-text">Trượt tuyết</span></div>
        <div class="sport-item"><img src="img/xedap.jpg" alt="Đạp xe"><span class="overlay-text">Đạp xe</span></div>
        <div class="sport-item"><img src="img/võ.jpg" alt="Võ thuật"><span class="overlay-text">Võ thuật</span></div>
        <div class="sport-item"><img src="img/gym.jpg" alt="Thể hình"><span class="overlay-text">Thể hình</span></div>
      </div>
    </div>
  </div>

  <div class="miss">
    <h2>Đừng bỏ lỡ</h2>
    <div class="video">
      <video src="video/runn.mp4" autoplay muted loop playsinline></video>
    </div>
  </div>

  <div class="khung">
    <div class="section-header">
      <h2>Mua theo thương hiệu</h2>
      <div class="nav-buttons">
        <i class="fas fa-chevron-left prev-btn" data-container="sportsContainer2"></i>
        <i class="fas fa-chevron-right next-btn" data-container="sportsContainer2"></i>
      </div>
    </div>
    <div class="sports-wrapper">
      <div class="sports" id="sportsContainer2">
        <div class="sport-item"><img src="img/nike2.jpg" alt="Nike"><span class="overlay-text">Nike</span></div>
        <div class="sport-item"><img src="img/adi.jpg" alt="Adidas"><span class="overlay-text">Adidas</span></div>
        <div class="sport-item"><img src="img/stussy.jpg" alt="Stussy"><span class="overlay-text">Stussy</span></div>
        <div class="sport-item"><img src="img/spm.jpg" alt="Supreme"><span class="overlay-text">Supreme</span></div>
        <div class="sport-item"><img src="img/puma.jpg" alt="Puma"><span class="overlay-text">Puma</span></div>
        <div class="sport-item"><img src="img/crocs1.jpg" alt="Crocs"><span class="overlay-text">Crocs</span></div>
        <div class="sport-item"><img src="img/nb.jpg" alt="New Balance"><span class="overlay-text">New Balance</span></div>
        <div class="sport-item"><img src="img/cv.jpg" alt="Converse"><span class="overlay-text">Converse</span></div>
        <div class="sport-item"><img src="img/van.jpg" alt="Vans"><span class="overlay-text">Vans</span></div>
        <div class="sport-item"><img src="img/blen.jpg" alt="Balenciaga"><span class="overlay-text">Balenciaga</span></div>
        <div class="sport-item"><img src="img/gc.jpg" alt="Gucci"><span class="overlay-text">Gucci</span></div>
      </div>
    </div>
  </div>

  <div class="trend-section">
    <div class="trend-header">
      <h2>Xu hướng</h2>
      <div class="trend-nav">
        <i class="fas fa-chevron-left prev-btn" data-container="trendItems"></i>
        <i class="fas fa-chevron-right next-btn" data-container="trendItems"></i>
      </div>
    </div>
    <div class="trend-wrapper">
      <div class="trend-items" id="trendItems">
        <div class="trend-product">
          <img src="img/guot.jpg" alt="Nike Air Max">
          <div class="product-details">
            <h3>A'One 'Leo Lights' EP</h3>
            <p>3,239,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/giay2.jpg" alt="Adidas Ultraboost">
          <div class="product-details">
            <h3>Zion 4 PF 'Iridescence'</h3>
            <p>4,109,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/bla.avif" alt="Puma RS-X">
          <div class="product-details">
            <h3>Nike Mercurial Vapor 1</h3>
            <p>7,319,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/giay4.jpg" alt="New Balance 990">
          <div class="product-details">
            <h3>Air Jordan 1 Mid</h3>
            <p>3,000,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/giay5.jpg" alt="Converse Chuck 70">
          <div class="product-details">
            <h3>Jordan Air Rev</h3>
            <p>7,349,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/giay6.jpg" alt="Vans Old Skool">
          <div class="product-details">
            <h3>Vans Old Skool</h3>
            <p>7,349,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/sne.jpg" alt="Vans Old Skool">
          <div class="product-details">
            <h3>Vans Old Skool</h3>
            <p>7,349,000 VND</p>
          </div>
        </div>
        <div class="trend-product">
          <img src="img/dep.jpg" alt="Vans Old Skool">
          <div class="product-details">
            <h3>Vans Old Skool</h3>
            <p>7,349,000 VND</p>
          </div>
        </div>
      </div>
    </div>
  </div>

 <div class="model">
    <div class="section-header">
      <h2>Người mẫu</h2>
      <a href="#" class="view-more">Xem thêm</a>
    </div>
    <div class="model-wrapper">
      <div class="model-items" id="modelContainer">
        <div class="model-item" data-name="Adidas samba og white better scarlet" data-price="3,239,000 VND" data-small-img="img/adidass.jpg">
          <img src="img/ml1.jpg">
        </div>
        <div class="model-item" data-name="Zion 4 PF 'Iridescence'" data-price="4,109,000 VND" data-small-img="img/stussy.jpg">
          <img src="img/ml2.jpg">
        </div>
        <div class="model-item" data-name="Nike Mercurial Vapor 1" data-price="7,319,000 VND" data-small-img="img/nike.jpg">
          <img src="img/ml3.jpg">
        </div>
        <div class="model-item" data-name="Air Jordan 1 Mid" data-price="3,000,000 VND" data-small-img="img/spm.jpg">
          <img src="img/ml4.jpg">
        </div>
        <div class="model-item" data-name="Jordan Air Rev" data-price="7,349,000 VND" data-small-img="img/small_ml5.jpg">
          <img src="img/ml5.jpg">
        </div>
        <div class="model-item" data-name="Vans Old Skool" data-price="7,349,000 VND" data-small-img="img/small_ml6.jpg">
          <img src="img/ml6.jpg">
        </div>
        <div class="model-item" data-name="Vans Old Skool" data-price="7,349,000 VND" data-small-img="img/small_ml7.jpg">
          <img src="img/ml7.jpg">
        </div>
        <div class="model-item" data-name="Vans Old Skool" data-price="7,349,000 VND" data-small-img="img/small_ml8.jpg">
          <img src="img/ml8.jpg">
        </div>
      </div>
    </div>
    
    <div class="popup" id="modelPopup">
      <div class="popup-content">
        <span class="close-btn">×</span>
        <div class="popup-left">
          <img id="popupLargeImage" src="" alt="Large Image">
        </div>
        <div class="popup-right">
          <div class="popup-right-top">
            <img id="popupSmallImage" src="" alt="Small Image">
            <div class="popup-product-info">
              <h3 id="popupProductName"></h3>
              <p id="popupProductPrice"></p>
            </div>
          </div>
          <div class="popup-right-bottom">
            <button class="add-to-cart"><i class="fas fa-shopping-bag"></i>  Giỏ hàng</button>
            <button class="add-to-favorite"><i class="fas fa-heart"></i>  Yêu thích</button>
            <button class="add-to-see">Xem sản phẩm</button>
          </div>
        </div>
      </div>
    </div>
</div>

  <div class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Về Kesn Store</h3>
        <p>Kesn Store – Nơi định hình phong cách của bạn với những đôi giày độc đáo và chất lượng.</p>
        <div class="social-icons">
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>Liên hệ</h3>
        <div class="contact-info">
          <div class="contact-item"><i class="fas fa-map-marker-alt"></i> Quận 12</div>
          <div class="contact-item"><i class="fas fa-phone"></i> (+84) 123 456 789</div>
          <div class="contact-item"><i class="fas fa-envelope"></i> kesnstore@gmail.com</div>
          <div class="contact-item"><i class="fas fa-globe"></i> www.kesnstore.com</div>
        </div>
      </div>
      <div class="footer-section">
        <h3>Đăng ký nhận tin</h3>
        <div class="newsletter">
          <p>Nhận thông tin mới nhất về sản phẩm và ưu đãi.</p>
          <input type="email" placeholder="Nhập email của bạn...">
          <button>Đăng ký ngay</button>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Kesn Store | Designed by Kesn Team</p>
    </div>
  </div>

  <script>
    // Carousel for sports and trend sections
    document.querySelectorAll('.sports-wrapper, .trend-wrapper').forEach(wrapper => {
      const container = wrapper.querySelector('.sports, .trend-items');
      const prevBtn = wrapper.parentElement.querySelector(`.prev-btn[data-container="${container.id}"]`);
      const nextBtn = wrapper.parentElement.querySelector(`.next-btn[data-container="${container.id}"]`);
      const itemWidth = container.querySelector('.sport-item, .trend-product').offsetWidth + 20;
      let scrollPosition = 0;

      nextBtn.addEventListener('click', () => {
        scrollPosition += itemWidth * 3;
        if (scrollPosition > container.scrollWidth - container.clientWidth) {
          scrollPosition = container.scrollWidth - container.clientWidth;
        }
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', () => {
        scrollPosition -= itemWidth * 3;
        if (scrollPosition < 0) {
          scrollPosition = 0;
        }
        container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      });
    });

    // Banner Carousel
    const banners = document.querySelectorAll('.banner-item');
    let currentBanner = 0;

    function showBanner(index) {
      banners.forEach((banner, i) => {
        banner.classList.toggle('active', i === index);
      });
    }

    function nextBanner() {
      currentBanner = (currentBanner + 1) % banners.length;
      showBanner(currentBanner);
    }

    setInterval(nextBanner, 2000);
    showBanner(currentBanner);

    // Model Popup
    const modelItems = document.querySelectorAll('.model-item');
    const popup = document.getElementById('modelPopup');
    const popupLargeImage = document.getElementById('popupLargeImage');
    const popupSmallImage = document.getElementById('popupSmallImage');
    const popupProductName = document.getElementById('popupProductName');
    const popupProductPrice = document.getElementById('popupProductPrice');
    const closeBtn = document.querySelector('.close-btn');

    modelItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const smallImgSrc = item.getAttribute('data-small-img');
        const productName = item.getAttribute('data-name');
        const productPrice = item.getAttribute('data-price');
        
        popupLargeImage.src = imgSrc;
        popupSmallImage.src = smallImgSrc;
        popupProductName.textContent = productName;
        popupProductPrice.textContent = productPrice;
        
        popup.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  </script>
</body>
</html>