const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../model/model');

const SECRET_KEY = "12345"; // Use a strong secret key

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Model({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(200).json({ message: "Signup Successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("🔍 Login Request:", { email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Model.findOne({ email });
        if (!user) {
            console.log(" User not found!");
            return res.status(400).json({ message: "User not found" });
        }

        console.log(" User Found:", user);

    
        const match = await bcrypt.compare(password, user.password);
        console.log("🔍 Comparing Passwords...");

        if (!match) {
            console.log(" Wrong Password!");
            return res.status(400).json({ message: "Wrong Password" });
        }

        const token = jwt.sign({ id: user._id }, "12345", { expiresIn: "1h" });
        console.log("Login Successful. Token:", token);

        res.json({ message: "Login Successful!", token });

    } catch (error) {
        console.error(" Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
