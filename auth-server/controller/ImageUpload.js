const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dpvaibns6",
  api_key: "448847531188965",
  api_secret: "Y5_2EqpjcA8gOQt2lZyzZKrefMs",
});

const imageUploadController = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("Uploaded image to Cloudinary:", result); // Kiểm tra xem đã upload thành công lên Cloudinary hay chưa
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Image upload failed:", error); // Log lỗi nếu có lỗi xảy ra
    res.status(500).json({ error: "Image upload failed" });
  }
};

module.exports = { imageUploadController };
