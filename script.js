// Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Your Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get DOM elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const rememberMe = document.getElementById('remember-me');
const errorMessage = document.getElementById('error-message');

// Show error message
function showError(message) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Handle registration
registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    try {
        hideError();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // If remember me is checked, save the email
        if (rememberMe.checked) {
            localStorage.setItem('rememberedEmail', email);
        }

        // Redirect or handle successful registration
        alert('Registration successful!');
        // window.location.href = 'dashboard.html'; // Uncomment to redirect
    } catch (error) {
        showError(error.message);
    }
});

// Handle login
loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    try {
        hideError();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // If remember me is checked, save the email
        if (rememberMe.checked) {
            localStorage.setItem('rememberedEmail', email);
        }

        // Redirect or handle successful login
        alert('Login successful!');
        // window.location.href = 'dashboard.html'; // Uncomment to redirect
    } catch (error) {
        showError(error.message);
    }
});

// Check for remembered email
const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
    emailInput.value = rememberedEmail;
    rememberMe.checked = true;
}