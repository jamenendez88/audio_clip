const audioClipModel = require("../models/audioClip"); // es el modelo ke me permitara interactuar con mi objeto de base de datos
const audioClipCtrl = {}; // creando mi objeto controlador de la clase empleado

// Obtener Listado de audioClips por parametros
audioClipCtrl.getaudioClips = async(req, res) => {
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
audioClipCtrl.getaudioClipById = async(req, res) => {
    try {
        const audioClipById = await audioClipModel.findById(req.params.id);

        res.json(audioClipById);
    } catch (error) {
        res.json(error);
    }
}

// Insertar un audioClip en mi base de datos
audioClipCtrl.createaudioClip = async(req, res) => {
    try {

        // Hago uso del middleware ke me da el fichero cargado a traves de req.files
        let imageFile = req.files.imageFile;

        // Uso el metodo .mv() para guardar el fichero en la carptea files, dentro de mi server
        imageFile.mv('acceso-servidor-remoto/files/' + req.files.imageFile.name);


        const add_audioClip = new audioClipModel(req.body);

        await add_audioClip.save();

        res.json({ "status": "audioClip saved" });
    } catch (error) {
        res.json(error);
    }
}

// Actualizar un audioClip
audioClipCtrl.updateaudioClip = async(req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const temp = await audioClipModel.findByIdAndUpdate(id, body);

        if (temp) {
            res.json({ status: "audioClip actualizado" });
        }
    } catch (error) {
        res.json(error);
    }
}

// Eliminar un audioClip
audioClipCtrl.deleteaudioClip = async(req, res) => {
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