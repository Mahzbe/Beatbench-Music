document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('music-container').style.display = 'block';
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data) {
            loginError.textContent = data.message;
        }
    });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const userType = document.getElementById('userType').value;
    const registerError = document.getElementById('register-error');

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password: password })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('register-container').style.display = 'none';
            document.getElementById('music-container').style.display = 'block';
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data) {
            registerError.textContent = data.message;
        }
    });
});

document.getElementById('register-link').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('register-container').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', function() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// Example data and functionality for music library
const musicList = [
    { title: "Song 1", src: "song1.mp3" },
    { title: "Song 2", src: "song2.mp3" }
];

function updateMusicList() {
    const list = document.getElementById('music-list');
    list.innerHTML = '';
    musicList.forEach((music, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'music-item';
        listItem.innerHTML = `
            ${music.title} <button onclick="playMusic('${music.src}')">Play</button>
        `;
        list.appendChild(listItem);
    });
}

function playMusic(src) {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    audioSource.src = src;
    audioPlayer.load();
    audioPlayer.play();
}

updateMusicList();
