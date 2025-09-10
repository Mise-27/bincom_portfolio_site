const galleryImages = [
  { src: "pic1.jpg", caption: "Just after an afternoon lecture back in school" },
  { src: "pic2.jpg", caption: "A picture with a friend at a church event" },
  { src: "pic3.jpg", caption: "Signout day" },
  { src: "pic4.jpg", caption: "My coursemates after lecture" },
  { src: "pic5.jpg", caption: "Project defense day" }
];

let currentImg = 0;

function showGalleryImage(idx) {
  const img = document.getElementById("slideshow-img");
  const caption = document.getElementById("slideshow-caption");
  img.src = galleryImages[idx].src;
  img.alt = galleryImages[idx].caption;
  caption.textContent = galleryImages[idx].caption;
}

function nextGalleryImage() {
  currentImg = (currentImg + 1) % galleryImages.length;
  showGalleryImage(currentImg);
}
function prevGalleryImage() {
  currentImg = (currentImg - 1 + galleryImages.length) % galleryImages.length;
  showGalleryImage(currentImg);
}

document.addEventListener("DOMContentLoaded", function () {
  // Slideshow controls
  if (document.getElementById("slideshow-img")) {
    showGalleryImage(currentImg);
    document.getElementById("next-btn").onclick = nextGalleryImage;
    document.getElementById("prev-btn").onclick = prevGalleryImage;
    setInterval(nextGalleryImage, 5000);
  }

  // === 2. Smooth Scroll for Nav Links ===
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        // For mobile: close nav after click
        document.getElementById('nav-toggle').checked = false;
      }
    });
  });

  // === 3. Contact Form Success Message ===
  const form = document.querySelector('section#contact form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.reset();
      if (!document.getElementById('form-success')) {
        const msg = document.createElement('div');
        msg.id = 'form-success';
        msg.textContent = "Thank you! Your message has been sent.";
        msg.style.cssText = "color:#2563eb;font-weight:600;margin-top:10px;";
        form.parentNode.insertBefore(msg, form.nextSibling);
        setTimeout(() => msg.remove(), 4000);
      }
    });
  }

  // === 4. Section Fade-in Animation on Scroll ===
  const sections = document.querySelectorAll('.section');
  const revealSection = () => {
    const trigger = window.innerHeight * 0.85;
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < trigger) sec.classList.add('visible');
    });
  };
  window.addEventListener('scroll', revealSection);
  revealSection();
});