// ============================================
// Đà Lạt Ơi - script.js
// Cuộn mượt, active nav khi cuộn, kiểm tra form liên hệ
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // 1) Cuộn mượt khi bấm vào liên kết trong menu
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 2) Tự động highlight mục đang xem trong menu khi cuộn trang
  const sections = document.querySelectorAll('main section[id]');

  function highlightActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // trừ chiều cao header

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active-link');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);
  highlightActiveNav();

  // 3) Kiểm tra và phản hồi khi gửi form liên hệ
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const fullNameInput = document.getElementById('fullName');
    const messageInput = document.getElementById('message');

    // Tạo khu vực hiển thị thông báo, chèn phía trên nút Gửi
    const feedbackEl = document.createElement('p');
    feedbackEl.className = 'form-feedback';
    contactForm.appendChild(feedbackEl);

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = fullNameInput.value.trim();
      const message = messageInput.value.trim();

      if (fullName === '' || message === '') {
        feedbackEl.textContent = 'Vui lòng nhập đầy đủ họ tên và thông điệp trước khi gửi.';
        feedbackEl.classList.remove('form-feedback--success');
        feedbackEl.classList.add('form-feedback--error');
        return;
      }

      feedbackEl.textContent = 'Cảm ơn ' + fullName + ' đã liên hệ! Đội ngũ Đà Lạt Ơi sẽ phản hồi sớm nhất có thể.';
      feedbackEl.classList.remove('form-feedback--error');
      feedbackEl.classList.add('form-feedback--success');

      contactForm.reset();
    });
  }

  // 4) Phóng to ảnh trong thư viện khi bấm vào (lightbox đơn giản)
  const galleryImages = document.querySelectorAll('.image-strip img');

  if (galleryImages.length > 0) {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const overlayImg = document.createElement('img');
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);

    galleryImages.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        overlayImg.src = img.src;
        overlayImg.alt = img.alt;
        overlay.classList.add('is-open');
      });
    });

    overlay.addEventListener('click', function () {
      overlay.classList.remove('is-open');
    });
  }

});
