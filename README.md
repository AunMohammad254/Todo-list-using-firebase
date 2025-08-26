# NeonTodo - Futuristic Task Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

<p align="center">
  <img src="assets/icon-moon.svg" alt="NeonTodo Logo" width="100" height="100">
</p>

A sleek, futuristic todo list application with a neon cyberpunk aesthetic. NeonTodo helps you manage your tasks with style, featuring real-time synchronization across devices using Firebase Firestore.

![NeonTodo Screenshot](https://via.placeholder.com/800x450.png?text=NeonTodo+Screenshot)

## 🌟 Live Demo

Check out the live demo of NeonTodo: [NeonTodo Live Demo](https://neon-todo-list.netlify.app/)

## ✨ Features

- **Futuristic Neon UI**: Immersive cyberpunk-inspired design with neon glow effects
- **Real-time Synchronization**: Instant updates across all connected devices via Firebase
- **Task Management**: Add, edit, delete, and mark tasks as completed
- **Filtering Options**: View all tasks, active tasks, or completed tasks
- **Dark/Light Theme Toggle**: Switch between dark and light modes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Animated Elements**: Engaging animations for better user experience

## 🚀 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: Firebase Firestore
- **Analytics**: Firebase Analytics
- **Server**: Node.js HTTP Server
- **Fonts**: Google Fonts (Orbitron, Rajdhani)
- **Icons**: Custom SVG icons

## 📋 Prerequisites

- Node.js (v12.0.0 or higher)
- npm (v6.0.0 or higher)
- Firebase account

## 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/neontodo.git
cd neontodo
```

2. **Set up Firebase**

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Firestore database
- Get your Firebase configuration
- Update the `firebase.js` file with your configuration

```javascript
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

3. **Install dependencies**

```bash
npm install
```

4. **Start the server**

```bash
node server.js
```

5. **Open the application**

Open your browser and navigate to `http://localhost:8000`

## 🎮 Usage

### Adding a Task

1. Type your task in the input field
2. Press Enter or click the '+' button

### Completing a Task

Click the circular checkbox next to a task to mark it as completed. The task will be visually marked with a neon glow effect.

### Editing a Task

Double-click on a task to edit its content. Press Enter to save changes.

### Deleting a Task

Hover over a task and click the 'x' button that appears.

### Filtering Tasks

Use the filter buttons at the bottom of the list:
- **All**: Show all tasks
- **Active**: Show only uncompleted tasks
- **Completed**: Show only completed tasks

### Clearing Completed Tasks

Click the "Clear Completed" button to remove all completed tasks.

### Toggling Theme

Click the moon/sun icon in the top-right corner to switch between dark and light themes.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style Guidelines

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design is maintained

## 📁 Project Structure

```
├── assets/               # Images and SVG icons
├── .vscode/              # VS Code configuration
├── firebase.js           # Firebase configuration
├── index.html            # Main HTML file
├── script.js             # Application logic
├── server.js             # Node.js server
├── style.css             # CSS styles
└── README.md             # Project documentation
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/) for the real-time database
- [Google Fonts](https://fonts.google.com/) for Orbitron and Rajdhani fonts
- Inspiration from cyberpunk aesthetics and neon designs

---

<p align="center">Made with ❤️ and lots of neon glow</p>