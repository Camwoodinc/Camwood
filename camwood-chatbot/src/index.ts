// This is the entry point of the chatbot application.
// Import necessary modules and libraries
import express from 'express';

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample route for the chatbot
app.post('/chat', (req, res) => {
    const userMessage = req.body.message;
    // Here you would add your chatbot logic
    const botResponse = `You said: ${userMessage}`;
    res.json({ response: botResponse });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Chatbot server is running on http://localhost:${PORT}`);
});