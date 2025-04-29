import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Куда сохранять файлы
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Как назвать файл
    }
  });
  export const upload = multer({ storage })