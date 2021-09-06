const express = require('express');
const app = express();
const path = require ('path');
const methodOverride = require ('method-override');
const session = require('express-session');

const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const tecnicosRouter = require('./routes/tecnicos');
const configRouter = require('./routes/configuracion');
const usersRouter = require('./routes/users');

const sesionIniciadaMiddleware = require('./middlewares/sesionIniciada');

//EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//OVERRIDE
app.use(methodOverride('_method'));

//PUBLIC
app.use(express.static(path.join(__dirname, '../public')))

//
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(session( { secret: 'AscensoresMaga' } ));
app.use(sesionIniciadaMiddleware);


//RUTAS
app.use('/',mainRouter);
app.use('/admin',adminRouter);
app.use('/tecnicos', tecnicosRouter);
app.use('/configuracion',configRouter);
app.use('/users',usersRouter);

//PUERTOS
app.listen(process.env.PORT || 3000, function() {
    console.log("El servidor está corriendo en el puerto 3000");
    console.log("-------------------");
    console.log("http://localhost:3000");
})