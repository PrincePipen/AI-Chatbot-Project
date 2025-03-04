 Mika AI - Space Companion

Abstract

Mika AI - Space Companion

✨ It's an interactive AI chatbot where you play as the Space Commander and Mika is your slightly confused, but very loyal, AI sidekick. Reactivated after centuries of dormancy, Mika provides mission info, space facts, and a whole lot of quirky charm ✨

Overview

Mika AI is a web-based interactive AI chatbot designed to simulate a conversation with an AI companion aboard a spaceship. The project utilizes HTML, CSS, and JavaScript, integrating the Google Generative AI API to provide intelligent and context-aware responses. The user interface features a space-themed environment with animations and an interactive menu.

Features

*   Immersive Space Environment: The UI includes animated stars, planets, and other space elements to create an engaging visual experience.
*   Unique AI Personality: Mika has a defined personality, believing the user is the Space Commander from a past mission.
*   Interactive Chat Interface: The chatbox allows users to send messages to Mika and receive responses generated by the Google Generative AI API.
*   Google Generative AI Integration: Uses the `learnlm-1.5-pro-experimental` model for generating chat responses.
*   Interactive Menu: Provides quick access to predefined actions like retrieving space facts, mission information, or clearing the chat.
*   Typing Indicator: Visual feedback indicating when Mika is processing a response.
*   Dynamic Avatar: Mika's avatar changes based on the type of response being given.
*   Planetary Exploration: Click on the planets in the background to get historical records

Technologies Used

*   HTML
*   CSS
*   JavaScript (ES Modules)
*   Google Generative AI API

Setup Instructions

1.  Clone the Repository:
    ```
    git clone [repository-url]
    cd [repository-directory]
    ```

2.  Obtain an API Key:
    *   Sign up for the Google Generative AI API at [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey).
    *   Replace `"AIzaSyC8d3slcL0wdnXi3yJ7RR8YbcausVQ5NbQ"` in `mainmodule.js` with your actual API key.
        ```
        const API_KEY = "YOUR_API_KEY";
        ```

3.  Open `index.html` in your browser:
    *   The project should now be running, and you can interact with Mika AI.

Project Structure

Mika-AI-Space-Companion/
├── index.html # Main HTML file
├── style.css # CSS stylesheet for styling
├── script.js # Main JavaScript file for chatbot logic
├── mainmodule.js # JavaScript module for Google Generative AI integration
├── mika-neutral.jpg # Default avatar image
├── mika-curious.jpg # Avatar image when curious
├── mika-happy.jpg # Avatar image when happy
├── mika-informative.jpg # Avatar image when informative
├── mika-worried.jpg # Avatar image when worried


Code Highlights

*   `index.html`: Sets up the basic structure of the webpage, including the space environment, chatbot container, and interactive menu.
*   `style.css`: Provides the styling for the various elements, creating the space-themed visual experience.
*   `mainmodule.js`: Contains the core logic for interacting with the Google Generative AI API and defining Mika's personality.
*   `script.js`: Handles user input, updates the chat interface, and manages the interaction with the AI model.

How to Play

1.  Type in the Chatbox: Ask Mika questions about space, the mission, or anything else you can think of.
2.  Use the Interactive Menu: Click "Space Facts" to get a random space fact, "Mission Info" to learn about the mission, or "Clear Chat" to reset the conversation.
3.  Click the Planets: Each planet has stored mission data. Click to unlock.
