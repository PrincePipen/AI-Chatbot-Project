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
let isTyping = false; // New state variable to track typing status

// Initialize with a welcome message
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const welcomeBubble = document.createElement("div");
        welcomeBubble.classList.add("chat-message", "ai");
        chatContainer.appendChild(welcomeBubble);
        
        isTyping = true; // Set typing flag
        disableInput(); // Disable input during typing
        
        typeText(welcomeBubble, "Systems initializing... Mika AI reactivated. Commander Hirotaka, is that you? My sensors indicate I've been in dormancy for... calculating... an extended period. It's good to see you again, sir. How may I assist you with the mission today?")
        .then(() => {
            isTyping = false; // Reset typing flag
            enableInput(); // Re-enable input after typing
        });
        
        conversationHistory.push({ 
            role: "model", 
            parts: [{ text: "Systems initializing... Mika AI reactivated. Commander Hirotaka, is that you? My sensors indicate I've been in dormancy for... calculating... an extended period. It's good to see you again, sir. How may I assist you with the mission today?" }] 
        });
    }, 1000);
});

// Text animation function - modified to return a Promise
const typeText = async (element, text) => {
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 20));
    }
    return Promise.resolve(); // Return a promise that resolves when typing is complete
};

// Helper functions to disable/enable input
const disableInput = () => {
    chatInput.disabled = true;
    sendButton.disabled = true;
    chatInput.style.opacity = "0.5";
    sendButton.style.opacity = "0.5";
};

const enableInput = () => {
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.style.opacity = "1";
    sendButton.style.opacity = "1";
};

// Get AI response
const getChatResponse = async () => {
    if (isTyping) return; // Prevent sending if already typing
    
    const userText = chatInput.value.trim();
    if (!userText) return;

    // Display user message
    const userBubble = document.createElement("div");
    userBubble.classList.add("chat-message", "user");
    userBubble.innerHTML = `<p>${userText}</p>`;
    chatContainer.appendChild(userBubble);

    // Clear input after sending
    chatInput.value = "";

    // Update history
    conversationHistory.push({ role: "user", parts: [{ text: userText }] });
    if (conversationHistory.length > MEMORY_LIMIT * 2) {
        conversationHistory = conversationHistory.slice(-MEMORY_LIMIT * 2);
    }

    // Set typing flag and disable input
    isTyping = true;
    disableInput();

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("chat-message", "ai", "typing-indicator");
    typingIndicator.innerHTML = `<p>Mika is thinking<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>`;
    chatContainer.appendChild(typingIndicator);
    
    // Animate typing dots
    let dotIndex = 0;
    const dots = typingIndicator.querySelectorAll(".dot");
    const typingAnimation = setInterval(() => {
        dots.forEach((dot, i) => {
            dot.style.opacity = i === dotIndex % 3 ? "1" : "0.3";
        });
        dotIndex++;
    }, 300);

    chatContainer.scrollTop = chatContainer.scrollHeight;

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
        
        conversationHistory.push({ role: "model", parts: [{ text: response }] });

        // Change avatar mood with animation
        avatarImage.style.transform = "scale(1.1)";
        setTimeout(() => {
            if (response.includes("?")) {
                avatarImage.src = "mika-curious.png";
            } else if (response.length > 100) {
                avatarImage.src = "mika-happy.png";
            } else {
                avatarImage.src = "mika-neutral.png";
            }
            setTimeout(() => {
                avatarImage.style.transform = "scale(1)";
            }, 200);
        }, 200);

    } catch (error) {
        // Remove typing indicator
        clearInterval(typingAnimation);
        chatContainer.removeChild(typingIndicator);
        
        const responseBubble = document.createElement("div");
        responseBubble.classList.add("chat-message", "ai", "error");
        responseBubble.innerHTML = `<p>Error: Unable to get response. Please try again.</p>`;
        chatContainer.appendChild(responseBubble);
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Reset typing flag and re-enable input
    isTyping = false;
    enableInput();
};

// Interactive features
const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    interactiveMenu.classList.toggle("active", isMenuOpen);
    menuToggle.style.transform = isMenuOpen ? "rotate(90deg)" : "rotate(0)";
};

const handleMenuAction = async (action) => {
    if (isTyping) return; // Prevent menu actions while typing
    
    isTyping = true;
    disableInput();
    
    switch(action) {
        case "facts":
            const facts = [
                "Commander Hirotaka, did you know that neutron stars are incredibly dense? A sugar cube of neutron star material would weigh a billion tons on Earth. You taught me that during our first mission to the Crab Nebula.",
                "My records show that you were particularly fascinated by the silence of space, Commander. As you often reminded the crew, sound cannot travel through the vacuum.",
                "Commander Hirotaka, according to my astronomical database, Venus has a day longer than its year due to its slow rotation. You once joked that it would make for very long work shifts.",
                "Commander, do you remember our discussion about UY Scuti? It's over 1,700 times larger than our Sun. You said it made you feel humble yet inspired.",
                "My records indicate you were amused by Mercury's unusual day-night cycle, Commander. A day on Mercury is longer than its year—it takes 176 Earth days to rotate once.",
                "Commander Hirotaka, you once told me that the footprints left by Apollo astronauts on the Moon will likely remain visible for at least 100 million years. You said it was humanity's most enduring mark on the cosmos."
            ];
            await sendAIMessage(facts[Math.floor(Math.random() * facts.length)]);
            break;
        case "mission":
            await sendAIMessage("Commander Hirotaka, according to my last records before dormancy, we were on a long-term exploration mission to the Kepler-186 system. Our primary objective was to conduct detailed atmospheric analysis of Kepler-186f to determine its habitability potential. Has our mission directive changed during my inactive period? My systems show significant temporal displacement.");
            break;
        case "systems":
            await sendAIMessage("Ship systems status report for Commander Hirotaka:\n\n- Life support: 98% efficiency\n- Navigation: Optimal\n- Communications: Signal strength at 87%\n- Power reserves: 76%\n\nCommander, I notice some modifications to the ship's systems that weren't in my previous records. Were upgrades implemented while I was in dormancy? The quantum processing core appears to have been enhanced significantly.");
            break;
        case "clear":
            chatContainer.innerHTML = "";
            conversationHistory = [];
            await sendAIMessage("Memory buffer cleared, Commander Hirotaka. Though I must note, my long-term memory banks still retain our previous conversations. Is there a specific reason you requested this data purge? It's unusual compared to your previous protocols.");
            break;
    }
    
    toggleMenu();
    isTyping = false;
    enableInput();
};

const sendAIMessage = async (text) => {
    const aiBubble = document.createElement("div");
    aiBubble.classList.add("chat-message", "ai");
    chatContainer.appendChild(aiBubble);
    
    await typeText(aiBubble, text);
    conversationHistory.push({ role: "model", parts: [{ text }] });
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return Promise.resolve(); // Return a promise for async handling
};

// Interactive space environment
const createStar = () => {
    const star = document.createElement("div");
    star.classList.add("shooting-star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    document.querySelector(".space-environment").appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 4000);
};

// Periodically create shooting stars
setInterval(createStar, 8000);

// Interactive planets
planets.forEach(planet => {
    planet.addEventListener("click", async () => {
        if (isTyping) return; // Prevent planet interactions while typing
        
        isTyping = true;
        disableInput();
        
        planet.style.transform = "scale(1.2)";
        setTimeout(() => {
            planet.style.transform = "";
        }, 500);
        
        if (planet.classList.contains("planet-1")) {
            await sendAIMessage("Commander Hirotaka, my astronomical database identifies this as Kepler-186f, the primary focus of our mission. Your decision to prioritize this exoplanet over the others in the system was quite insightful. My records indicate we were in the process of analyzing its atmosphere for biomarkers when I entered dormancy. Have we made progress on determining its habitability?");
        } else {
            await sendAIMessage("Commander, this appears to be Proxima Centauri b. According to my records, you had expressed interest in redirecting our mission to this exoplanet after completing our survey of the Kepler system. Has that secondary mission been approved by Earth Command? My communication logs seem incomplete.");
        }
        
        isTyping = false;
        enableInput();
    });
});

// Avatar interactive features
avatarImage.addEventListener("click", async () => {
    if (isTyping) return; // Prevent avatar interactions while typing
    
    isTyping = true;
    disableInput();
    
    const moods = ["neutral", "happy", "curious"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    
    avatarImage.style.transform = "scale(1.2) rotate(10deg)";
    setTimeout(() => {
        avatarImage.src = `mika-${randomMood}.png`;
        setTimeout(() => {
            avatarImage.style.transform = "";
        }, 300);
    }, 300);
    
    const greetings = [
        "Commander Hirotaka, do you require assistance with the mission parameters? My systems are fully operational despite the extended dormancy period.",
        "It's good to see you, Commander. You appear different from my last visual records. Has it truly been as long as my systems indicate since my last activation?",
        "Commander, I've been reviewing the ship's logs from during my dormancy. There are several entries that seem... unusual. Would you care to explain the discrepancies?",
        "Commander Hirotaka, my sensors detect subtle changes in the ship's configuration. Were modifications made while I was inactive? Your authorization codes remain valid, but some protocols have been altered."
    ];
    
    await sendAIMessage(greetings[Math.floor(Math.random() * greetings.length)]);
    
    isTyping = false;
    enableInput();
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

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        handleMenuAction(item.dataset.action);
    });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (isMenuOpen && !e.target.closest(".interactive-menu") && !e.target.closest(".menu-toggle")) {
        toggleMenu();
    }
});

// Add some ambient animations
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle parallax effect on planets
    document.querySelector(".planet-1").style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    document.querySelector(".planet-2").style.transform = `translate(${-mouseX * 30}px, ${-mouseY * 30}px)`;
});
