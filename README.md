 Mika AI - Space Companion

Abstract

✨ Mika AI is my fun side project where you become a Space Commander, and Mika is your AI companion. Reactivated after centuries, Mika offers space facts, mission info, and a healthy dose of quirky AI charm. Dive into a retro-future conversation and see what it's like to command a spaceship, with Mika by your side 🚀

Overview

Mika AI is a web-based interactive AI chatbot, simulating a conversation with an AI companion on a spaceship. It's built with HTML, CSS, and JavaScript, and uses the Google Generative AI API for intelligent responses. Enjoy a space-themed UI with animations and an interactive menu.

Features

*   Immersive Space Environment: Animated stars, planets, and space visuals create an engaging experience.
*   Interactive Chat Interface: Send messages and receive AI-generated responses.
*   Google Generative AI Integration: Uses the `learnlm-1.5-pro-experimental` model.
*   Interactive Menu: Quick access to space facts, mission information, and chat clearing.
*   Dynamic Avatar: Mika's expression changes based on the response type.
*   Planetary Exploration: Click planets to reveal historical records and unlock mission data!
*   Voice Synthesis: Mika speaks the answers (toggleable) using ElevenLabs API.

Technologies Used

*   HTML
*   CSS
*   JavaScript (ES Modules)
*   Google Generative AI API
*   ElevenLabs API (for Voice Synthesis)

Setup Instructions

1.  Clone the Repository:
    ```
    git clone [repository-url]
    cd [repository-directory]
    ```

2.  Obtain API Keys:
    *   Google Generative AI API: Sign up at [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey) and replace `"AIzaSyC8d3slcL0wdnXi3yJ7RR8YbcausVQ5NbQ"` in `mainmodule.js`.
        ```
        const API_KEY = "YOUR_GOOGLE_API_KEY";
        ```
    *   ElevenLabs API: Sign up at [https://elevenlabs.io/](https://elevenlabs.io/) and replace `"sk_31bd768b5d01a3ad2a7c602448500ef77c4a33b76c810fb0"` in `script.js`.
        ```
        const VOICE_API_KEY = "YOUR_ELEVENLABS_API_KEY";
        ```

3.  Open `index.html` in your browser:
    *   Mika AI should now be running

Project Structure

Mika-AI-Space-Companion/
├── index.html # Main HTML file
├── style.css # CSS stylesheet
├── script.js # Main chatbot logic
├── mainmodule.js # Google Generative AI integration
├── mika-neutral.jpg # Default avatar
├── mika-curious.jpg # Curious avatar
├── mika-happy.jpg # Happy avatar
├── mika-informative.jpg # Informative avatar
├── mika-worried.jpg # Worried avatar


Code Highlights

*   `index.html`: Basic webpage structure, space environment, chatbot container, interactive menu.
*   `style.css`: Styling for the space theme and UI elements.
*   `mainmodule.js`: Core logic for the Google Generative AI API and Mika's personality.  Important for setting the system prompt.
*   `script.js`: Handles user input, updates the chat interface, manages AI interaction, voice synthesis, and planetary exploration.

How to Play

1.  Type in the Chatbox: Ask Mika questions about space, the mission, or anything else.
2.  Use the Menu: Get space facts, mission info, or clear the chat.
3.  Click Planets: Unlock historical mission data about explored planets!
4.  Toggle Voice: Click the speaker icon to enable or disable voice output.
