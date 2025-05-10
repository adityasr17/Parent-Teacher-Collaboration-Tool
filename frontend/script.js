function showSection(id) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function sendMessageFromModal() {
  const input = document.getElementById('messageInputModal');
  const messagesBox = document.getElementById('messagesBox');
  const message = input.value.trim();
  if (!message) return;

  const div = document.createElement('div');
  div.textContent = "You: " + message;
  messagesBox.appendChild(div);
  input.value = '';
  messagesBox.scrollTop = messagesBox.scrollHeight;

  const modal = bootstrap.Modal.getInstance(document.getElementById('messageModal'));
  modal.hide();
}

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");

  const isDark = body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme", !isDark);

  themeBtn.textContent = isDark ? "🌞" : "🌙";
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);
