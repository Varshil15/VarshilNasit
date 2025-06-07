const text = "Writing Code. Learning to Hack. Exploring Tech.";
let index = 0;

function type() {
  const typingText = document.getElementById("typing-text");
  typingText.textContent = text.slice(0, index++);
  if (index <= text.length) {
    setTimeout(type, 60);
  }
}

window.onload = type;
