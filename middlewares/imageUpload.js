const multer = require("multer");

//destino de armazenamento da imagem
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "cardapio";

    cb(null, `public/images/${folder}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|webp)$/)) {
      return cb(new Error("Por favor, envie apenas jpg, webp ou png!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };