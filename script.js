// ── 1. MENU TOGGLE (responsive) ──────────────────────────
const menuToggle = document.getElementById("menuToggle");
const navLinks   = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Đóng menu khi click vào link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

// ── 2. ẨN / HIỆN NỘI DUNG ────────────────────────────────
const btnToggle = document.getElementById("btnToggle");
const extraInfo = document.getElementById("extraInfo");

btnToggle.addEventListener("click", function () {
  extraInfo.classList.toggle("hidden");
  btnToggle.textContent = extraInfo.classList.contains("hidden")
    ? "Hiện thông tin"
    : "Ẩn thông tin";
});

// ── 3. FORM LIÊN HỆ + KIỂM TRA DỮ LIỆU RỖNG ────────────
const contactForm  = document.getElementById("contactForm");
const nameInput    = document.getElementById("name");
const emailInput   = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMsg   = document.getElementById("successMsg");

function showError(inputEl, errorId, msg) {
  inputEl.classList.add("invalid");
  document.getElementById(errorId).textContent = msg;
}

function clearError(inputEl, errorId) {
  inputEl.classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}

// Xoá lỗi realtime khi gõ
[nameInput, emailInput, messageInput].forEach(function (el) {
  el.addEventListener("input", function () {
    clearError(el, el.id + "Error");
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault(); // chặn reload mặc định của form

  let valid = true;

  // Kiểm tra dữ liệu rỗng
  if (!nameInput.value.trim()) {
    showError(nameInput, "nameError", "Vui lòng nhập họ tên.");
    valid = false;
  } else {
    clearError(nameInput, "nameError");
  }

  if (!emailInput.value.trim()) {
    showError(emailInput, "emailError", "Vui lòng nhập email.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    showError(emailInput, "emailError", "Email không hợp lệ.");
    valid = false;
  } else {
    clearError(emailInput, "emailError");
  }

  if (!messageInput.value.trim()) {
    showError(messageInput, "messageError", "Vui lòng nhập tin nhắn.");
    valid = false;
  } else {
    clearError(messageInput, "messageError");
  }

  // Nếu hợp lệ → hiện thông báo thành công
  if (valid) {
    successMsg.classList.remove("hidden");
    contactForm.reset();
    setTimeout(function () {
      successMsg.classList.add("hidden");
    }, 4000);
  }
});
