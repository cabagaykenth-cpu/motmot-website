/* =====================================================
   MONTHSARY WEBSITE JAVASCRIPT
   ===================================================== */


/* ================= PASSCODE ================= */

// CHANGE YOUR PASSWORD HERE
const SECRET_PASSCODE = "081526";

let enteredCode = "";


function pressKey(number) {

    // Maximum of 6 digits
    if (enteredCode.length >= 6) {
        return;
    }

    enteredCode += number;

    updateDots();

    // Check password after 6 digits
    if (enteredCode.length === 6) {
        setTimeout(checkPassword, 200);
    }
}


function deleteKey() {

    enteredCode =
        enteredCode.slice(0, -1);

    updateDots();

    document.getElementById(
        "wrongPassword"
    ).textContent = "";
}


function updateDots() {

    // Update all 6 dots
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

    const wrongPassword =
        document.getElementById("wrongPassword");

    if (enteredCode === SECRET_PASSCODE) {

        document.getElementById(
            "lockScreen"
        ).style.display = "none";

        document.getElementById(
            "mainWebsite"
        ).classList.remove("hidden");

        showSection("home");

    } else {

        wrongPassword.textContent =
            "Wrong passcode. Try again ❤️";

        enteredCode = "";

        updateDots();
    }
}


/* ================= NAVIGATION ================= */

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(function(section) {

        section.classList.remove("active");

    });


    const selected =
        document.getElementById(sectionName);

    if (selected) {

        selected.classList.add("active");

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= MONTH COUNTER ================= */

// CHANGE THIS DATE TO YOUR ACTUAL START DATE
const startDate =
    new Date("2026-01-10");

const today =
    new Date();


let months =
    (today.getFullYear() - startDate.getFullYear()) * 12
    +
    (today.getMonth() - startDate.getMonth());


if (today.getDate() < startDate.getDate()) {
    months--;
}


if (months < 0) {
    months = 0;
}


let days =
    Math.floor(
        (today - startDate) /
        (1000 * 60 * 60 * 24)
    );


if (days < 0) {
    days = 0;
}


document.getElementById(
    "months"
).textContent = months;


document.getElementById(
    "days"
).textContent = days;


/* ================= PHOTO GALLERY ================= */

function previewImage(event, number) {

    const file =
        event.target.files[0];

    if (!file) {
        return;
    }


    const image =
        document.getElementById(
            "photo" + number
        );


    const text =
        document.getElementById(
            "text" + number
        );


    const reader =
        new FileReader();


    reader.onload = function(e) {

        image.src =
            e.target.result;

        image.style.display =
            "block";

        text.style.display =
            "none";
    };


    reader.readAsDataURL(file);
}


/* ================= MUSIC ================= */

const music =
    document.getElementById("music");

const progress =
    document.getElementById(
        "musicProgress"
    );


function playMusic() {

    music.play();
}


function pauseMusic() {

    music.pause();
}


music.addEventListener(
    "timeupdate",
    function() {

        if (!music.duration) {
            return;
        }

        const percentage =
            (music.currentTime /
            music.duration) * 100;

        progress.style.width =
            percentage + "%";

    }
);


/* ================= KEYBOARD PASSCODE ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            document.getElementById(
                "lockScreen"
            ).style.display !== "none"
        ) {

            // Allow numbers 0-9
            if (
                event.key >= "0" &&
                event.key <= "9"
            ) {

                pressKey(event.key);

            }


            // Allow Backspace
            if (
                event.key === "Backspace"
            ) {

                deleteKey();

            }

        }

    }
);