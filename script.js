
// =================================
// CSM HUB - LAUNCH SYSTEM
// =================================

// 1. COUNTDOWN CONFIGURATION

// وقت تجريبي للمعاينة فقط.
// لاحقاً سنربطه بموعد الإطلاق من لوحة المشرف.

let remainingTime = 7 * 86400 + 12 * 3600 + 45 * 60 + 30;


// 2. MATRIX BACKGROUND

const matrix = document.getElementById("matrix");

const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";

function createMatrix() {
    if (!matrix) return;

    const columns = 35;

    for (let i = 0; i < columns; i++) {
        const column = document.createElement("span");

        column.textContent = characters[
            Math.floor(Math.random() * characters.length)
        ];

        column.style.position = "absolute";
        column.style.left = Math.random() * 100 + "%";
        column.style.top = Math.random() * 100 + "%";
        column.style.color = "#51ffad";
        column.style.fontSize = "12px";
        column.style.fontFamily = "monospace";
        column.style.opacity = Math.random() * 0.7 + 0.2;
        column.style.animation =
            `matrixFall ${Math.random() * 8 + 5}s linear infinite`;

        matrix.appendChild(column);
    }
}

const matrixStyle = document.createElement("style");

matrixStyle.textContent = `
@keyframes matrixFall {
    from {
        transform: translateY(-100px);
    }
    to {
        transform: translateY(100vh);
    }
}
`;

document.head.appendChild(matrixStyle);

createMatrix();


// 3. DECRYPTION EFFECT

const symbols = "01ABCDEF#$%&@";

function decryptNumber(element, finalValue) {

    if (!element) return;

    let counter = 0;
    const duration = 1200;

    const interval = setInterval(() => {

        if (counter >= 12) {
            element.textContent = finalValue;
            clearInterval(interval);
            return;
        }

        let randomText = "";

        for (let i = 0; i < 2; i++) {
            randomText += symbols[
                Math.floor(Math.random() * symbols.length)
            ];
        }

        element.textContent = randomText;

        counter++;

    }, duration / 12);
}


// 4. COUNTDOWN DISPLAY

function updateCountdown() {

    const days = Math.floor(remainingTime / 86400);

    const hours = Math.floor(
        (remainingTime % 86400) / 3600
    );

    const minutes = Math.floor(
        (remainingTime % 3600) / 60
    );

    const seconds = remainingTime % 60;

    const values = {
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0")
    };

    Object.entries(values).forEach(([id, value]) => {

        const element = document.getElementById(id);

        if (!element) return;

        if (element.textContent !== value) {
            decryptNumber(element, value);
        }

    });

    if (remainingTime > 0) {
        remainingTime--;
    }
}


// 5. TERMINAL SYSTEM

const terminalMessages = [
    "> Establishing secure connection...",
    "> Loading CSM HUB core systems...",
    "> Connecting student community...",
    "> Preparing launch sequence...",
    "> Decryption engine activated...",
    "> Awaiting launch authorization..."
];

const terminal = document.getElementById("terminal-lines");

function startTerminal() {

    if (!terminal) return;

    terminal.innerHTML = "";

    terminalMessages.forEach((message, index) => {

        setTimeout(() => {

            const line = document.createElement("p");

            line.textContent = message;

            terminal.appendChild(line);

        }, index * 850);

    });
}


// 6. START SYSTEM

window.addEventListener("load", () => {

    startTerminal();

    setTimeout(() => {
        updateCountdown();

        setInterval(updateCountdown, 1000);

    }, 1500);

});
