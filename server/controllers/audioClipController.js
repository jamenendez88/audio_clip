const audioClipModel = require("../models/audioClip"); // es el modelo ke me permitara interactuar con mi objeto de base de datos
const audioClipCtrl = {}; // creando mi objeto controlador de la clase empleado
const path = require('path');
const FileSaver = require('file-saver');
const datetime = require('node-datetime');
const dt = datetime.create();

/* const storage = multer.diskStorage({
    destination: './uploads/media/',
    filename: function (req, file, cb) {
        cb(null, req.newname +
            path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('portada');

function checkFileType(file, cb) {
    const filetypes = /mp3|wav|ogg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        return cb('Error: Solo Audio');
    }
} */


// Obtener Listado de audioClips por parametros
audioClipCtrl.getaudioClips = async (req, res) => {
    try {

        var params = {}; // Objeto json que me guarda los campos con los valores para pasarlo a mi consulta

        for (key in req.query) {
            req.query != "" ? params[key] = req.query[key] : null; // Si la url trae parametros pues los annade a el objeto params
        }

        const list_audioClips = await audioClipModel.find({ $or: [params] });
        if (list_audioClips) {
            res.json(list_audioClips);
        } else {
            res.json({ message: "No existe el Clip de Audio" });
        }

    } catch (error) {
        res.json(error);
    }

};

// Obtener un audioClip Especifico
audioClipCtrl.getaudioClipById = async (req, res) => {
    try {
        const audioClipById = await audioClipModel.findById(req.params.id);

        res.json(audioClipById);
    } catch (error) {
        res.json(error);
    }
}

// Insertar un audioClip en mi base de datos
audioClipCtrl.createaudioClip = async (req, res) => {
    try { 
        const add_audioClip = new audioClipModel({
            bitrate: req.body.bitrate,
            contentSize: req.file.size,
            encodingFormat: req.file.encoding,
            contentURI: req.file.path,
            uploadDate: dt.format('m/d/Y H:M:S'),
            // duration: req.body.duration,
            label: req.body.label || "audio_note_" + Date.now()
        });

        await add_audioClip.save();
        res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
    } catch (error) {
        res.json(error);
    }
}

// Actualizar un audioClip
audioClipCtrl.updateaudioClip = (req, res) => {
    const { id } = req.params;
    audioClipModel.findByIdAndUpdate(id, {
        $set: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            label: req.body.label
        }
    }, { new: true }).then((audio) => {
        if (audio) {
            res.status(200).send({ message: 'Audioclip successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

// Eliminar un audioClip
audioClipCtrl.deleteaudioClip = (req, res) => {
    const { id } = req.params;
    audioClipModel.findByIdAndDelete(id).then((audio) => {
        if (audio) {
            res.status(200).send({ message: 'Audioclip successfuly deleted!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
}

// Exportar mi objeto controlador para ke se a usado en todo mi proyecto
module.exports = audioClipCtrl;