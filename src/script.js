
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const matrixLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 255, 0, 0.4)";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text =
      matrixLetters[Math.floor(Math.random() * matrixLetters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setTimeout(() => {
  setInterval(drawMatrix, 33);

  const message = document.getElementById("message");
  message.textContent = "";
  const messageText =
    "Send your Solana from your DEX wallet to this address and get rich: keyWcrpVokmeZjaW1oDYZxvnp9eV8dqybo5vB2Wpxkd";
  let messageIndex = 0;

  function typeMessage() {
    if (messageIndex < messageText.length) {
      message.textContent += messageText.charAt(messageIndex);
      messageIndex++;
      setTimeout(typeMessage, 50);
    }
  }

  typeMessage();
}, 1500);

document.getElementById("message").addEventListener("click", () => {
  const address = "keyWcrpVokmeZjaW1oDYZxvnp9eV8dqybo5vB2Wpxkd";
  navigator.clipboard
    .writeText(address)
    .then(() => {
      alert("Copied Wallet Address to Clipboard");
    })
    .catch((err) => {
      alert("An error occurred: " + err);
    });
});
