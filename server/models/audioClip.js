const mongoose = require("mongoose");
const Coordinates = require('./coordenates.model');

const { Schema } = mongoose; // usar la clase eskema definido por mongoose

audioClipSchema = new Schema({
    bitrate: { type: Number, required: true },
    contentSize: { type: Number },
    contentURI: { type: String, required: true },
    location: { X: { type: Number }, Y: { type: Number } },
    encodingFormat: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    label: { type: String, required: true }
})

module.exports = mongoose.model('audioClip', audioClipSchema);