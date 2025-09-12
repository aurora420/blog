// Category Filter Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const posts = document.querySelectorAll(".post-card, .featured-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    posts.forEach(post => {
      if (filter === "all" || post.dataset.category === filter) {
        post.style.display = "block";
      } else {
        post.style.display = "none";
      }
    });
  });
});
