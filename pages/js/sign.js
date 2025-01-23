// Event listener untuk sign in dan sign up
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

if (sign_up_btn) {
    sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });
}

if (sign_in_btn) {
    sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });
}

// Dark mode toggle
const icon = document.querySelector('.btn_icon');
const appFrame = document.querySelector(".app-frame");

function store(value) {
    localStorage.setItem('dark', value);
}

function load() {
    const dark = localStorage.getItem('dark');

    if (!dark) {
        store(false);
        icon.classList.add('bx-moon');
        btnText.textContent = 'DARK';
    } else if (dark === 'true') {
        appFrame.classList.add('dark');
        icon.classList.add('bx-sun');
        btnText.textContent = 'LIGHT';
    } else if (dark === 'false') {
        icon.classList.add('bx-moon');
        btnText.textContent = 'DARK';
    }
}

// ============================== Animation ==============================
let sectionsAndFooter = document.querySelectorAll('main');

function checkScroll() {
    sectionsAndFooter.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 200;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });
}

window.onscroll = checkScroll;
// Memastikan animasi muncul saat halaman pertama kali dimuat
window.onload = checkScroll;

// Form submission untuk sign in dan sign up
const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');

if (signInForm) {
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../../index.html';
    });
}

window.addEventListener("load", () => {
    const loaderContainer = document.querySelector(".loader-container");

    loaderContainer.classList.add("loader-hidden");

    loaderContainer.addEventListener("transitionend", () => {
        loaderContainer.remove();
    });
});

load();
// if (signUpForm) {
//     signUpForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         localStorage.setItem('isLoggedIn', 'true');
//         window.location.href = '../../index.html';
//     });
// }
