const express = require("express");
const fileUpload = require('express-fileupload'); // Middleware para cargar un fichero al servidor
const morgan = require("morgan"); // modulo ke ayuda a ver por consola lo ke el usuario esta pidiendo
const app = express(); // app es la encargada de mantener toda la funcionalidad del servidor ke estoy creando
//const router = require("./routes/sound.routes");
const cors = require("cors");

const bodyParser = require('body-parser');


const { mongoose } = require("./database"); // esta forma de declaracion plantea ke solo keremos usar de nuestro archivo database la conexion mongoose

// SETTINGS  ---- apartado de configuraciones de mi servidor
app.set('port', process.env.PORT || 3000); // la funcion set me define una variable (port) la cual va a tomar un valor proporcionado por el sistema operatico (a traves de process.env.PORT) o va a tomar 3000

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// MIDDLEWARES  -----  apartado de funciones necesarias para ke funcione mi servidor
app.use(morgan("dev")); // me mostro por consola el error 404 de una peticion get porke no habia pagina web

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* app.use(fileUpload({ createParentPath: true, safeFileNames: true, preserveExtension: true, abortOnLimit: true, limits: { fileSize: 50 * 1024 * 1024 } })); // Middleware para cargar un fichero al servidor. Explicacion de los paramteros en la pagina https://www.npmjs.com/package/express-fileupload */

app.use(express.json()); // middleware ke sirve para ke el server entienda los datos ke vienen desde el navegador del cliente ke vienen empaketados en formato json


// ROUTES ---- apartado de definicion de mis rutas dentro del servidor
app.use("/api/audioClips", require("./routes/audioClip.routes")); // aki estoy usando mi fichero


// INITIALIZING AND STARTING THE SERVER

// Voy a arrancar mi servidor y va a escuchar a traves del puerto configurado anteriormente y aki accedo a el a traves de app.get('port')
app.listen(app.get('port'), () => {
    console.log(`Server started on port ` + app.get('port'))
});