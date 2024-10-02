// Muestra el formulario de Login y oculta el de Register
function showLoginForm() {
    var loginForm = document.getElementById('Login');
    var registerForm = document.getElementById('Register');
    var formContainer = document.querySelector('.form-container');

    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    formContainer.style.display = 'block';
}

// Muestra el formulario de Register y oculta el de Login
function showRegisterForm() {
    var loginForm = document.getElementById('Login');
    var registerForm = document.getElementById('Register');
    var formContainer = document.querySelector('.form-container');

    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formContainer.style.display = 'block';
}

// Oculta el contenedor de formularios
function closeForm() {
    var formContainer = document.querySelector('.form-container');
    formContainer.style.display = 'none';
}

var signInForm = document.getElementById("SignIn");
var signUpForm = document.getElementById("SignUp");
var indicator = document.getElementById("btn");
