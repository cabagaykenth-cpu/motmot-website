/* ===================================================== 
   MONTHSARY WEBSITE JAVASCRIPT 
   ===================================================== */ 
 
 
/* ===================================================== 
   PASSCODE 
   ===================================================== */ 
 
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
 
    const message = 
        document.getElementById("wrongPassword"); 
 
    if (enteredCode === SECRET_PASSCODE) { 
 
        document 
            .getElementById("lockScreen") 
            .style.display = "none"; 
 
        document 
            .getElementById("mainWebsite") 
            .classList.remove("hidden"); 
 
        if (message) { 
            message.textContent = ""; 
        } 
 
    } else { 
 
        if (message) { 
            message.textContent = 
                "Wrong code. Try again. ❤️"; 
        } 
 
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
 
    /* 
       MANUAL COUNTER 
 
       Change these numbers whenever you want. 
 
       Current: 
       1 MONTH 
       0 DAYS 
    */ 
 
    const monthsElement = 
        document.getElementById("months"); 
 
    const daysElement = 
        document.getElementById("days"); 
 
    if (monthsElement) { 
        monthsElement.textContent = "1"; 
    } 
 
    if (daysElement) { 
        daysElement.textContent = "0"; 
    } 
 
} 
 
 
/* Start counter */ 
updateCounter(); 
 
 
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
 
    if (!image) { 
        return; 
    } 
 
    const text = 
        document.getElementById("text" + number); 
 
    const reader = 
        new FileReader(); 
 
    reader.onload = function(e) { 
 
        image.src = e.target.result; 
 
        image.style.display = "block"; 
 
        /* 
           Only hide placeholder text 
           if it actually exists. 
        */ 
 
        if (text) { 
            text.style.display = "none"; 
        } 
 
    }; 
 
    reader.readAsDataURL(file); 
 
} 
 
 
/* ===================================================== 
   MUSIC PLAYER 
   ===================================================== */ 
 
const mainMusic = document.getElementById("music"); 
const mainVinyl = document.querySelector(".vinyl"); 
const mainProgress = document.getElementById("musicProgress"); 
 
 

 
const songs = [

    {
        file: "./music/song1.mp3",
        title: "Our Special Song",
        description: "Song for you ❤️"
    },

    {
        file: "./music/song2.mp3",
        title: "Our Second Song",
        description: "Another song for you 💕"
    },

    {
        file: "./music/song3.mp3",
        title: "Our Third Song",
        description: "A special song for us ❤️"
    }

];
 
 
let currentSong = 0; 
 
 
/* ===================================================== 
   SELECT SONG 
   ===================================================== */ 
 
function selectSong(number) { 
 
    if (!mainMusic) { 
        return; 
    } 
 
    if (number < 0 || number >= songs.length) { 
        return; 
    } 
 
    currentSong = number; 
 
    /* Stop current music */ 
 
    mainMusic.pause(); 
 
 
    /* Change music file */ 
 
    mainMusic.src = songs[currentSong].file; 
 
    mainMusic.load(); 
 
 
    /* Update song title */ 
 
    const songTitle = 
        document.querySelector(".song-info h2"); 
 
    const songDescription = 
        document.querySelector(".song-info p"); 
 
    if (songTitle) { 
        songTitle.textContent = 
            songs[currentSong].title; 
    } 
 
    if (songDescription) { 
        songDescription.textContent = 
            songs[currentSong].description; 
    } 
 
 
    /* Update active song */ 
 
    const songItems = 
        document.querySelectorAll(".song-item"); 
 
    songItems.forEach(function(item) { 
 
        item.classList.remove("active-song"); 
 
    }); 
 
 
    if (songItems[currentSong]) { 
 
        songItems[currentSong] 
            .classList.add("active-song"); 
 
    } 
 
 
    /* Reset progress */ 
 
    if (mainProgress) { 
        mainProgress.style.width = "0%"; 
    } 
 
 
    /* Stop vinyl animation */ 
 
    if (mainVinyl) { 
        mainVinyl.classList.remove("playing"); 
    } 
 
} 
 
 
/* ===================================================== 
   PLAY MUSIC 
   ===================================================== */ 
 
function playMusic() { 
 
    if (!mainMusic) { 
 
        alert("Music player not found."); 
 
        return; 
 
    } 
 
    mainMusic.play() 
 
        .then(function() { 
 
            if (mainVinyl) { 
                mainVinyl.classList.add("playing"); 
            } 
 
        }) 
 
        .catch(function(error) { 
 
            console.error( 
                "Music error:", 
                error 
            ); 
 
            alert( 
                "Hindi ma-play ang music. " + 
                "Check kung tama ang filename at nasa same folder ang MP3." 
            ); 
 
        }); 
 
} 
 
 
/* ===================================================== 
   PAUSE MUSIC 
   ===================================================== */ 
 
function pauseMusic() { 
 
    if (!mainMusic) { 
        return; 
    } 
 
    mainMusic.pause(); 
 
    if (mainVinyl) { 
        mainVinyl.classList.remove("playing"); 
    } 
 
} 
 
 
/* ===================================================== 
   MUSIC PROGRESS 
   ===================================================== */ 
 
if (mainMusic) { 
 
    mainMusic.addEventListener( 
        "timeupdate", 
        function() { 
 
            if ( 
                mainMusic.duration && 
                !isNaN(mainMusic.duration) 
            ) { 
 
                const percent = 
                    ( 
                        mainMusic.currentTime / 
                        mainMusic.duration 
                    ) * 100; 
 
                if (mainProgress) { 
 
                    mainProgress.style.width = 
                        percent + "%"; 
 
                } 
 
            } 
 
        } 
    ); 
 
 
    mainMusic.addEventListener( 
        "ended", 
        function() { 
 
            if (mainVinyl) { 
 
                mainVinyl.classList.remove( 
                    "playing" 
                ); 
 
            } 
 
            if (mainProgress) { 
 
                mainProgress.style.width = 
                    "0%"; 
 
            } 
 
        } 
    ); 
 
} 
 
 
/* ===================================================== 
   PHOTO ZOOM / LIGHTBOX 
   ===================================================== */ 
 
document.addEventListener( 
    "DOMContentLoaded", 
    function () { 
 
        /* 
           Create lightbox 
        */ 
 
        const lightbox = 
            document.createElement("div"); 
 
        lightbox.className = 
            "photo-lightbox"; 
 
 
        lightbox.innerHTML = ` 
            <button 
                class="photo-lightbox-close" 
                type="button"> 
                &times; 
            </button> 
 
            <img 
                src="" 
                alt="Zoomed Photo"> 
        `; 
 
 
        document.body.appendChild( 
            lightbox 
        ); 
 
 
        const zoomImage = 
            lightbox.querySelector("img"); 
 
 
        const closeButton = 
            lightbox.querySelector( 
                ".photo-lightbox-close" 
            ); 
 
 
        /* 
           Gallery images 
        */ 
 
        const galleryImages = 
            document.querySelectorAll( 
                ".photo-frame img" 
            ); 
 
 
        galleryImages.forEach( 
            function (image) { 
 
                image.addEventListener( 
                    "click", 
                    function (event) { 
 
                        event.stopPropagation(); 
 
 
                        /* 
                           Check if image has 
                           a real source 
                        */ 
 
                        if ( 
                            !image.src || 
                            image.src === 
                            window.location.href 
                        ) { 
 
                            return; 
 
                        } 
 
 
                        zoomImage.src = 
                            image.src; 
 
 
                        zoomImage.alt = 
                            image.alt || 
                            "Zoomed Photo"; 
 
 
                        lightbox.classList.add( 
                            "active" 
                        ); 
 
 
                        /* 
                           Prevent background 
                           scrolling 
                        */ 
 
                        document.body.style.overflow = 
                            "hidden"; 
 
                    } 
                ); 
 
            } 
        ); 
 
 
        /* 
           Close button 
        */ 
 
        closeButton.addEventListener( 
            "click", 
            function (event) { 
 
                event.stopPropagation(); 
 
                closeLightbox(); 
 
            } 
        ); 
 
 
        /* 
           Click outside image 
        */ 
 
        lightbox.addEventListener( 
            "click", 
            function (event) { 
 
                if ( 
                    event.target === lightbox 
                ) { 
 
                    closeLightbox(); 
 
                } 
 
            } 
        ); 
 
 
        /* 
           Don't close when 
           clicking image 
        */ 
 
        zoomImage.addEventListener( 
            "click", 
            function (event) { 
 
                event.stopPropagation(); 
 
            } 
        ); 
 
 
        /* 
           ESC key 
        */ 
 
        document.addEventListener( 
            "keydown", 
            function (event) { 
 
                if ( 
                    event.key === "Escape" 
                ) { 
 
                    closeLightbox(); 
 
                } 
 
            } 
        ); 
 
 
        /* 
           Close function 
        */ 
 
        function closeLightbox() { 
 
            lightbox.classList.remove( 
                "active" 
            ); 
 
            document.body.style.overflow = 
                ""; 
 
            setTimeout( 
                function () { 
 
                    zoomImage.src = ""; 
 
                }, 
                300 
            ); 
 
        } 
 
    } 
); 
 
 
/* ===================================================== 
   KEYBOARD SUPPORT 
   ===================================================== */ 
 
document.addEventListener( 
    "keydown", 
    function(event) { 
 
        const lockScreen = 
            document.getElementById( 
                "lockScreen" 
            ); 
 
        if (!lockScreen) { 
            return; 
        } 
 
        if ( 
            lockScreen.style.display !== 
            "none" 
        ) { 
 
            /* 
               Number keys 
            */ 
 
            if ( 
                event.key >= "0" && 
                event.key <= "9" 
            ) { 
 
                pressKey(event.key); 
 
            } 
 
            /* 
               Backspace 
            */ 
 
            if ( 
                event.key === 
                "Backspace" 
            ) { 
 
                deleteKey(); 
 
            } 
 
        } 
 
    } 
);