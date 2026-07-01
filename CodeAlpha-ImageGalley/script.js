// ================= IMAGE LIST =================

const images = [
    "images/image1.jpg",
    "images/krish.jpg",
    "images/city1.jpg",
    "images/city2.jpg",
    "images/animal1.jpg",
    "images/animal2.jpg"
];

let current = 0;

// ================= ENTER GALLERY =================

document.getElementById("enterBtn").addEventListener("click", function () {

    document.getElementById("gallerySection").scrollIntoView({
        behavior: "smooth"
    });

});

// ================= LIGHTBOX =================

function openLightbox(index) {

    current = index;

    document.getElementById("lightbox").style.display = "flex";

    document.getElementById("lightbox-img").src = images[current];

    updateCounter();

}

function closeLightbox() {

    document.getElementById("lightbox").style.display = "none";

}

function changeImage(step) {

    current += step;

    if (current < 0)
        current = images.length - 1;

    if (current >= images.length)
        current = 0;

    document.getElementById("lightbox-img").src = images[current];

    updateCounter();

}

function updateCounter() {

    document.getElementById("counter").innerHTML =
        (current + 1) + " / " + images.length;

}

// ================= FILTER =================

function filterImages(category) {

    let items = document.querySelectorAll(".image");

    let buttons = document.querySelectorAll(".buttons button");

    buttons.forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    items.forEach(function (item) {

        if (category === "all") {

            item.style.display = "block";

        }

        else if (item.classList.contains(category)) {

            item.style.display = "block";

        }

        else {

            item.style.display = "none";

        }

    });

}

// ================= SEARCH =================

document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let items = document.querySelectorAll(".image");

    items.forEach(function (item) {

        if (item.className.toLowerCase().includes(value)) {

            item.style.display = "block";

        }

        else {

            item.style.display = "none";

        }

    });

});

// ================= KEYBOARD =================

document.addEventListener("keydown", function (e) {

    let box = document.getElementById("lightbox");

    if (box.style.display === "flex") {

        if (e.key === "ArrowRight")
            changeImage(1);

        if (e.key === "ArrowLeft")
            changeImage(-1);

        if (e.key === "Escape")
            closeLightbox();

    }

});

// ================= CLOSE LIGHTBOX WHEN CLICKING OUTSIDE =================

document.getElementById("lightbox").addEventListener("click", function (e) {

    if (e.target.id === "lightbox") {

        closeLightbox();

    }

});