Mika AI - Space Companion


Abstract

Embark on a journey through the cosmos with Mika, your advanced AI space companion! Mika is designed to simulate an immersive experience, casting you as Commander Hirotaka on a deep space mission.  Reactivated after a long dormancy, Mika retains a loyal, slightly disoriented, and endearingly formal personality.  Engage with Mika to explore space facts, mission information, and ship systems, all while navigating the nuances of interacting with an AI that believes you are the commander from a bygone era. Be prepared for a unique blend of nostalgia, space exploration, and a touch of melancholy as you uncover the mysteries of your mission together.

Overview

This project features an interactive AI chatbot named Mika, designed with a unique personality and purpose. Mika is portrayed as an AI companion aboard a spaceship, recently awakened from a long period of dormancy. The chatbot is built using HTML, CSS, and JavaScript, leveraging the Google Generative AI API for intelligent responses.

Features

*   Immersive Space Environment: A visually appealing space-themed interface with animated stars, planets, and a comet.
*   Unique AI Personality: Mika embodies a distinct personality, loyal to the (supposedly) returning Commander Hirotaka, providing a nostalgic and engaging interaction.
*   Interactive Chat Interface: A dynamic chatbox that allows users to communicate with Mika, receiving context-aware responses.
*   Google Generative AI Integration: Utilizes the `learnlm-1.5-pro-experimental` model from Google's Generative AI to generate realistic and relevant responses.
*   Menu-Driven Interactions: An interactive menu providing quick access to information about space facts, mission details, and ship systems.
*   Dynamic Avatar: Mika's avatar changes expression based on the content of the response, enhancing the interactive experience.
*   Conversation History: Maintains a limited memory of the conversation to provide contextually relevant responses.

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


Code Highlights

*   `index.html`: Sets up the basic structure of the webpage, including the space environment, chatbot container, and interactive menu.
*   `style.css`: Provides the styling for the various elements, creating the space-themed visual experience.
*   `mainmodule.js`: Contains the core logic for interacting with the Google Generative AI API and defining Mika's personality.
*   `script.js`: Handles user input, updates the chat interface, and manages the interaction with the AI model.

Acknowledgments

*   Google Generative AI team for providing the powerful language model.
*   Inspiration from science fiction and space exploration themes.
