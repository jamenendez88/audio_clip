const audioClipModel = require("../models/audioClip"); // es el modelo ke me permitara interactuar con mi objeto de base de datos
const audioClipCtrl = {}; // creando mi objeto controlador de la clase empleado

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

        /*  // Hago uso del middleware ke me da el fichero cargado a traves de req.files
         let imageFile = req.files.imageFile;
 
         // Uso el metodo .mv() para guardar el fichero en la carptea files, dentro de mi server
         imageFile.mv('acceso-servidor-remoto/files/' + req.files.imageFile.name);
 
  */
        const add_audioClip = new audioClipModel({
            bitrate: req.body.bitrate,
            contentSize: req.body.contentSize,
            encodingFormat: req.body.encodingFormat,
            contentURI: req.body.contentURI,
            uploadDate: req.body.uploadDate,
            duration: req.body.duration,
            label: req.body.label
        });

        await add_audioClip.save();

        res.json({ "status": "audioClip saved" });
    } catch (error) {
        res.json(error);
    }
}

// Actualizar un audioClip
audioClipCtrl.updateaudioClip = (req, res) => {
    const { id } = req.params;
    audioClipModel.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((audio) => {
        if (audio) {
            res.status(200).send({ message: 'Audioclip successfuly updated!' });
        } else {
            res.status(404).jsonp("Not found");
        }
    }).catch((error) => {
        res.status(500).jsonp(error.message);
    });
    /* try {
        const { id } = req.params;
        const { body } = req;

        const temp = await audioClipModel.findByIdAndUpdate(id, body);

        if (temp) {
            res.json({ status: "audioClip actualizado" });
        }
    } catch (error) {
        res.json(error);
    } */
}

// Eliminar un audioClip
audioClipCtrl.deleteaudioClip = async (req, res) => {
    /* const { id } = req.params; */
    /* console.log(req.body); */
    console.log(req.params);
    /*  audioClipModel.findByIdAndDelete(id).then((audio) => {
         if (audio) {
             res.status(200).send({ message: 'Audioclip successfuly deleted!' });
         } else {
             res.status(404).jsonp("Not found");
         }
     }).catch((error) => {
         res.status(500).jsonp(error.message);
     }); */
    try {
        const { id } = req.params

        const temp = await audioClipModel.findByIdAndDelete(id);

        if (temp) {
            res.json({ status: "audioClip Eliminado" });
        }
    } catch (error) {
        res.json(error);
    }
}

// Exportar mi objeto controlador para ke se a usado en todo mi proyecto
module.exports = audioClipCtrl;