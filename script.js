// --- CUSTOMIZABLE CONTENT ---
// Feel free to change these messages!
let momConfig = {
    loadingMessages: [
        "Baking some love...",
        "Organizing the hugs...",
        "Polishing the sparkles...",
        "Warning: High amounts of wholesomeness ahead...",
        "Consulting the chibi experts...",
        "Almost there, just one more heart..."
    ],
    surprises: {
        1: {
            title: "The Recipe of Love 🍰",
            text: "Mom, they say the secret ingredient is always love, but we know it's actually YOUR love! Whether it's your legendary tea or the way you somehow find everything I lose, you're the heart of this home.<br><br><i>Hint: Remember that one time when you were sick and had a flavourless tongue, I cooked you a BIG BOWL of noodles all by myself !! (almost).</i>",
            stickers: ["🧁", "🍪", "🍳", "✨"]
        },
        2: {
            title: "Memory Lane 🧸",
            text: "Looking back through my photos app makes me remember that I have some really wholesome and funny moments with you and more when we were locked inside the house and I used to drive my rock crawler onto your<br><br>Joke: 'Happy Mother’s Day to the woman who survived my attitude, my mess, and my ‘5 more minutes’ phase",
            stickers: ["📸", "🌸", "🌷", "🎀"]
        },
        3: {
            title: "The Secret Award 🏆",
            text: "<b>CERTIFICATE OF AWESOMENESS</b><br><br>Awarded to: <b>The Best Mom Ever</b><br><br>Stats:<br>Patience: 1000%<br>Cooking: Infinite Stars<br>Hugs: High Quality<br>Dad Jokes Resistance: Expert Level<br><br>I love you to the moon and back! 🌙✨",
            stickers: ["🥇", "💖", "🎉", "👑"]
        }
    }
};

// --- LOGIC ---
let messageIndex = 0;
const loadingText = document.getElementById('loading-text');

const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % momConfig.loadingMessages.length;
    loadingText.style.opacity = 0;
    setTimeout(() => {
        loadingText.textContent = momConfig.loadingMessages[messageIndex];
        loadingText.style.opacity = 1;
    }, 500);
}, 2000);

window.addEventListener('load', () => {
    setTimeout(() => {
        clearInterval(messageInterval);
        const screen = document.getElementById('loading-screen');
        screen.style.opacity = 0;
        setTimeout(() => screen.style.display = 'none', 800);
    }, 4000);

    initDecorations();
});

// Floating Decorations
function initDecorations() {
    const container = document.getElementById('decorations');
    const items = ['⭐', '✨', '🌸', '🌼', '💖', '☁️', '🍬'];
    const count = 30;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'decor-item';
        item.textContent = items[Math.floor(Math.random() * items.length)];

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 10;
        const size = 1 + Math.random() * 1.5;

        item.style.left = `${x}%`;
        item.style.top = `${y}%`;
        item.style.animationDelay = `${delay}s`;
        item.style.fontSize = `${size}rem`;

        container.appendChild(item);
    }
}

// Modal Logic
function openSurprise(id) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-content');
    const data = momConfig.surprises[id];

    let stickersHtml = '';
    data.stickers.forEach((s, i) => {
        const top = 10 + Math.random() * 80;
        const left = 10 + Math.random() * 80;
        stickersHtml += `<span class="sticker" style="top:${top}%; left:${left}%; transform: rotate(${Math.random() * 40 - 20}deg)">${s}</span>`;
    });

    content.innerHTML = `
        <h2 style="font-family: 'Indie Flower'; font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--warm-brown);">${data.title}</h2>
        <div class="note-text">${data.text}</div>
        ${stickersHtml}
    `;

    modal.classList.add('active');
}

function closeSurprise() {
    document.getElementById('modal').classList.remove('active');
}

// Edit Mode Logic
function toggleEditMode() {
    const editModal = document.getElementById('edit-modal');

    if (editModal.classList.contains('active')) {
        editModal.classList.remove('active');
        return;
    }

    // Fill form with current values
    document.getElementById('edit-joke-1').value = momConfig.surprises[1].text;
    document.getElementById('edit-joke-2').value = momConfig.surprises[2].text;
    document.getElementById('edit-joke-3').value = momConfig.surprises[3].text;
    document.getElementById('edit-loading').value = momConfig.loadingMessages.join('\n');

    editModal.classList.add('active');
}

function saveChanges() {
    momConfig.surprises[1].text = document.getElementById('edit-joke-1').value;
    momConfig.surprises[2].text = document.getElementById('edit-joke-2').value;
    momConfig.surprises[3].text = document.getElementById('edit-joke-3').value;
    momConfig.loadingMessages = document.getElementById('edit-loading').value.split('\n').filter(m => m.trim() !== "");

    localStorage.setItem('momConfig', JSON.stringify(momConfig));
    alert("Changes saved! Refresh to see loading message changes.");
    toggleEditMode();
}

// Music Logic
let isPlaying = false;
const audio = document.getElementById('bg-music');

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        document.getElementById('music-btn').textContent = '🔇';
    } else {
        audio.play().catch(e => console.log("User interaction needed for audio"));
        document.getElementById('music-btn').textContent = '🎵';
    }
    isPlaying = !isPlaying;
}

// Close modals on outside click
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    const editModal = document.getElementById('edit-modal');
    if (event.target == modal) closeSurprise();
    if (event.target == editModal) toggleEditMode();
}
