document.addEventListener("DOMContentLoaded", function () {
  const stars = document.querySelectorAll("#starRating span");
  const ratingInput = document.getElementById("selectedRating");
  const form = document.getElementById("reviewForm");

  let selectedRating = 0;

  // Đánh dấu sao đã chọn
  function highlightStars(value) {
    stars.forEach((star, index) => {
      star.classList.toggle("selected", index < value);
    });
  }

  // Hover sao
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      highlightStars(index + 1);
    });

    star.addEventListener("mouseout", () => {
      highlightStars(selectedRating);
    });

    star.addEventListener("click", () => {
      selectedRating = index + 1;
      ratingInput.value = selectedRating;
      highlightStars(selectedRating);
    });
  });

  // Xử lý form gửi
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const comment = form.comment.value.trim();
    const rating = ratingInput.value;
    const files = form.querySelector('input[type="file"]').files;

    if (!rating || rating == 0) {
      alert("Vui lòng chọn số sao!");
      return;
    }

    if (!comment) {
      alert("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    console.log("Đánh giá đã gửi:");
    console.log("Số sao:", rating);
    console.log("Nội dung:", comment);
    console.log("Ảnh đính kèm:", files);

    alert("Cảm ơn bạn đã gửi đánh giá!");

    // Reset form
    form.reset();
    selectedRating = 0;
    highlightStars(0);
  });
});
