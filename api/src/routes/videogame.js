const { Router } = require("express");
const router = Router();
const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
const URL_API = `https://api.rawg.io/api/games?key=${process.env.KEY}&page=2`;
const API_KEY = process.env.KEY;

const getVideogamesAPI = async () => {

    let arr = [1,2,3,4,5]
    arr = await Promise.all(arr.map(async page =>{
        let json = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        return json.data.results
    }))
    return arr.flat().map(v => {
        return {
            id:v.id, 
            name:v.name.toUpperCase(),
            date: v.released,
            image: v.background_image,
            rating: v.rating.toString(),
            platforms: v.platforms.map(p => p.platform.name),
            genres: v.genres.map((c) => {
                return{
                    id: c.id,
                    name: c.name
                }
            })
            
        }
    })

}

router.get("/", async(req, res, next) => {
    const {name} = req.query;
    try{
        if(name){
            let nam = name.toUpperCase();
            const videogame = await Videogame.findAll({where: {name: nam}, include: [{model: Genre}]});
            
            if(videogame.length>0){
                res.json(videogame);
            }else{
                
                const dataApi = await getVideogamesAPI();
                const videogameApi = dataApi.filter((v) => {
                    return v.name.toUpperCase() === nam
                })
        
                res.json(videogameApi);
            }

        }else{
            const videogames = await Videogame.findAll({include: [{model: Genre}]});
            
            /*const api = await axios.get(URL_API);
            const data = api.data.results;
            const dataApi = data.map((v) => {   
                return {
                    id: v.id.toString(),
                    name: v.name.toUpperCase(),
                    date: v.released,
                    image: v.background_image,
                    rating: v.rating.toString(),
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
            })*/
            const dataApi = await getVideogamesAPI();
            
            res.json(dataApi.concat(videogames));

        }


    } catch(error) {
        next(error)
    }
})


router.get("/:id", async(req, res, next) => {
    const {id} = req.params;
    
    try{
        if(id.length>25){
            const videogameBD = await Videogame.findByPk(id, {include: [{model: Genre}]}) 
            console.log(videogameBD)
            res.json(videogameBD);
            
        }else{
            const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const data = api.data;
            
            if(data){
                var videogameApi = {
                    id: data.id.toString(),
                    name: data.name.toUpperCase(),
                    description: data.description,
                    date: data.released,
                    image: data.background_image,
                    rating: data.rating.toString(),
                    platforms: data.platforms.map((c) => {
                        return c.platform.name;
                    }),
                    genres: data.genres.map((c) => {
                        return{
                            id: c.id,
                            name: c.name
                        }
                    })   
                }
            }

            res.json(videogameApi);
            
        }

    } catch(error){
        next(error)
    }

})


router.post("/", async (req, res, next) => {
    const {name, image, date, description, rating, genres, platforms} = req.body;

    try {
        const new_videogame = await Videogame.create({
            name: name.toUpperCase(),
            image: image,
            date: date,
            rating: rating,
            description: description,
            platforms: platforms
        });
        const g = await Genre.findAll({where: {name: genres}});
        await new_videogame.addGenre(g)
        res.json({msg: "paso"}) 

    } catch (error) {
        next(error)
    }
});


module.exports = router