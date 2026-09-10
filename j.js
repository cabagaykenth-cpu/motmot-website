/* =====================================================
   MONTHSARY WEBSITE JAVASCRIPT
   ===================================================== */


/* ================= PASSCODE ================= */

// YOUR PASSWORD
const SECRET_PASSCODE = "081526";

let enteredCode = "";


function pressKey(number) {

    // Maximum 6 digits
    if (enteredCode.length >= 6) {
        return;
    }

    enteredCode += number;

    updateDots();

    // Check after 6 digits
    if (enteredCode.length === 6) {
        setTimeout(checkPassword, 200);
    }
}


function deleteKey() {

    enteredCode = enteredCode.slice(0, -1);

    updateDots();

    const wrongPassword =
        document.getElementById("wrongPassword");

    if (wrongPassword) {
        wrongPassword.textContent = "";
    }
}


function updateDots() {

    for (let i = 1; i <= 6; i++) {

        const dot =
            document.getElementById("dot" + i);

        if (!dot) {
            continue;
        }

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

        if (wrongPassword) {
            wrongPassword.textContent =
                "Wrong passcode. Try again ❤️";
        }

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


const monthsElement =
    document.getElementById("months");

const daysElement =
    document.getElementById("days");


if (monthsElement) {
    monthsElement.textContent = months;
}


if (daysElement) {
    daysElement.textContent = days;
}


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


    if (!image || !text) {
        return;
    }


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
    document.getElementById("musicProgress");


function playMusic() {

    if (!music) {
        alert("Music player not found.");
        return;
    }


    music.play()
        .then(function() {

            console.log(
                "Music is playing."
            );

        })
        .catch(function(error) {

            console.log(
                "Music error:",
                error
            );

            alert(
                "Hindi ma-play ang music. " +
                "Siguraduhing uploaded ang MP3 file sa GitHub."
            );

        });

}


function pauseMusic() {

    if (!music) {
        return;
    }

    music.pause();
}


/* MUSIC PROGRESS */

if (music && progress) {

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


    music.addEventListener(
        "ended",
        function() {

            progress.style.width =
                "0%";

        }
    );


    music.addEventListener(
        "error",
        function() {

            console.log(
                "Unable to load music file."
            );

        }
    );

}


/* ================= KEYBOARD PASSCODE ================= */

document.addEventListener(
    "keydown",
    function(event) {

        const lockScreen =
            document.getElementById(
                "lockScreen"
            );


        if (
            lockScreen &&
            lockScreen.style.display !== "none"
        ) {

            // Numbers 0-9
            if (
                event.key >= "0" &&
                event.key <= "9"
            ) {

                pressKey(event.key);

            }


            // Backspace
            if (
                event.key === "Backspace"
            ) {

                deleteKey();

            }

        }

    }
);