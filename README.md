Multi-Step Employee Registration Form
A modern, multi-step employee registration wizard built with semantic HTML5, CSS3, and native vanilla JavaScript. It features real-time validation, dynamic stepper animations, user IP location detection, and deep integration with the intl-tel-input plugin for international phone verification.

🚀 Key Features
Multi-Step UI Wizard: Splits a long, complex registration process into 4 digestible steps (Personal, Contact, Emergency, and Role Preferences) to prevent user fatigue.

Smart Phone Validation: Embedded with the intl-tel-input library to render interactive flag selectors, dynamic placeholders, and automated country-code prefixes.

Automated IP Location: Detects user location via ipapi.co on initial load to automatically pre-select their home country's flag and dialing code.

Strict Real-Time Validation: * Validates text values, email syntax, and options instantly on blur.

Age restriction block enforces a strict minimum limit of 18 years old.

Ties straight into intl-tel-input APIs to run comprehensive structural validation based on target country rules.

Dynamic Review Panel: Generates a summary dashboard showing exact submission payloads instantly upon completion.

📂 File Architecture
index.html – Core structure containing form step sections, the navigation block, error containers, and final review panels.

style.css – Handles step transitions, responsive layouts (.row-2), validation error triggers, and overrides for plugin styling hooks (e.g., .iti).

script.js – Stores core app configurations: multi-step state tracking, step validation criteria, navigation routines, and plugin handlers.
