

const SECRET_PASSCODE = "081526";

let enteredCode = "";


function pressKey(number) {

    if (enteredCode.length >= 6) {
        return;
    }

    enteredCode += number;

    updateDots();

    if (enteredCode.length === 6) {

        setTimeout(checkPassword, 200);

    }

}


function deleteKey() {

    enteredCode = enteredCode.slice(0, -1);

    updateDots();

    document.getElementById("wrongPassword").textContent = "";

}


function updateDots() {

    for (let i = 1; i <= 6; i++) {

        const dot =
            document.getElementById("dot" + i);

        if (i <= enteredCode.length) {

            dot.classList.add("filled");

        } else {

            dot.classList.remove("filled");

        }

    }

}


function checkPassword() {

    const message =
        document.getElementById("wrongPassword");

    if (enteredCode === SECRET_PASSCODE) {

        document
            .getElementById("lockScreen")
            .style.display = "none";

        document
            .getElementById("mainWebsite")
            .classList.remove("hidden");

        message.textContent = "";

    } else {

        message.textContent =
            "Wrong code. Try again. ❤️";

        enteredCode = "";

        updateDots();

    }

}


/* =====================================================
   SECTION NAVIGATION
   ===================================================== */

function showSection(sectionId) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(section => {

        section.classList.remove("active");

    });


    const selected =
        document.getElementById(sectionId);

    if (selected) {

        selected.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* =====================================================
   MONTHSARY COUNTER
   ===================================================== */

function updateCounter() {

    const startDate =
        new Date("2026-01-10T00:00:00");

    const today =
        new Date();


    let months =
        (today.getFullYear() -
        startDate.getFullYear()) * 12;

    months +=
        today.getMonth() -
        startDate.getMonth();


    let tempDate =
        new Date(startDate);

    tempDate.setMonth(
        tempDate.getMonth() + months
    );


    if (tempDate > today) {

        months--;

        tempDate =
            new Date(startDate);

        tempDate.setMonth(
            tempDate.getMonth() + months
        );

    }


    const difference =
        today - tempDate;

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    document.getElementById("months")
        .textContent = months;

    document.getElementById("days")
        .textContent = days;

}


updateCounter();

setInterval(updateCounter, 1000 * 60 * 60);


/* =====================================================
   PHOTO PREVIEW
   ===================================================== */

function previewImage(event, number) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }


    const image =
        document.getElementById("photo" + number);

    const text =
        document.getElementById("text" + number);


    const reader =
        new FileReader();


    reader.onload = function(e) {

        image.src = e.target.result;

        image.style.display = "block";

        text.style.display = "none";

    };


    reader.readAsDataURL(file);

}

/* ================= MUSIC PLAYER ================= */

const mainMusic = document.getElementById("music");
const mainVinyl = document.querySelector(".vinyl");
const mainProgress = document.getElementById("musicProgress");


function playMusic() {

    if (!mainMusic) {
        alert("Music player not found.");
        return;
    }

    mainMusic.play()
        .then(function () {

            if (mainVinyl) {
                mainVinyl.classList.add("playing");
            }

        })
        .catch(function (error) {

            console.error("Music error:", error);

            alert(
                "Hindi ma-play ang music. " +
                "Check kung nasa same folder ang song1.mp3."
            );

        });

}


function pauseMusic() {

    if (!mainMusic) {
        return;
    }

    mainMusic.pause();

    if (mainVinyl) {
        mainVinyl.classList.remove("playing");
    }

}


if (mainMusic) {

    mainMusic.addEventListener(
        "timeupdate",
        function () {

            if (
                mainMusic.duration &&
                !isNaN(mainMusic.duration)
            ) {

                const percent =
                    (mainMusic.currentTime /
                    mainMusic.duration) * 100;

                if (mainProgress) {

                    mainProgress.style.width =
                        percent + "%";

                }

            }

        }
    );


    mainMusic.addEventListener(
        "ended",
        function () {

            if (mainVinyl) {
                mainVinyl.classList.remove("playing");
            }

            if (mainProgress) {
                mainProgress.style.width = "0%";
            }

        }
    );

}


/* =====================================================
   PHOTO ZOOM / LIGHTBOX
   ===================================================== */

function createPhotoLightbox() {

    if (document.querySelector(".photo-lightbox")) {
        return;
    }


    const lightbox =
        document.createElement("div");

    lightbox.className =
        "photo-lightbox";


    const image =
        document.createElement("img");


    lightbox.appendChild(image);

    document.body.appendChild(lightbox);


    /* CLICK OUTSIDE PHOTO TO CLOSE */

    lightbox.addEventListener(
        "click",
        function(event) {

            if (event.target === lightbox) {

                closePhotoLightbox();

            }

        }
    );

}


function openPhotoLightbox(src) {

    if (!src) {
        return;
    }


    createPhotoLightbox();


    const lightbox =
        document.querySelector(".photo-lightbox");

    const image =
        lightbox.querySelector("img");


    image.src = src;

    lightbox.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closePhotoLightbox() {

    const lightbox =
        document.querySelector(".photo-lightbox");

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}

/* =====================================================
   PHOTO ZOOM / LIGHTBOX
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Create lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "photo-lightbox";

    lightbox.innerHTML = `
        <button class="photo-lightbox-close" type="button">&times;</button>
        <img src="" alt="Zoomed Photo">
    `;

    document.body.appendChild(lightbox);

    const zoomImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(".photo-lightbox-close");

    // All gallery images
    const galleryImages = document.querySelectorAll(".photo-frame img");

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function (event) {

            event.stopPropagation();

            // Make sure image actually has a photo
            if (!image.src || image.src === window.location.href) {
                return;
            }

            zoomImage.src = image.src;
            zoomImage.alt = image.alt || "Zoomed Photo";

            lightbox.classList.add("active");

            // Prevent background scrolling
            document.body.style.overflow = "hidden";
        });

    });

    // Close using X
    closeButton.addEventListener("click", function (event) {

        event.stopPropagation();

        closeLightbox();

    });

    // Close when clicking outside image
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    // Close when clicking the zoomed image
    zoomImage.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // ESC key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

        setTimeout(function () {
            zoomImage.src = "";
        }, 300);

    }

});


/* =====================================================
   KEYBOARD SUPPORT
   ===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            document
                .getElementById("lockScreen")
                .style.display !== "none"
        ) {

            if (
                event.key >= "0" &&
                event.key <= "9"
            ) {

                pressKey(event.key);

            }


            if (event.key === "Backspace") {

                deleteKey();

            }

        }

    }
);