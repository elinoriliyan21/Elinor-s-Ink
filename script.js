let currentImage = 0;

const images = [
    "images/tattoo1.jpg",
    "images/tattoo2.jpg",
    "images/tattoo3.jpg",
    "images/tattoo4.jpg",
    "images/tattoo5.jpg",
    "images/tattoo6.jpg",
    "images/tattoo7.jpg"
];

function openImage(image) {
   currentImage = images.indexOf(image.getAttribute("src"));

    document.getElementById("bigImage").src = images[currentImage];
    document.getElementById("imageModal").style.display = "flex";
}

function closeImage() {
    document.getElementById("imageModal").style.display = "none";
}

function nextImage() {
    currentImage++;

    if (currentImage >= images.length) {
        currentImage = 0;
    }

    document.getElementById("bigImage").src = images[currentImage];
}

function previousImage() {
    currentImage--;

    if (currentImage < 0) {
        currentImage = images.length - 1;
    }

    document.getElementById("bigImage").src = images[currentImage];
}
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀️ Светъл режим";
    } else {
        themeToggle.textContent = "🌙 Тъмен режим";
    }
});
function calculatePrice() {
    const size = document.getElementById("tattooSize").value;
    const place = document.getElementById("tattooPlace").value;

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

    const price = prices[place][size];

    document.getElementById("priceResult").textContent =
        "Ориентировъчна цена: " + price + " €";
        document.querySelector(".calculator-booking").style.display = "inline-block";
}

function selectBodyZone(zone) {
    const placeSelect = document.getElementById("tattooPlace");
    const selectedZone = document.getElementById("selectedZone");

    const zoneNames = {
        arm: "Ръка",
        leg: "Крак",
        back: "Гръб",
        chest: "Гърди",
        ribs: "Ребра",
        neck: "Врат"
    };

    placeSelect.value = zone;

    selectedZone.textContent = "Избрана зона: " + zoneNames[zone];

    const buttons = document.querySelectorAll(".body-options button");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });

    const selectedButton = document.querySelector(
        ".body-options button[onclick=\"selectBodyZone('" + zone + "')\"]"
    );

    if (selectedButton) {
        selectedButton.classList.add("active");
    }
}