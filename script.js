window.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".wrapper");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");
  const btnPopup = document.querySelector(".btnLogin-popup");
  const iconClose = document.querySelector(".icon-close");
  const logoutButton = document.getElementById("logoutButton");
  const welcomeEl = document.getElementById("welcomeMessage");

  const user = localStorage.getItem("user") || sessionStorage.getItem("user");

  document.querySelectorAll(".input-box input").forEach((input) => {
    // при потере фокуса
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "") {
        input.parentElement.classList.add("filled");
      } else {
        input.parentElement.classList.remove("filled");
      }
    });

    // при загрузке страницы, если поле уже заполнено (например, браузер автозаполнил)
    if (input.value.trim() !== "") {
      input.parentElement.classList.add("filled");
    }
  });

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
    document.getElementById("login-email").focus(); // автофокус
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
    const agreeCheckbox = document.querySelector(
      ".register .remember-forgot input"
    );

    if (!agreeCheckbox.checked) {
      alert("You must agree to the terms & conditions");
      return;
    }

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
    const rememberMe = document.querySelector(".login .remember-forgot input");

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      email === savedUser.email &&
      password === savedUser.password
    ) {
      alert(`Welcome, ${savedUser.name}`);

      // Remember Me: сохраняем в localStorage или sessionStorage
      if (rememberMe.checked) {
        localStorage.setItem("user", JSON.stringify(savedUser));
      } else {
        sessionStorage.setItem("user", JSON.stringify(savedUser));
      }

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

  // Обработчик выхода
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    welcomeEl.innerHTML = "";
    welcomeEl.classList.add("hidden");
    logoutButton.classList.add("hidden");

    wrapper.style.display = "flex";
    btnPopup.style.display = "inline-block";
  });

  // Проверка силы пароля
  const regPasswordInput = document.getElementById("reg-password");
  const strengthEl = document.getElementById("passwordStrength");

  if (regPasswordInput && strengthEl) {
    regPasswordInput.addEventListener("input", () => {
      const value = regPasswordInput.value;

      let strength = "weak";
      let className = "weak";

      if (value.length > 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
        strength = "strong";
        className = "strong";
      } else if (value.length > 5) {
        strength = "medium";
        className = "medium";
      }

      strengthEl.textContent = `Password strength: ${strength}`;
      strengthEl.className = `password-strength ${className}`;
    });
  }

  // Для логина
  const togglePwdLogin = document.getElementById("togglePwdLogin");
  if (togglePwdLogin) {
    togglePwdLogin.addEventListener("click", () => {
      const pwd = document.getElementById("login-password");
      if (pwd.type === "password") {
        pwd.type = "text";
        togglePwdLogin.textContent = "🙈";
      } else {
        pwd.type = "password";
        togglePwdLogin.textContent = "👁";
      }
    });
  }

  // Для регистрации
  const togglePwdReg = document.getElementById("togglePwdReg");
  if (togglePwdReg) {
    togglePwdReg.addEventListener("click", () => {
      const pwd = document.getElementById("reg-password");
      if (pwd.type === "password") {
        pwd.type = "text";
        togglePwdReg.textContent = "🙈";
      } else {
        pwd.type = "password";
        togglePwdReg.textContent = "👁";
      }
    });
  }
});
