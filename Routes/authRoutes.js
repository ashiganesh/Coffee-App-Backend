const express = require('express');
const { signup, login, forgotPassword, verifyOtp } = require('../controllers/controllerAuth');
const information = require('../models/files');
const cartitems = require('../models/cartItems');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const cloudinary = require('cloudinary').v2;

const router = express.Router(); 



router.post("/Signup",signup);
router.post("/login",login);
router.post("/forgotpassword",forgotPassword);
router.post("/verifyotp",verifyOtp);

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  // try {
  //   const{ name, description } = req.body;
    
  //   const product = new information({name,description
  //     ,file:[{

  //     filename: req.file.filename,
  //     originalName: req.file.originalname,
  //     path: req.file.path,
  //     mimetype: req.file.mimetype,
  //     size: req.file.size,
  //     uploadedBy: req.user.userId, // from JWT

  //   }]
  // })
  //   await product.save();
  //   res.status(201).json({ message: 'File uploaded', product });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  try {
    const{
 name,
  brand,
  description,
   image,
  price,
  originalPrice,
  discount,
  sizes,
  selectedSize,
  rating,
  reviewsCount,
 } = req.body;

     const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "uploads",
    });
    
    const product = new information({name,brand, description
      ,image:result.secure_url, price ,originalPrice,discount,sizes,selectedSize,rating,reviewsCount
  })
    await product.save();
    res.status(201).json({ message: 'File uploaded', product });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }

//  try {
  
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     const dataURI = `data:${req.file.mimetype};base64,${b64}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: "uploads",
//     });

//     // Save URL to MongoDB
//     const newImage = new Image({ url: result.secure_url });
//     await newImage.save();

//     res.status(200).json({ message: "Image uploaded", imageUrl: result.secure_url });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }





});




router.post('/uploadcartitems', auth, async (req, res) => {
  
  try {
    const{name,description,url,price, size, quantity} = req.body;

    
    
    const product = new cartitems({name,description,url,price, size, quantity, uploadedBy: req.user.userId,});
    await product.save();
    res.status(201).json({ message: 'Product added to cart successfully', product });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Get files of logged-in user
router.get('/getcartitems', auth, async (req, res) => {
  try {
    const files = await cartitems.find({ uploadedBy: req.user.userId });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/myfiles', async (req, res) => {

  // try {
  //   const category = req.query.category;

  //   const filter = category ? { category: category.toLowerCase() } : {};

  //   const products = await information.find(filter);

  //   res.status(200).json(products);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }



  try {
    const files = await information.find();
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.get("/myfiles/:id", async (req, res) => {
  try {
    const product = await information.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});





module.exports = router;

//upload.array('files', 5) // max 5 files, for example
// for multiple files upload
// files: req.files.map(file => ({
//   filename: file.filename,
//   originalName: file.originalname,
//   path: file.path,
//   mimetype: file.mimetype,
//   size: file.size,
// }))
