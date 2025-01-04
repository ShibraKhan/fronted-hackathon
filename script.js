// function for click to active page
const navLinks = document.querySelectorAll('.left-nav li');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');
  });
});
let currentIndex = 0;

// Function to update the slider position
function updateSliderPosition() {
    const cards = document.querySelectorAll(".card");
    const car = document.querySelector(".car");
    const totalCards = cards.length;

    // Ensure the correct card is displayed
    car.style.transform = `translateX(${-currentIndex * 100}%)`;

    // Looping functionality
    if (currentIndex >= totalCards) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalCards - 1;
}

// Move to the next slide
function nextSlide() {
    const cards = document.querySelectorAll(".card");
    currentIndex = (currentIndex + 1) % cards.length; // Go to the next card
    updateSliderPosition();
}

// Move to the previous slide
function prevSlide() {
    const cards = document.querySelectorAll(".card");
    currentIndex = (currentIndex - 1 + cards.length) % cards.length; // Go to the previous card
    updateSliderPosition();
}

// Function to handle the "Shop Now" button
function addToList() {
    const message = document.getElementById("message");

    // Show the "Item added" message temporarily
    message.style.visibility = "visible";
    setTimeout(() => {
        message.style.visibility = "hidden";
    }, 2000); // Hide after 2 seconds
}

// Add event listeners to the arrow buttons
document.querySelector(".next-button").addEventListener("click", nextSlide);
document.querySelector(".prev-button").addEventListener("click", prevSlide);


// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM Elements
const authForm = document.getElementById("auth-form");

// Form Submission Handler
authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message").value;

    // Attempt to register the user
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert(`Welcome, ${name}! Your message has been received.`);
            console.log("Message:", message);
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                // If user exists, log them in
                auth.signInWithEmailAndPassword(email, password)
                    .then(() => {
                        alert(`Welcome back, ${name}! Your message has been received.`);
                        console.log("Message:", message);
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            } else {
                alert(error.message);
            }
        });
});
