Task Manager App
Overview

This Task Manager App is built using React Native and TypeScript, enabling users to create, edit, complete, and delete tasks efficiently. The application features local data persistence with AsyncStorage and provides a user-friendly interface. It also supports Dark Mode and displays motivational quotes fetched from an external API.
Features
Main Features

    Create Tasks: Add new tasks with a title, description, status ("Pending", "Completed"), and deadline.
    View Tasks: Display all tasks with their details in a scrollable list.
    Edit Tasks: Modify existing tasks by updating their details.
    Delete Tasks: Remove tasks from the list.
    Data Persistence: Store tasks locally using AsyncStorage.

Extra Features (Optional)

    Dark Mode: Switch between light and dark themes.
    Task Search: Filter tasks by name and status.
    Motivational Quotes: Fetch and display a random motivational quote from an external API.

Technologies Used

    React Native: For building the mobile app.
    TypeScript: For type safety and better maintainability.
    React Navigation: For navigating between screens.
    AsyncStorage: For local data storage.
    react-native-modern-datepicker: For date selection.
    @react-native-picker/picker: For dropdown selections.
    Fetch API: For retrieving motivational quotes.

Installation
Clone the Repository

bash

git clone https://github.com/cynthia254/TaskManagementApp.git
cd TaskManagementApp

Install Dependencies

The Task Manager App relies on the following libraries:

    react-native: For building the mobile app.
    react-navigation: For navigating between screens.
    @react-native-picker/picker: For dropdown selections.
    react-native-modern-datepicker: For date selection.
    @react-native-async-storage/async-storage: For local data storage.
    TypeScript: For type safety and better maintainability.

To install these dependencies, ensure you have Node.js installed, then run:

npm install

Run the Application

    For iOS:

npx react-native run-ios

For Android:

npx react-native run-android

Or, if you're using Expo:

    expo start

Usage

    Add a Task: Click the "Add Task" button, enter the task details, and select a due date.
    Edit a Task: Tap on the edit button to modify its details.
    Delete a Task: Tap on the delete button to remove the selected task.
    Toggle Theme: Use the "Toggle Theme" button to switch between light and dark modes.
    Search Tasks: Use the search bar to filter tasks by name and status.

API

The app fetches motivational quotes from the ZenQuotes API. Ensure your internet connection is active to retrieve quotes.

Fetch Quotes Functionality

const fetchQuote = async () => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const randomQuote = data[0]; 
    setQuote({ text: randomQuote.q, author: randomQuote.a });
  } catch (error) {
    console.error('Error fetching quote:', error);
  }
};

Assumptions and Limitations

    The app currently supports basic task management features. Future improvements could include user authentication and more advanced task categorization.
    The motivational quotes feature relies on the availability of the external API. If the API is down, the quotes will not display.

Contributing

    Fork the repository.
    Create a new branch (e.g., git checkout -b feature/YourFeature).
    Make your changes and commit them (e.g., git commit -m 'Add some feature').
    Push to the branch (e.g., git push origin feature/YourFeature).
    Create a new Pull Request.

Evaluation Criteria

    Functionality: The app meets all required features.
    Code Quality: The code is clean, modular, and maintainable, using TypeScript types correctly.
    UI/UX: The app is visually appealing and easy to use, with proper handling of edge cases (e.g., empty task list).
    Performance: The app is performant and free of major bugs or crashes.
    Bonus Features: Dark mode, task search, and motivational quotes integration are included.

    Try It Out

You can also try out the app in an interactive environment using Expo Snack.
https://snack.expo.dev/nqC6xYsGSxRj5OFN7N3qe
