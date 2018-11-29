const mongoose = require("mongoose"); // modulo para conectarse a la base de datos

const URI = 'mongodb+srv://jamenendez:Estudios-*2018@cluster0-7mf0l.mongodb.net/audio_clip'; // direccion de la base de datos ke voy a crear como ejemplo

const option = {
    useNewUrlParser: true
}
mongoose.connect(URI, option)
    .then(db => console.log("DB conection successfuly")) // llamada promesa para si nos conectamos correctamente me muestre un mensaje por consola
    .catch(err => console.log(err)); // de lo contrario me muestra el error en la consola

module.exports = mongoose; // exportar la variable mongoose para ke pueda ser accedida globalmente desde mi proyecto