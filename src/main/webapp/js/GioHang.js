// Phần "Bạn có thể quan tâm" - slider 5 ảnh
    const relatedSlides = document.querySelectorAll(".related-item");
    const relatedButtons = document.querySelectorAll(".related-buttons .related-button");

    let relatedCurrent = 0;

    relatedButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            i === 0 ? gotoRelatedPrev() : gotoRelatedNext();
        });
    });

    function gotoRelatedPrev() {
        relatedCurrent = (relatedCurrent - 1 + relatedSlides.length) % relatedSlides.length;
        gotoRelatedNum(relatedCurrent);
    }

    function gotoRelatedNext() {
        relatedCurrent = (relatedCurrent + 1) % relatedSlides.length;
        gotoRelatedNum(relatedCurrent);
    }

    function gotoRelatedNum(number) {
        relatedCurrent = number;
        const relatedPrev = (relatedCurrent - 1 + relatedSlides.length) % relatedSlides.length;
        const relatedNext = (relatedCurrent + 1) % relatedSlides.length;
        const prev2 = (relatedCurrent - 2 + relatedSlides.length) % relatedSlides.length;
        const next2 = (relatedCurrent + 2) % relatedSlides.length;

        relatedSlides.forEach(slide => {
            slide.classList.remove("active", "prev", "next", "prev2", "next2");
        });

        relatedSlides[relatedCurrent].classList.add("active");
        relatedSlides[relatedPrev].classList.add("prev");
        relatedSlides[relatedNext].classList.add("next");
        relatedSlides[prev2].classList.add("prev2");
        relatedSlides[next2].classList.add("next2");
    }
	function scrollLikeSlider(direction) {
	    const container = document.getElementById("like-slider");
	    const containerWidth = container.offsetWidth;
	    const scrollAmount = containerWidth * 0.8; // Scroll 80% chiều rộng container
	    
	    container.scrollBy({
	        left: direction * scrollAmount,
	        behavior: 'smooth'
	    });
	}
  
  
  function clampSummaryHeight() {
      const cartItems = document.querySelector(".cart-items");
      const cartSummary = document.querySelector(".cart-summary");

      if (!cartItems || !cartSummary) return;

      const itemsRect = cartItems.getBoundingClientRect();
      const summaryRect = cartSummary.getBoundingClientRect();

      // Độ cao tối đa để không vượt qua phần sản phẩm
      const maxHeight = itemsRect.bottom - itemsRect.top - 20;
      cartSummary.style.maxHeight = `${maxHeight}px`;
      cartSummary.style.overflowY = "auto";
    }

    window.addEventListener("load", clampSummaryHeight);
    window.addEventListener("resize", clampSummaryHeight);
