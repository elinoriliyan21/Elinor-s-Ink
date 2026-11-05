
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

// Автоматично вземане на всички снимки
// в реда, в който са подредени в HTML.

let images = [];
let currentImage = 0;

function getGalleryImages() {

    return Array.from(
        document.querySelectorAll(".gallery-grid .gallery-item img")
    );
}


// Отваряне на снимка

function openImage(image) {

    const modal = document.getElementById("imageModal");
    const bigImage = document.getElementById("bigImage");

    if (!modal || !bigImage) return;

    images = getGalleryImages();

    currentImage = images.indexOf(image);

    if (currentImage === -1) return;

    bigImage.src = image.src;
    bigImage.alt = image.alt;

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}


// Обновяване на голямата снимка

function updateBigImage() {

    const bigImage = document.getElementById("bigImage");

    if (!bigImage || images.length === 0) return;

    const selectedImage = images[currentImage];

    bigImage.src = selectedImage.src;
    bigImage.alt = selectedImage.alt;
}


// Следваща снимка

function nextImage() {

    if (images.length === 0) return;

    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    updateBigImage();
}


// Предишна снимка

function previousImage() {

    if (images.length === 0) return;

    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    updateBigImage();
}


// Затваряне на снимката

function closeImage() {

    const modal = document.getElementById("imageModal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "";
}


/* =====================================================
   3. КЛАВИАТУРНИ КОМАНДИ
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

    const buttons = document.querySelectorAll(".body-options button");

    buttons.forEach(function (button) {
        button.classList.remove("active");
    });

    const selectedButton = document.querySelector(
        '.body-options button[onclick="selectBodyZone(\'' + zone + '\')"]'
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}


// Изчисляване на цена

function calculatePrice() {

    const sizeSelect = document.getElementById("tattooSize");
    const placeSelect = document.getElementById("tattooPlace");

    const priceResult = document.getElementById("priceResult");

    const bookingButton = document.querySelector(".calculator-booking");

    if (!sizeSelect || !placeSelect || !priceResult) return;

    const size = sizeSelect.value;
    const place = placeSelect.value;

    if (!prices[place] || prices[place][size] === undefined) {

        priceResult.textContent =
            "Моля, избери място и размер на татуировката.";

        return;
    }

    const price = prices[place][size];

    priceResult.textContent =
        "Ориентировъчна цена: " + price + " €";

    if (bookingButton) {
        bookingButton.style.display = "inline-block";
    }

}


/* =====================================================
   КРАЙ НА JAVASCRIPT
===================================================== */
