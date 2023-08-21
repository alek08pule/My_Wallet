var loginData = { username: "", email: "", password: "" };
function loadData() {
  let loadSTORAGEdata = localStorage.getItem("loginData");
  if (loadSTORAGEdata) {
    loginData = JSON.parse(loadSTORAGEdata);
  } else {
    loginData = { username: "", email: "", password: "" };
  }
}
loadData();
let latestUsername = loginData.username;
let latestPassword = loginData.password;
let latestEmail = loginData.email;

const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#createAccount");
const goToHomePageSubmit = document.querySelector("#goToHomePage");
// ---------------error messages--------------------
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form_message");

  messageElement.textContent = message;
  messageElement.classList.remove(
    "form_message--success",
    "form_message--error"
  );

  messageElement.classList.add(`form_message--${type}`);
}
function setInputError(inputElement, message) {
  inputElement.classList.add("form_input-error");
  inputElement.parentElement.querySelector(
    ".form_input-error-message"
  ).textContent = message;
}
function clearInputError(inputElement) {
  inputElement.classList.remove(".form_input-error");
  inputElement.parentElement.querySelector(
    ".form_input-error-message"
  ).textContent = "";
}
// -------------switch the forms---------------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");
  document
    .querySelector("#linkCreateAccount")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form-hidden");
      createAccountForm.classList.remove("form-hidden");
    });

  document.querySelector("#linkLogin").addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("form-hidden");
    document.querySelector(".form_input-error-message").textContent = "";
    createAccountForm.classList.add("form-hidden");
  });
  document
    .querySelector("#linkforgotPassword")
    .addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("form-hidden");
      createAccountForm.classList.add("form-hidden");
      changePasswordForm.classList.remove("form-hidden");
    });
});
// --------------submit LOGIN-------------------

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loadData();
  let latestUsername = loginData.username;
  let latestPassword = loginData.password;
  let latestEmail = loginData.email;
  var loginEmail = document.querySelector("#loginEmail").value;
  var loginPassword = document.querySelector("#loginPassword").value;

  if (
    isValidEmail(loginEmail) &&
    loginEmail == latestEmail &&
    isValidPassword(loginPassword) &&
    loginPassword == latestPassword
  ) {
    setFormMessage(loginForm, "success", "You're logged in");
    window.location.href = "../My_Wallet/dashboard.html";
  } else {
    setFormMessage(loginForm, "error", "Invalid username/password");
  }
  inputElement.addEventListener("input", (e) => {
    clearInputError(inputElement);
  });
});

// -------------------------register ----------------------------------------------

let correctPassword = "";
document.querySelectorAll(".form_input").forEach((inputElement) => {
  inputElement.addEventListener("blur", (e) => {
    const inputValue = e.target.value;

    if (e.target.id == "username" && !isValidUsername(inputValue)) {
      setInputError(
        inputElement,
        "Username must be at least 7 characters in length"
      );
      return;
      clearInputError(inputElement);
    }
    if (e.target.id == "registrationEmail" && !isValidEmail(inputValue)) {
      setInputError(inputElement, "Please enter a valid email address");
      return;
      clearInputError(inputElement);
    }
    if (e.target.id == "registrationPassword" && !isValidPassword(inputValue)) {
      setInputError(
        inputElement,
        "Password should contain alphabetic,numeric and special characters."
      );
      return;
      clearInputError(inputElement);
    }
    if (e.target.id == "registrationPassword" && isValidPassword(inputValue)) {
      correctPassword = inputValue;
    }

    if (
      e.target.id == "confirmPassword" &&
      inputValue !== correctPassword &&
      inputValue != ""
    ) {
      setInputError(inputElement, "Password not match.");
      return;
      clearInputError(inputElement);
    }
  });
});

createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var username = document.getElementById("username").value;
  var registrationEmail = document.getElementById("registrationEmail").value;
  var registrationPassword = document.getElementById(
    "registrationPassword"
  ).value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  if (
    isValidUsername(username) &&
    isValidEmail(registrationEmail) &&
    isValidPassword(registrationPassword) &&
    isValidPassword(registrationPassword) &&
    registrationPassword == confirmPassword
  ) {
    setFormMessage(createAccountForm, "success", "You're logged in");
    const loginData = {
      username: username,
      email: registrationEmail,
      password: registrationPassword,
    };
    localStorage.setItem("loginData", JSON.stringify(loginData));
  } else {
    setFormMessage(
      createAccountForm,
      "error",
      "Invalid form data. Please check your inputs."
    );
  }
});
// --------------------------valid func---------------------------------------
function isValidUsername(username) {
  if (username == "" && username.length > 0 && username.length < 9) {
    return false;
  }
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

  if (email == "") {
    return false;
  }

  return emailRegex.test(email);
}
function isValidPassword(password) {
  const minLength = 8;
  const maxLength = 32;
  const letterNumberRegexSpecialChar =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  if (password == "") {
    return false;
  }
  if (password.length < minLength || password.length > maxLength) {
    return false;
  }
  if (!letterNumberRegexSpecialChar.test(password)) {
    return false;
  }

  return true;
}
