const express = require("express");
const audioClipCtrl = require("../controllers/audioClipController");
const router = express.Router();
const DIR = './uploads/media';
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file, cb) {
    const filetypes = /mp3|wav|ogg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb('Error: Just Audio');
    }
}

let upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('audio');

// Manipula las peticiones get a la ruta raiz /, devolviendo el objeto json a traves de la funcion especificada
// Definiendo las rutas de mi proyecto y las funciones de mi controlador ke va a utilizar
/*router.get('/', (req, res) => {
    res.json({ "status": "API REST funciona" });
});*/

// otra implementacion a la funcion anterior un poco mas limpia seria usando la clase Controller
router.get('/', audioClipCtrl.getaudioClips);

// Obtener un audio a traves de su Id
router.get('/:id', audioClipCtrl.getaudioClipById);

// Insertar audio
/* router.post('/', upload.single('audio'), audioClipCtrl.createaudioClip); */
// router.post('/', function (req, res, next) {
//     upload(req, res, function (err) {
//         if (err) {
//             res.status(501).json({ error: err });
//         }
//         //do all database record saving activity
//         res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
//     });
// }, audioClipCtrl.createaudioClip);

router.post('/', upload, audioClipCtrl.createaudioClip);

router.post('/download', function (req, res, next) {
    filepath = path.join(__dirname, '../../uploads/media') + '/' + req.body.filename;
    res.sendFile(filepath);
});

// Editar un audio
router.put('/:id', audioClipCtrl.updateaudioClip);

// Eliminar un audio
router.delete('/:id', audioClipCtrl.deleteaudioClip);

module.exports = router;