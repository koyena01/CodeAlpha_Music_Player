// ================================
// VYBE MUSIC PLAYER
// ================================

// Audio element
const audio = document.getElementById("audio-player");

// Player buttons
const playButton = document.getElementById("play-button");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const shuffleButton = document.getElementById("shuffle-button");
const loopButton = document.getElementById("loop-button");

// Player information
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const songImage = document.getElementById("song-image");

// Progress
const progressBar = document.getElementById("progress-bar");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// Volume
const volumeBar = document.getElementById("volume-bar");


// ======================================
// SONG LIST
// ======================================

const songs = [

    {
        title: "Boba Tunnel",
        artist: "Anupam Roy",
        audio: "Assets/Music/Bobatunel.mp3",
        image: "Assets/Images/Boba-tunnel.jpg"
    },

    {
        title: "Brooklyn Baby",
        artist: "Lana Del Rey",
        audio: "Assets/Music/Brooklyn_Baby.mp3",
        image: "Assets/Images/Brooklyn Baby.jpg"
    },

    {
        title: "Bulleya",
        artist: "Papon",
        audio: "Assets/Music/Bulleya.mp3",
        image: "Assets/Images/bulleya.jpg"
    },

    {
        title: "Ekhon Onek Raat",
        artist: "Anupam Roy",
        audio: "Assets/Music/Ekhon_Onek_Raat.mp3",
        image: "Assets/Images/Ekhon-onek-rat.jpg"
    },

    {
        title: "Hridoyer Rong",
        artist: "Lagnajita Chakraborty",
        audio: "Assets/Music/Hridoyer Rang.mp3",
        image: "Assets/Images/hridoyer ronng.jpg"
    },

    {
        title: "In Dino",
        artist: "Soham and Pritam Chakraborty",
        audio: "Assets/Music/In Dino.mp3",
        image: "Assets/Images/in-dino.jpg"
    },

    {
        title: "Jogi",
        artist: "Yasser Desai and Aakanksha Sharma",
        audio: "Assets/Music/jogi.mp3",
        image: "Assets/Images/jogi.jpg"
    },

    {
        title: "Mitwa",
        artist: "Shafqat Amanat Ali, Shankar Mahadevan, and Caralisa Monteiro",
        audio: "Assets/Music/mitwa.mp3",
        image: "Assets/Images/mitwa.jpg"
    },

    {
        title: "Perfect",
        artist: "Ed Sheeran",
        audio: "Assets/Music/perfect.mp3",
        image: "Assets/Images/perfect.jpg"
    },

    {
        title: "Tum Tak",
        artist: "A R Rahaman",
        audio: "Assets/Music/tumtak.mp3",
        image: "Assets/Images/tum-tak.jpg"
    },

    {
        title: "White Mustang",
        artist: "Lana Del Rey",
        audio: "Assets/Music/whitemustang.mp3",
        image: "Assets/Images/white mustang.jpg"
    }

];


// ======================================
// CURRENT SONG
// ======================================

let currentSongIndex = 0;

let isShuffleOn = false;
let isLoopOn = false;


// ======================================
// LOAD SONG
// ======================================

function loadSong(index) {

    currentSongIndex = index;

    const song = songs[currentSongIndex];

    audio.src = song.audio;

    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    // Show album image in bottom player
    songImage.style.backgroundImage = `url("${song.image}")`;
    songImage.style.backgroundSize = "cover";
    songImage.style.backgroundPosition = "center";

    // Reset progress
    progressBar.value = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    // IMPORTANT:
    // Whenever a new song is loaded,
    // button should show PLAY.
    playButton.textContent = "▶";
}


// ======================================
// PLAY / PAUSE
// ======================================

playButton.addEventListener("click", function () {

    if (audio.paused) {

        audio.play()
            .then(() => {
                playButton.textContent = "⏸";
            })
            .catch(error => {
                console.log("Audio could not play:", error);
            });

    } else {

        audio.pause();

    }

});


// ======================================
// WHEN MUSIC STARTS PLAYING
// ======================================

audio.addEventListener("play", function () {

    // Change ▶ to ⏸ automatically
    playButton.textContent = "⏸";

});


// ======================================
// WHEN MUSIC IS PAUSED
// ======================================

audio.addEventListener("pause", function () {

    // Change ⏸ back to ▶ automatically
    playButton.textContent = "▶";

});


// ======================================
// WHEN SONG ENDS
// ======================================

audio.addEventListener("ended", function () {

    // LOOP CURRENT SONG
    if (isLoopOn) {

        audio.currentTime = 0;

        audio.play();

        return;
    }


    // SHUFFLE
    if (isShuffleOn) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    }

    // NORMAL NEXT SONG
    else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }

    }


    loadSong(currentSongIndex);

    audio.play();

});

// ======================================
// NEXT BUTTON
// ======================================

nextButton.addEventListener("click", function () {

    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }

    loadSong(currentSongIndex);

    audio.play();

});


// ======================================
// PREVIOUS BUTTON
// ======================================

previousButton.addEventListener("click", function () {

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);

    audio.play();

});
// ======================================
// SHUFFLE
// ======================================

shuffleButton.addEventListener("click", function () {

    isShuffleOn = !isShuffleOn;

    shuffleButton.classList.toggle(
        "active",
        isShuffleOn
    );

});
// ======================================
// LOOP
// ======================================

loopButton.addEventListener("click", function () {

    isLoopOn = !isLoopOn;

    loopButton.classList.toggle(
        "active",
        isLoopOn
    );

});

// ======================================
// PROGRESS BAR
// ======================================

audio.addEventListener("loadedmetadata", function () {

    progressBar.max = audio.duration;

    duration.textContent = formatTime(audio.duration);

});


audio.addEventListener("timeupdate", function () {

    progressBar.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

});


progressBar.addEventListener("input", function () {

    audio.currentTime = progressBar.value;

});


// ======================================
// VOLUME
// ======================================

volumeBar.addEventListener("input", function () {

    audio.volume = volumeBar.value;

});


// ======================================
// FORMAT TIME
// ======================================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}


// ======================================
// ALBUM CARD CLICK
// ======================================

// ======================================
// ALBUM CARD PLAY BUTTON
// ======================================

const albumCards = document.querySelectorAll(".album-card");

albumCards.forEach((card) => {

    const songIndex = Number(card.dataset.song);

    // Click anywhere on the card
    card.addEventListener("click", function () {

        loadSong(songIndex);

        audio.play();

    });


    // Click specifically on the play button
    const cardPlayButton = card.querySelector(".card-play");

    cardPlayButton.addEventListener("click", function (event) {

        // Prevent the card click from firing twice
        event.stopPropagation();

        // Load selected song
        loadSong(songIndex);

        // Start playing
        audio.play();

    });

});


// ======================================
// INITIAL SONG
// ======================================

loadSong(0);
// ======================================
// ======================================
// SPOTIFY STYLE ALBUM SCROLL
// ======================================

const albumContainer = document.querySelector(".album-container");

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");


// RIGHT ARROW
rightBtn.addEventListener("click", function () {

    albumContainer.scrollBy({
        left: 500,
        behavior: "smooth"
    });

});


// LEFT ARROW
leftBtn.addEventListener("click", function () {

    albumContainer.scrollBy({
        left: -500,
        behavior: "smooth"
    });

});


// SHOW / HIDE ARROWS
function updateScrollButtons() {

    if (albumContainer.scrollLeft <= 5) {
        leftBtn.style.display = "none";
    } else {
        leftBtn.style.display = "flex";
    }

    if (
        albumContainer.scrollLeft +
        albumContainer.clientWidth >=
        albumContainer.scrollWidth - 5
    ) {
        rightBtn.style.display = "none";
    } else {
        rightBtn.style.display = "flex";
    }
}


// Update when scrolling
albumContainer.addEventListener(
    "scroll",
    updateScrollButtons
);


// Update when window size changes
window.addEventListener(
    "resize",
    updateScrollButtons
);


// Initial state
updateScrollButtons();
// ======================================
// SEARCH MUSIC
// ======================================

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", searchMusic);

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchMusic();
    }

});


function searchMusic() {

    const searchText = searchInput.value.trim().toLowerCase();

    // Remove previous highlight
    albumCards.forEach(card => {
        card.classList.remove("search-highlight");
    });


    // If search box is empty
    if (searchText === "") {
        return;
    }


    // Find matching song
    const songIndex = songs.findIndex(song =>
        song.title.toLowerCase().includes(searchText) ||
        song.artist.toLowerCase().includes(searchText)
    );


    // No song found
    if (songIndex === -1) {

        alert("Song not found!");

        return;
    }


    // Find corresponding album card
    const matchingCard = document.querySelector(
        `.album-card[data-song="${songIndex}"]`
    );


    if (!matchingCard) {
        return;
    }


    // Highlight card
    matchingCard.classList.add("search-highlight");


    // Bring card into view
    matchingCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
    });

}
const artists = [
    {
        name: "Anupam Roy",
        image: "Assets/Images/anupam-roy.jpg"
    },
    {
        name: "Lana Del Rey",
        image: "Assets/Images/lana-del-rey.jpg"
    },
    {
        name: "Papon",
        image: "Assets/Images/papon.jpg"
    },
    {
        name: "Lagnajita Chakraborty",
        image: "Assets/Images/lagnajita.jpg"
    },
    {
        name: "Pritam Chakraborty",
        image: "Assets/Images/pritam.jpg"
    },
    {
        name: "Ed Sheeran",
        image: "Assets/Images/ed-sheeran.jpg"
    },
    {
        name: "A. R. Rahman",
        image: "Assets/Images/ar-rahman.jpg"
    },
    {
        name: "Yasser Desai",
        image: "Assets/Images/yasser-desai.jpg"
    }
];
// ======================================
// CREATE ARTIST CARDS
// ======================================

const artistContainer = document.querySelector(".artist-container");

artists.forEach(function (artist) {

    const artistCard = document.createElement("div");

    artistCard.classList.add("artist-card");

    artistCard.innerHTML = `
        <div class="artist-image">
            <img src="${artist.image}" alt="${artist.name}">
        </div>

        <h3>${artist.name}</h3>

        <p>Artist</p>
    `;

    artistContainer.appendChild(artistCard);

});


// ======================================
// ARTIST ARROWS
// ======================================

const artistLeftBtn =
    document.getElementById("artist-left-btn");

const artistRightBtn =
    document.getElementById("artist-right-btn");


// RIGHT ARROW

artistRightBtn.addEventListener("click", function () {

    artistContainer.scrollBy({
        left: 500,
        behavior: "smooth"
    });

});


// LEFT ARROW

artistLeftBtn.addEventListener("click", function () {

    artistContainer.scrollBy({
        left: -500,
        behavior: "smooth"
    });

});


// ======================================
// SHOW / HIDE ARTIST ARROWS
// ======================================

function updateArtistArrows() {

    // LEFT

    if (artistContainer.scrollLeft <= 5) {

        artistLeftBtn.style.display = "none";

    } else {

        artistLeftBtn.style.display = "flex";

    }


    // RIGHT

    if (
        artistContainer.scrollLeft +
        artistContainer.clientWidth >=
        artistContainer.scrollWidth - 5
    ) {

        artistRightBtn.style.display = "none";

    } else {

        artistRightBtn.style.display = "flex";

    }

}


// UPDATE WHEN ARTISTS MOVE

artistContainer.addEventListener(
    "scroll",
    updateArtistArrows
);


// UPDATE WHEN WINDOW RESIZES

window.addEventListener(
    "resize",
    updateArtistArrows
);


// INITIAL CHECK

updateArtistArrows();
// =========================================================
// LOGIN MODAL
// =========================================================

const signInButton =
    document.getElementById("sign-in-button");

const loginOverlay =
    document.getElementById("login-overlay");

const closeLogin =
    document.getElementById("close-login");

const loginForm =
    document.getElementById("login-form");


// OPEN LOGIN
signInButton.addEventListener("click", function () {

    loginOverlay.classList.add("active");

});


// CLOSE LOGIN
closeLogin.addEventListener("click", function () {

    loginOverlay.classList.remove("active");

});


// CLOSE WHEN CLICKING OUTSIDE THE MODAL
loginOverlay.addEventListener("click", function (event) {

    if (event.target === loginOverlay) {

        loginOverlay.classList.remove("active");

    }

});


// CLOSE WITH ESCAPE KEY
document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        loginOverlay.classList.contains("active")
    ) {

        loginOverlay.classList.remove("active");

    }

});


// LOGIN FORM
loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("login-email").value;

    const password =
        document.getElementById("login-password").value;

    console.log("Email:", email);
    console.log("Password:", password);

    alert("Welcome Back!");

});