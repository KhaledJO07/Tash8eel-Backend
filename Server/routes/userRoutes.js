// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth'); // middleware to check token
const multer = require('multer');

// Sign up
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // Hash the password before saving:
        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashed });
        const saved = await newUser.save();

        return res.status(201).json({ message: 'User created', user: saved });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Server error during signup' });
    }
});


// Login
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Optional: password check
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid email or password' });
        // }

        const token = jwt.sign({ id: user._id }, 'SECRET', { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
});



// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Delete user by email
router.delete('/:email', async (req, res) => {
    try {
        const deleted = await User.findOneAndDelete({ email: req.params.email });

        if (!deleted)
            return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted', deleted });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});


// Get Profile
router.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

// Update Profile
router.put('/profile', auth, async (req, res) => {
    const { name, age, bio, profileImage } = req.body;  // changed avatarUrl => profileImage
    const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, age, bio, profileImage },
        { new: true }
    ).select('-password');
    res.json(user);
});


// 1. Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // uploads folder
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

// 2. Init Upload
const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    },
});

// 3. Upload API Route
router.post('/upload-profile-image', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No image provided' });

        const imagePath = `/uploads/${req.file.filename}`;

        const user = await User.findByIdAndUpdate(req.user.id, { profileImage: imagePath }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ message: 'Image uploaded successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = router;
