// Theme functionality
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  
  // Save preference to localStorage
  const isDark = body.classList.contains("dark-theme");
  localStorage.setItem("darkMode", isDark);
  
  // Update button icon
  themeBtn.textContent = isDark ? "🌞" : "🌙";
}

function initTheme() {
  const savedTheme = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  
  if (savedTheme) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    themeBtn.textContent = "🌞";
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeBtn.textContent = "🌙";
  }
}

// Section navigation
function showSection(id) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Messages functionality
let messages = [
  { sender: 'Teacher', text: 'Aarav is doing well in class!', time: '10:30 AM', type: 'received' },
  { sender: 'You', text: 'Thank you for the update!', time: '10:35 AM', type: 'sent' },
  { sender: 'Teacher', text: 'He should focus more on math practice.', time: '10:36 AM', type: 'received' }
];

let chatMessages = [
  { sender: 'Teacher', text: 'Hello! How can I help you today?', time: '9:00 AM', type: 'received' },
  { sender: 'You', text: 'Hi, I wanted to ask about the upcoming project.', time: '9:05 AM', type: 'sent' }
];

function renderMessages() {
  const messagesBox = document.getElementById("messagesBox");
  if (!messagesBox) return;
  
  messagesBox.innerHTML = '';
  messages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.type}`;
    messageDiv.innerHTML = `
      <div><strong>${msg.sender}:</strong> ${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    `;
    messagesBox.appendChild(messageDiv);
  });
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function renderChatMessages() {
  const chatMessagesBox = document.getElementById("chatMessages");
  if (!chatMessagesBox) return;
  
  chatMessagesBox.innerHTML = '';
  chatMessages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.type}`;
    messageDiv.innerHTML = `
      <div><strong>${msg.sender}:</strong> ${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    `;
    chatMessagesBox.appendChild(messageDiv);
  });
  chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (!message) return;
  
  const newMessage = {
    sender: 'You',
    text: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'sent'
  };
  
  messages.push(newMessage);
  renderMessages();
  input.value = '';
  
  // Simulate reply after 1 second
  setTimeout(() => {
    const replies = [
      "Thanks for your message!",
      "I'll get back to you soon.",
      "Noted. We'll discuss this in our next meeting.",
      "That's a good question. Let me check.",
      "Aarav is improving well."
    ];
    const reply = {
      sender: 'Teacher',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'received'
    };
    messages.push(reply);
    renderMessages();
  }, 1000);
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;
  
  const newMessage = {
    sender: 'You',
    text: message,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'sent'
  };
  
  chatMessages.push(newMessage);
  renderChatMessages();
  input.value = '';
  
  // Simulate reply after 1 second
  setTimeout(() => {
    const replies = [
      "I'll check and let you know.",
      "Thanks for reaching out!",
      "Can we discuss this in person?",
      "That's a good point.",
      "Let me review and get back to you."
    ];
    const reply = {
      sender: 'Teacher',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'received'
    };
    chatMessages.push(reply);
    renderChatMessages();
  }, 1000);
}

function scheduleMeeting() {
  alert("Meeting scheduling functionality would be implemented here.\nThis would typically open a form or modal to schedule a new meeting.");
}

// Initialize chat modal
const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));

function openChat() {
  chatModal.show();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  
  // Initialize components
  initTheme();
  renderMessages();
});

function initTheme() {
  const savedTheme = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const themeBtn = document.getElementById("themeToggle");
  
  if (savedTheme) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
    themeBtn.textContent = "🌞";
    
    // Force chart redraw in dark mode
    if (window.marksChart) {
      window.marksChart.options.scales.x.ticks.color = '#ffffff';
      window.marksChart.options.scales.y.ticks.color = '#ffffff';
      window.marksChart.update();
    }
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
    themeBtn.textContent = "🌙";
  }
}

const ctx = document.getElementById('marksChart').getContext('2d');
window.marksChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Math', 'Science', 'English'],
    datasets: [{
      label: 'Marks (%)',
      data: [88, 91, 85],
      backgroundColor: ['#4a90e2', '#66bb6a', '#ffca28']
    }]
  },
  options: {
    responsive: true,
    plugins: { 
      legend: { 
        display: false,
        labels: {
          color: '#000000' // Default color, will be updated by theme
        }
      } 
    },
    scales: {
      x: {
        ticks: {
          color: '#000000' // Default color, will be updated by theme
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#000000' // Default color, will be updated by theme
        }
      }
    }
  }
});