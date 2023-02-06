const express = require('express');
const multer = require('multer');

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Image uploaded',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'There was a problem of uploading the image',
    });
  }
});

module.exports = router;
