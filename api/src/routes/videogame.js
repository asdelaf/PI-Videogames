const { Router } = require("express");
const router = Router();
const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const URL_API = `https://api.rawg.io/api/games?key=${process.env.KEY}`;

router.get("/", async(req, res, next) => {
    const {name} = req.query;
    try{
        if(name){
            let nam = name.toUpperCase();
            const videogame = await Videogame.findAll({where: {name: nam}, include: [{model: Genre}]});
            
            if(videogame.length>0){
                res.json(videogame);
            }else{
                const api = await axios.get(URL_API);
                const data = api.data.results;
                const dataApi = data.filter((v) => {
                    return v.name.toUpperCase() === nam
                })
                
                const videogameApi = dataApi.map((v) => {
                    return {
                        id: v.id.toString(),
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

                res.json(videogameApi);
            }

        }else{
            const videogames = await Videogame.findAll({include: [{model: Genre}]});
            const api = await axios.get(URL_API);
            const data = api.data.results;
            const dataApi = data.map((v) => {   
                return {
                    id: v.id.toString(),
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
            
            res.json(dataApi.concat(videogames));

        }


    } catch(error) {
        next(error)
    }
})


router.get("/:id", async(req, res, next) => {
    const {id} = req.params;
    
    try{
        if(id.length>30){
            const videogame = await Videogame.findByPK(id, {include: [{model: Genre}]}) 
            res.json(videogame);
            
        }else{
            const api = await axios.get(URL_API);
            const data = api.data.results;
            const dataApi = data.filter((v) => {
                return v.id.toString() === id
            })
            
            const videogameApi = dataApi.map((v) => {
                return {
                    id: v.id.toString(),
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

            res.json(videogameApi);
            
        }

    } catch(error){
        next(error)
    }

})

module.exports = router