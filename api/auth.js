const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        })

        await newUser.save();
        res.status(201).json({ msg: "User Register Successfully" })
    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
        console.log(error);

    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: "Invaild Username" })
        }
        const IsPasswordValid = await bcrypt.compare(password, user.password)
        if (!IsPasswordValid) {
            return res.status(400).json({ msg: "Invalid Password" })
        }

        const token = jwt.sign({ id: user._id, username: user.username }, "Your_Secret_key", { expiresIn: "1d" });

        console.log(token);
        res.status(200).json({ msg: "Log In SuccessFull", token })

    } catch (error) {
        res.status(500).json({ msg: "Server Error" })
        console.log(error);

    }
})


module.exports = router;