// script.js code

import { model } from "./mainmodule.js";

// DOM Elements
const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const avatarImage = document.querySelector("#avatar-img");
const menuToggle = document.querySelector(".menu-toggle");
const interactiveMenu = document.querySelector(".interactive-menu");
const menuItems = document.querySelectorAll(".menu-item");
const planets = document.querySelectorAll(".planet");

// State variables
let conversationHistory = [];
const MEMORY_LIMIT = 10;
let isMenuOpen = false;

// Initialize with a welcome message
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        sendAIMessage("Hello! I'm Mika, your AI space mission companion. How can I assist you today?");
    }, 1000);
});

// Function to auto-scroll to the latest message
const autoScrollChat = () => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

// Text animation function
const typeText = async (element, text) => {
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 20));
        autoScrollChat(); // Auto-scroll while typing
    }
};

// Get AI response
const getChatResponse = async () => {
    const userText = chatInput.value.trim();
    if (!userText) return;

    // Display user message
    const userBubble = document.createElement("div");
    userBubble.classList.add("chat-message", "user");
    userBubble.innerHTML = `<p>${userText}</p>`;
    chatContainer.appendChild(userBubble);
    autoScrollChat();

    // Clear input after sending
    chatInput.value = "";

    // Update history
    conversationHistory.push({ role: "user", parts: [{ text: userText }] });
    if (conversationHistory.length > MEMORY_LIMIT * 2) {
        conversationHistory = conversationHistory.slice(-MEMORY_LIMIT * 2);
    }

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("chat-message", "ai", "typing-indicator");
    typingIndicator.innerHTML = `<p>Mika is thinking<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>`;
    chatContainer.appendChild(typingIndicator);
    autoScrollChat();

    // Animate typing dots
    let dotIndex = 0;
    const dots = typingIndicator.querySelectorAll(".dot");
    const typingAnimation = setInterval(() => {
        dots.forEach((dot, i) => {
            dot.style.opacity = i === dotIndex % 3 ? "1" : "0.3";
        });
        dotIndex++;
    }, 300);

    try {
        // AI response container
        const responseBubble = document.createElement("div");
        responseBubble.classList.add("chat-message", "ai");

        const result = await model.generateContent({ contents: conversationHistory });
        const response = result.response.candidates[0]?.content?.parts[0]?.text || "I couldn't process that.";

        // Remove typing indicator
        clearInterval(typingAnimation);
        chatContainer.removeChild(typingIndicator);

        // Add response bubble
        chatContainer.appendChild(responseBubble);
        await typeText(responseBubble, response);
        autoScrollChat();

        conversationHistory.push({ role: "model", parts: [{ text: response }] });

        // Change avatar mood with animation
        avatarImage.style.transform = "scale(1.1)";
        setTimeout(() => {
            avatarImage.src = response.includes("?") ? "mika-curious.png" :
                              response.length > 100 ? "mika-happy.png" : "mika-neutral.png";
            setTimeout(() => avatarImage.style.transform = "scale(1)", 200);
        }, 200);

    } catch (error) {
        // Remove typing indicator
        clearInterval(typingAnimation);
        chatContainer.removeChild(typingIndicator);

        const responseBubble = document.createElement("div");
        responseBubble.classList.add("chat-message", "ai", "error");
        responseBubble.innerHTML = `<p>Error: Unable to get response. Please try again.</p>`;
        chatContainer.appendChild(responseBubble);
        autoScrollChat();
    }
};

// Function to send AI messages with auto-scrolling
const sendAIMessage = (text) => {
    const aiBubble = document.createElement("div");
    aiBubble.classList.add("chat-message", "ai");
    chatContainer.appendChild(aiBubble);
    
    typeText(aiBubble, text);
    conversationHistory.push({ role: "model", parts: [{ text }] });
    autoScrollChat();
};

// Interactive features
const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    interactiveMenu.classList.toggle("active", isMenuOpen);
    menuToggle.style.transform = isMenuOpen ? "rotate(90deg)" : "rotate(0)";
};

const handleMenuAction = (action) => {
    switch(action) {
        case "facts":
            sendAIMessage("Did you know? Neutron stars are incredibly dense—a sugar cube of one would weigh a billion tons!");
            break;
        case "mission":
            sendAIMessage("Current mission status: All systems nominal. We are in orbit around Kepler-186f.");
            break;
        case "systems":
            sendAIMessage("Ship systems status: Life support at 98%, power reserves at 76%, no critical issues detected.");
            break;
        case "clear":
            chatContainer.innerHTML = "";
            conversationHistory = [];
            sendAIMessage("Chat history cleared. How else can I assist you?");
            break;
    }
    toggleMenu();
};

// Interactive space environment
const createStar = () => {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    document.querySelector(".space-environment").appendChild(star);
    setTimeout(() => star.remove(), 4000);
};

// Periodically create shooting stars
setInterval(createStar, 8000);

// Interactive planets
planets.forEach(planet => {
    planet.addEventListener("click", () => {
        planet.style.transform = "scale(1.2)";
        setTimeout(() => planet.style.transform = "", 500);
        sendAIMessage("This is a fascinating exoplanet with potential for habitability.");
    });
});

// Avatar interactive features
avatarImage.addEventListener("click", () => {
    const moods = ["neutral", "happy", "curious"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    
    avatarImage.style.transform = "scale(1.2) rotate(10deg)";
    setTimeout(() => {
        avatarImage.src = `mika-${randomMood}.png`;
        setTimeout(() => avatarImage.style.transform = "", 300);
    }, 300);
    
    sendAIMessage("Hello! Need any assistance with your space mission?");
});

// Event listeners
sendButton.addEventListener("click", getChatResponse);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        getChatResponse();
    }
});

menuToggle.addEventListener("click", toggleMenu);
menuItems.forEach(item => item.addEventListener("click", () => handleMenuAction(item.dataset.action)));

document.addEventListener("click", (e) => {
    if (isMenuOpen && !e.target.closest(".interactive-menu") && !e.target.closest(".menu-toggle")) {
        toggleMenu();
    }
});
