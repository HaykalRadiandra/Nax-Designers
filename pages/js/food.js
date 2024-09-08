const btn = document.querySelector('.btn');
const icon = document.querySelector('.btn_icon');
const btnText = document.querySelector('.btn_text');
const appFrame = document.querySelector(".app-frame"),
    nav = document.querySelector("nav"),
    logoToggle = document.querySelector(".logo-toggle"),
    modeToggle = document.querySelector(".dark-light"),
    profileToggle = document.querySelector(".profileToggle"),
    profileBox = document.querySelector(".profil"),
    notifToggle = document.querySelector(".notif"),
    notifBox = document.querySelector(".view-notif"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    sidebarClose = document.querySelector(".sidebarClose");

function store(value) {
    localStorage.setItem('dark', value);
}

function load() {
    const dark = localStorage.getItem('dark');

    if (!dark) {
        store(false);
        icon.classList.add('bx-moon');
        btnText.textContent = 'DARK';
    } else if (dark == 'true') {
        appFrame.classList.add('dark');
        icon.classList.add('bx-sun');
        btnText.textContent = 'LIGHT';
    } else if (dark == 'false') {
        icon.classList.add('bx-moon');
        btnText.textContent = 'DARK';
    }
}

load();

btn.addEventListener('click', () => {
    appFrame.classList.toggle('dark');
    icon.classList.add('animated');

    store(appFrame.classList.contains('dark'));

    if (appFrame.classList.contains('dark')) {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
        btnText.textContent = 'LIGHT';
    } else {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
        btnText.textContent = 'DARK';
    }

    setTimeout(() => {
        icon.classList.remove('animated');
    }, 500);
});

// ============================== Link Active ==============================
const links = document.querySelectorAll('.navbar-link');
const currentUrl = window.location.pathname.split('/').pop().toLowerCase();

links.forEach(link => {
    link.classList.remove('link-active');
    const dropdownBtn = link.closest('.dropdown')?.querySelector('.dropbtn');
    if (dropdownBtn) {
        dropdownBtn.classList.remove('link-active');
    }
});

links.forEach(link => {
    const linkUrl = link.getAttribute('href').replace('./', '').split('/').pop().toLowerCase(); // Ambil nama file terakhir dan lowercase

    if (linkUrl === currentUrl || (currentUrl === '' && linkUrl === 'index.html')) {
        link.classList.add('link-active'); 
        
        const dropdown = link.closest('.dropdown');
        if (dropdown) {
            dropdown.querySelector('.dropbtn').classList.add('link-active');
        }
    }
});


// Toggle Profile
profileToggle.addEventListener("click", (e) => {
    e.stopPropagation(); 

    if (notifToggle.classList.contains("active")) {
        notifToggle.classList.remove("active");
    }

    profileToggle.classList.toggle("active");
    profileBox.classList.toggle("active");

    if (profileBox.classList.contains("active")) {
        openNotif(null, 'SemuaNotif');
    }
});



// Toggle Notif
notifToggle.addEventListener("click", (e) => {
    e.stopPropagation(); 

    if (profileToggle.classList.contains("active")) {
        profileToggle.classList.remove("active");
        profileBox.classList.remove("active");
    }

    notifToggle.classList.toggle("active");
    notifBox.classList.toggle("active");

    if (notifBox.classList.contains("active")) {
        openNotif(null, 'SemuaNotif');
    }
});

function openNotif(evt, notifName) {
    let i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    if (notifName === 'SemuaNotif' || notifName === null) {
        for (i = 1; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "block";
        }

        tablinks[0].classList.add("active");
    } else {
        document.getElementById(notifName).style.display = "block";
        
        evt.currentTarget.classList.add("active");
    }
}

sidebarOpen.addEventListener("click", () => {
    nav.classList.toggle("active");
});


sidebarClose.addEventListener("click", () => {
    nav.classList.remove("active");
});

appFrame.addEventListener("click", (e) => {
    if (!e.target.closest(".sidebarOpen, .menu")) {
        nav.classList.remove("active");
    }
    if (!e.target.closest(".profileToggle, .profil")) {
        profileToggle.classList.remove("active");
        profileBox.classList.remove("active");
    }
    if (!e.target.closest(".notif, .view-notif")) {
        notifToggle.classList.remove("active");
        notifBox.classList.remove("active");
    }
});


// ============================== HEADER ==============================
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    nav.classList.toggle('scrolled', window.scrollY > 35);
});

const body = document.body;
let lastScroll = 0;
let timeout = null;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    clearTimeout(timeout);

    if (currentScroll <= 0) {
        body.classList.remove("scroll-up");
    }

    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
    }

    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
    }

    lastScroll = currentScroll;

    timeout = setTimeout(() => {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
    }, 200); // waktu delay 1,5 detik
});

// ============================== Preload ==============================
window.addEventListener("load", () => {
    const loaderContainer = document.querySelector(".loader-container");

    loaderContainer.classList.add("loader-hidden");

    loaderContainer.addEventListener("transitionend", () => {
        loaderContainer.remove();
    });
});

// ============================== BackToTop ==============================
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    
    if (pos > 20) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }
    
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    // Cek apakah dark mode aktif berdasarkan class .app-frame
    const appFrame = document.querySelector(".app-frame");
    let isDarkMode = appFrame && appFrame.classList.contains('dark');

    // Ambil nilai dari variabel CSS berdasarkan mode yang aktif
    let primaryColor = isDarkMode ? getComputedStyle(appFrame).getPropertyValue('--primary-color')
                                    : getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    
    let secondaryColor = isDarkMode ? getComputedStyle(appFrame).getPropertyValue('--secondary-color')
                                    : getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');

    scrollProgress.style.background = `conic-gradient(${primaryColor} ${scrollValue}%, ${secondaryColor} ${scrollValue}%)`;
}

// ============================== Animation ==============================
let checkScroll = () => {
    let sectionsAndFooter = document.querySelectorAll('section');
    
    sectionsAndFooter.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 300;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });
}

let checkScroll1 = () => {
    let sectionsAndFooter = document.querySelectorAll('footer');
    
    sectionsAndFooter.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 400;
        let height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });
}

window.addEventListener('scroll', () => {
    calcScrollValue();
    checkScroll();
    checkScroll1();
});

window.addEventListener('load', () => {
    calcScrollValue();
    checkScroll();
    checkScroll1();
});

// scroll kanan kiri
const menuCardsContainer = document.querySelector('.menu-card');
let scrollAmount = 0;
const scrollStep = 210;

function scrollLeft() {
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) scrollAmount = 0;
    menuCardsContainer.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollRight() {
    const maxScroll = menuCardsContainer.scrollWidth - menuCardsContainer.clientWidth;
    scrollAmount += scrollStep;
    if (scrollAmount > maxScroll) scrollAmount = maxScroll;
    menuCardsContainer.style.transform = `translateX(-${scrollAmount}px)`;
}

document.querySelector('.scroll-left-button').addEventListener('click', scrollLeft);
document.querySelector('.scroll-right-button').addEventListener('click', scrollRight);




const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
