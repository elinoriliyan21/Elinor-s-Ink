
/* =====================================================
   ELINOR'S INK
   ОСНОВЕН JAVASCRIPT ФАЙЛ
===================================================== */


/* =====================================================
   1. МОБИЛНО МЕНЮ
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);

    });

    // Затваряне на менюто след избор на страница

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mainNav.classList.remove("open");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

}


/* =====================================================
   2. ГАЛЕРИЯ
===================================================== */

// Списък със снимките

const images = [
    "images/tattoo1.jpg",
    "images/tattoo2.jpg",
    "images/tattoo3.jpg",
    "images/tattoo4.jpg",
    "images/tattoo5.jpg",
    "images/tattoo6.jpg",
    "images/tattoo7.jpg"
];

let currentImage = 0;


// Отваряне на снимка

function openImage(image) {

    const modal = document.getElementById("imageModal");
    const bigImage = document.getElementById("bigImage");

    if (!modal || !bigImage) return;

    currentImage = images.indexOf(image.getAttribute("src"));

    if (currentImage === -1) {
        currentImage = 0;
    }

    bigImage.src = images[currentImage];

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

}


// Затваряне на снимката

function closeImage() {

    const modal = document.getElementById("imageModal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "";

}


// Следваща снимка

function nextImage() {

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    updateBigImage();

}


// Предишна снимка

function previousImage() {

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    updateBigImage();

}


// Обновяване на голямата снимка

function updateBigImage() {

    const bigImage = document.getElementById("bigImage");

    if (!bigImage) return;

    bigImage.src = images[currentImage];

}


/* =====================================================
   3. КЛАВИАТУРНИ КОМАНДИ ЗА ГАЛЕРИЯТА
===================================================== */

document.addEventListener("keydown", function (event) {

    const modal = document.getElementById("imageModal");

    if (!modal || modal.style.display !== "flex") return;

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }

    if (event.key === "Escape") {
        closeImage();
    }

});


/* =====================================================
   4. КАЛКУЛАТОР ЗА ЦЕНИ
===================================================== */

// Цени според зона и размер

const prices = {

    arm: {
        small: 20,
        medium: 40,
        large: 80
    },

    leg: {
        small: 30,
        medium: 50,
        large: 90
    },

    back: {
        small: 50,
        medium: 100,
        large: 200
    },

    chest: {
        small: 40,
        medium: 65,
        large: 100
    },

    ribs: {
        small: 15,
        medium: 30,
        large: 45
    },

    neck: {
        small: 15,
        medium: 30,
        large: 45
    }

};


// Имена на зоните на български

const zoneNames = {

    arm: "Ръка",
    leg: "Крак",
    back: "Гръб",
    chest: "Гърди",
    ribs: "Ребра",
    neck: "Врат"

};


// Избор на зона

function selectBodyZone(zone) {

    const placeSelect = document.getElementById("tattooPlace");
    const selectedZone = document.getElementById("selectedZone");

    if (!placeSelect || !selectedZone) return;

    if (!zoneNames[zone]) return;

    placeSelect.value = zone;

    selectedZone.textContent =
        "Избрана зона: " + zoneNames[zone];


    // Премахване на активния клас от всички бутони

    const buttons = document.querySelectorAll(".body-options button");

    buttons.forEach(function (button) {

        button.classList.remove("active");

    });


    // Активиране на избрания бутон

    const selectedButton = document.querySelector(
        '.body-options button[onclick="selectBodyZone(\'' + zone + '\')"]'
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }

}


// Изчисляване на цената

function calculatePrice() {

    const sizeSelect = document.getElementById("tattooSize");
    const placeSelect = document.getElementById("tattooPlace");

    const priceResult = document.getElementById("priceResult");

    const bookingButton = document.querySelector(".calculator-booking");


    if (!sizeSelect || !placeSelect || !priceResult) return;


    const size = sizeSelect.value;
    const place = placeSelect.value;


    // Проверка на избраните стойности

    if (!prices[place] || prices[place][size] === undefined) {

        priceResult.textContent =
            "Моля, избери място и размер на татуировката.";

        return;

    }


    const price = prices[place][size];


    // Показване на резултата

    priceResult.textContent =
        "Ориентировъчна цена: " + price + " €";


    // Показване на бутона за запитване

    if (bookingButton) {

        bookingButton.style.display = "inline-block";

    }

}


/* =====================================================
   5. КРАЙ НА JAVASCRIPT ФАЙЛА
===================================================== */
