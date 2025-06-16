const express = require('express');
const { signup, login, forgotPassword, verifyOtp } = require('../controllers/controllerAuth');
const information = require('../models/files');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();



router.post("/Signup",signup);
router.post("/login",login);
router.post("/forgotpassword",forgotPassword);
router.post("/verifyotp",verifyOtp);

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new information({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedBy: req.user.userId, // from JWT
    });
    await file.save();
    res.status(201).json({ message: 'File uploaded', file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get files of logged-in user
// router.get('/myfiles', auth, async (req, res) => {
//   try {
//     const files = await information.find({ uploadedBy: req.user.userId });
//     res.json(files);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.get('/myfiles', async (req, res) => {
  try {
    const files = await information.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;