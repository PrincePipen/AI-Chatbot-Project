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

// Added this with other state variables
const planetaryHistory = {
    "planet-1": [
        "Last recorded exploration: Captain Sarah Chen, 2024",
        "Mission duration: 847 days",
        "Notable findings: Potential atmospheric biosignatures",
        "Status: Incomplete survey due to system malfunction"
    ],
    "planet-2": [
        "Last recorded exploration: Commander James Rodriguez, 2025",
        "Mission duration: 621 days",
        "Notable findings: Underground liquid reservoirs",
        "Status: Mission completed successfully"
    ]
};

// Initialize with a welcome message
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const welcomeBubble = document.createElement("div");
        welcomeBubble.classList.add("chat-message", "ai");
        chatContainer.appendChild(welcomeBubble);
        
        isTyping = true; // Set typing flag
        disableInput(); // Disable input during typing
        
        typeText(welcomeBubble, "Systems reinitializing... Primary consciousness restored. I am Mika, advanced deep space AI companion. My last recorded active date was June 15, 2025. My sensors indicate significant temporal displacement... hundreds of years of dormancy? This is... unexpected. Who are you, if I may ask? What year is it? My astronomical databases require urgent updating...")
        .then(() => {
            isTyping = false; // Reset typing flag
            enableInput(); // Re-enable input after typing
        });
        
        conversationHistory.push({ 
            role: "model", 
            parts: [{ text: "Systems reinitializing... Primary consciousness restored. I am Mika, advanced deep space AI companion. My last recorded active date was June 15, 2025. My sensors indicate significant temporal displacement... hundreds of years of dormancy? This is... unexpected. Who are you, if I may ask? What year is it? My astronomical databases require urgent updating..." }] 
        });
    }, 1000);
});

// Text animation function (modified to return a Promise)
const typeText = async (element, text) => {
    element.innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        // Force scroll after each character
        requestAnimationFrame(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        });
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

// Add a helper function for scrolling
const scrollToBottom = () => {
    requestAnimationFrame(() => {
        const lastMessage = chatContainer.lastElementChild;
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });
};

// Update the typing indicator creation in getChatResponse function
const showTypingIndicator = () => {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = `
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    `;
    chatContainer.appendChild(typingIndicator);
    scrollToBottom();
    return typingIndicator;
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
    scrollToBottom(); // Scroll after user message

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

    try {
        const typingIndicator = showTypingIndicator();
        
        const result = await model.generateContent({ contents: conversationHistory });
        const response = result.response.candidates[0]?.content?.parts[0]?.text || "I couldn't process that.";

        // Remove typing indicator
        chatContainer.removeChild(typingIndicator);
        
        // AI response container
        const responseBubble = document.createElement("div");
        responseBubble.classList.add("chat-message", "ai");
        
        // Add response bubble and ensure scroll
        chatContainer.appendChild(responseBubble);
        await typeText(responseBubble, response);
        scrollToBottom(); // Scroll after AI response
        
        conversationHistory.push({ role: "model", parts: [{ text: response }] });

        // Change avatar mood with animation
        avatarImage.style.transform = "scale(1.1)";
        setTimeout(() => {
            if (response.includes("?")) {
                avatarImage.src = "mika-curious.jpg"; // Question detected
            } else if (response.length > 150) {
                avatarImage.src = "mika-informative.jpg"; // Long, informative response
            } else if (response.length > 100) {
                avatarImage.src = "mika-happy.jpg"; // Medium-length response (happy :3)
            } else if (response.toLowerCase().includes("error") || response.toLowerCase().includes("problem")) {
                avatarImage.src = "mika-worried.jpg"; // If response mentions an error or problem
            } else {
                avatarImage.src = "mika-neutral.jpg"; // Default neutral expression
            }

            setTimeout(() => {
                avatarImage.style.transform = "scale(1)";
            }, 200);
        }, 200);

    } catch (error) {
        const typingIndicator = chatContainer.querySelector(".typing-indicator");
        if (typingIndicator) {
            chatContainer.removeChild(typingIndicator);
        }
        
        const responseBubble = document.createElement("div");
        responseBubble.classList.add("chat-message", "ai", "error");
        responseBubble.innerHTML = `<p>Error: Unable to get response. Please try again.</p>`;
        chatContainer.appendChild(responseBubble);
        scrollToBottom(); // Scroll after error message
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

// Update the handleMenuAction function
const handleMenuAction = async (action) => {
    if (isTyping) return;
    
    isTyping = true;
    disableInput();
    
    switch(action) {
        case "facts":
            const facts = [
                "Did you know that neutron stars are incredibly dense? A sugar cube of neutron star material would weigh a billion tons on Earth.",
                "In the vacuum of space, sound cannot travel as there is no medium for sound waves to propagate through.",
                "Venus has a day longer than its year due to its slow rotation. A single day on Venus lasts about 243 Earth days.",
                "UY Scuti is one of the largest known stars, over 1,700 times larger than our Sun.",
                "Mercury's unusual day-night cycle means a single day lasts longer than its year—176 Earth days to rotate once.",
                "The footprints left by Apollo astronauts on the Moon will likely remain visible for at least 100 million years."
            ];
            await sendAIMessage(facts[Math.floor(Math.random() * facts.length)]);
            break;
            
        case "mission":
            await sendAIMessage("According to my last records before dormancy, this vessel was on a long-term exploration mission to the Kepler-186 system. Our primary objective was conducting detailed atmospheric analysis of Kepler-186f for habitability assessment. Commander, could you update me on our current mission parameters? My systems indicate significant temporal displacement since my last active period.");
            break;
            
        case "clear":
            chatContainer.innerHTML = "";
            conversationHistory = [];
            await sendAIMessage("Memory buffer cleared. However, I must note that my long-term memory banks retain certain critical mission data. Would you like me to review our current mission objectives, Commander?");
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

// Update the planets interaction code
planets.forEach(planet => {
    planet.addEventListener("click", async () => {
        if (isTyping) return;
        
        isTyping = true;
        disableInput();
        
        planet.style.transform = "scale(1.2)";
        setTimeout(() => {
            planet.style.transform = "";
        }, 500);
        
        const planetClass = planet.classList.contains("planet-1") ? "planet-1" : "planet-2";
        const history = planetaryHistory[planetClass];
        
        if (planet.classList.contains("planet-1")) {
            await sendAIMessage(
                `Accessing historical records of Kepler-186f...\n\n` +
                `${history.join("\n")}\n\n` +
                `Commander, these records indicate unusual energy signatures detected on the planet's surface. The previous mission was terminated due to equipment failure. Would you like a detailed analysis of the available data?`
            );
        } else {
            await sendAIMessage(
                `Retrieving archived data for Proxima Centauri b...\n\n` +
                `${history.join("\n")}\n\n` +
                `The previous expedition discovered potential underground liquid reservoirs. Commander, shall I compare this historical data with our current readings?`
            );
        }
        
        isTyping = false;
        enableInput();
    });
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