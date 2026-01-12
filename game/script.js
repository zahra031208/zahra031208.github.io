// Ambil elemen canvas dan kuadranText
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const kuadranText = document.getElementById("kuadranText");

canvas.width = 500;
canvas.height = 500;

// Titik tengah canvas (pusat koordinat)
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Posisi awal benda bulat merah
let playerX = centerX;
let playerY = centerY;

// Fungsi menggambar sumbu X dan Y
function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Fungsi menggambar benda bulat merah
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

// Fungsi menentukan kuadran
function checkQuadrant() {
    if (playerX > centerX && playerY < centerY) {
        kuadranText.textContent = "Anda sedang berada di Kuadran 1";
    } else if (playerX < centerX && playerY < centerY) {
        kuadranText.textContent = "Anda sedang berada di Kuadran 2";
    } else if (playerX < centerX && playerY > centerY) {
        kuadranText.textContent = "Anda sedang berada di Kuadran 3";
    } else if (playerX > centerX && playerY > centerY) {
        kuadranText.textContent = "Anda sedang berada di Kuadran 4";
    } else {
        kuadranText.textContent = "Anda sedang berada di titik pusat.";
    }
}

// Fungsi update layar
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    drawPlayer();
    checkQuadrant();
}

// Event listener untuk menangkap input keyboard
document.addEventListener("keydown", function(event) {
    const step = 10; // Jarak perpindahan per tombol ditekan

    if (event.key === "ArrowUp" && playerY > 0) {
        playerY -= step;
    } else if (event.key === "ArrowDown" && playerY < canvas.height) {
        playerY += step;
    } else if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= step;
    } else if (event.key === "ArrowRight" && playerX < canvas.width) {
        playerX += step;
    }

    update(); // Perbarui tampilan
});

// Jalankan pertama kali
update();