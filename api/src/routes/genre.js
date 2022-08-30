const { Router } = require("express");
const router = Router();
const { Genre } = require('../db.js');
const axios = require('axios');
const URL_API = `https://api.rawg.io/api/games?key=${process.env.KEY}`;

router.get("/", async(req, res, next) => {
    try{
        const genres = await Genre.findAll({ order: [["name", "ASC"]]});
        res.json(genres)
        
    } catch(error) {
        next(error)
    }
    
});

router.post("/", async (req, res, next) => {
    const {name} = req.body;

    try {   
            const genres = await Genre.findAll();
            if(name){
                const new_genre = await Genre.create({
                    name: name
                });
                res.json({msg: "paso"});
            }else{
                
                if(genres.length == 0){
                    let aux = [];
                    let a;
                    const api = await axios.get(URL_API);
                    const data = api.data.results;
                    data.map((v) => {
                        v.genres.map((c) => {
                            a = c.id + '$@^' + c.name;
                            aux = aux.concat(a)
                        }) 
                    })
                  
                    aux = Array.from(new Set(aux)); //elimina repetidos
                
                    const genresApi = await aux.map((c) => {
                        let g = c.split('$@^');
                        Genre.create({id: g[0], name: g[1]})

                    });
    
                    res.json("pasaron");
                
                }else{
                    res.json("ingrese un name")

                }

            }


    } catch (error) {
        next(error)
    }
});


module.exports = router;