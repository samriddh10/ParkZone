const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Initialize Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

// Connect to MongoDB
const dbURI = 'mongodb+srv://samriddhkumar20:sam123456@cluster0.vvhfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Update with your MongoDB URI
mongoose.connect(dbURI, {});

const JWT_SECRET = "password123"; // Use a strong secret in production

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create User model
const User = mongoose.model('User', userSchema);

// Define Owner schema
const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Create Owner model
const Owner = mongoose.model('Owner', ownerSchema);

// Export the User and Owner models
module.exports = { User, Owner };

// Body-parser to parse request body
app.use(express.json());

// User Sign-up
app.post('/signup/user', async (req, res) => {
    try {
        const { name, dob, phone, gender, email, password } = req.body;
        const user = new User({ name, dob, phone, gender, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: "Error registering user", details: error.message });
    }
});

// Owner Sign-up
app.post('/signup/owner', async (req, res) => {
    try {
        const { name, dob, phone, gender, email, password } = req.body;
        const owner = new Owner({ name, dob, phone, gender, email, password });
        await owner.save();
        res.status(201).json({ message: "Owner registered successfully", owner });
    } catch (error) {
        res.status(400).json({ error: "Error registering owner", details: error.message });
    }
});

// Login for both User and Owner
app.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Determine whether the login is for "User" or "Owner"
        const model = role === 'User' ? User : Owner;

        // Find the user/owner by email
        const user = await model.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User/Owner not found" });
        }

        // During testing, skip password hashing and compare directly
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Include name, email, role in the JWT payload
        const tokenPayload = {
            id: user._id,
            name: user.name,  // Storing the name
            email: user.email,  // Storing the email
            role: role,  // Storing the role
        };

        // Generate a JWT token
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token, name, email, and role
        res.json({
            message: "Login successful",
            token,
            name: user.name,
            email: user.email,
            role,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});


// Middleware to verify JWT token

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from headers
    if (!token) return res.status(403).json({ error: "No token provided" });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ error: "Failed to authenticate token" });
        req.userId = decoded.id; // Set userId for later use
        next();
    });
};

// Change Password API
app.post("/change-password", verifyToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.userId); // Find user by ID from token
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the old password matches
        if (user.password !== oldPassword) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        // Directly update the password without hashing
        user.password = newPassword;
        await user.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
});



// Profile route
app.get("/profile", verifyToken, async (req, res) => {
    try {
        const { role, email } = req.query; // Get role and email from the request
        let userDetails;

        // Search in the User or Owner collection based on the role
        if (role === 'User') {
            userDetails = await User.findOne({ email }).select('name email dob role createdAt');
        } else if (role === 'Owner') {
            userDetails = await Owner.findOne({ email }).select('name email dob role createdAt');
        }

        if (!userDetails) {
            return res.status(404).json({ error: "User/Owner not found" });
        }

        // Return user details
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
