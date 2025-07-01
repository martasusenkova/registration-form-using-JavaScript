window.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const btnPopup = document.querySelector(".btnLogin-popup");
  const iconClose = document.querySelector(".icon-close");
  const logoutButton = document.getElementById("logoutButton");
  const welcomeEl = document.getElementById("welcomeMessage");

  const user = localStorage.getItem("user");

  // Проверяем, залогинен ли пользователь при загрузке

  if (user) {
    const parsedUser = JSON.parse(user);
    welcomeEl.innerHTML = `Hello, ${parsedUser.name}`;
    welcomeEl.classList.remove("hidden");
    logoutButton.classList.remove("hidden");
    wrapper.style.display = "none";
    btnPopup.style.display = "none";
  } else {
    welcomeEl.innerHTML = "";
    welcomeEl.classList.add("hidden");
    logoutButton.classList.add("hidden");
    wrapper.style.display = "flex";
    btnPopup.style.display = "inline-block";
  }

  registerLink.addEventListener("click", () => {
    wrapper.classList.add("active");
  });

  loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active");
  });

  btnPopup.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
  });

  iconClose.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
  });

  // Обработчик регистрации
  const registerBtn = document.querySelector(".register .btn");
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;

    const newUser = {
      name: username,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    alert("Registration successful! You can now log in.");
    wrapper.classList.remove("active");
  });

  // Обработчик логина
  const loginBtn = document.querySelector(".login .btn");
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      alert(`Welcome, ${savedUser.name}`);

      wrapper.classList.remove("active-popup");
      wrapper.style.display = "none";
      btnPopup.style.display = "none";

      welcomeEl.innerHTML = `Hello, ${savedUser.name}`;
      welcomeEl.classList.remove("hidden");
      logoutButton.classList.remove("hidden");
    } else {
      alert("Invalid email or password");
    }
  });

  // Обработчик выхода из аккаунта
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    welcomeEl.innerHTML = "";
    welcomeEl.classList.add("hidden");
    logoutButton.classList.add("hidden");

    wrapper.style.display = "flex";
    btnPopup.style.display = "inline-block";
  });
});
const rememberMe = document.querySelector(".login .remember-forgot input");

if (rememberMe.checked) {
  localStorage.setItem("user", JSON.stringify(savedUser));
} else {
  sessionStorage.setItem("user", JSON.stringify(savedUser));
}

const user = localStorage.getItem("user") || sessionStorage.getItem("user");
