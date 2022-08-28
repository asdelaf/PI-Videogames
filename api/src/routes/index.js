const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const VideogameRoute = require('./videogame');
const GenreRoute = require('./genre');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", VideogameRoute);
router.use("/genres", GenreRoute);

module.exports = router;
