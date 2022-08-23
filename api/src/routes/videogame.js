const { Router } = require("express");
const router = Router();
const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const URL_API = `https://api.rawg.io/api/games?key=${process.env.KEY}`;

router.get("/", async(req, res, next) => {
    const {name} = req.query;
    try{
        const api = await axios.get(URL_API);
        const data = api.data.results;
        const dataApi = data.map((v) => {   
            return {
                id: 'a'+ v.id.toString(),
                name: v.name.toUpperCase(),
                description: v.description,
                date: v.released,
                image: v.background_image,
                rating: v.rating,
                platforms: v.platforms.map((c) => {
                    return c.platform.name;
                }),
                genres: v.genres.map((c) => {
                    return{
                        id: c.id,
                        name: c.name
                    }
                })                       
            } 
        })
        
        res.json(dataApi);

    } catch(error) {
        next(error)
    }
})


module.exports = router