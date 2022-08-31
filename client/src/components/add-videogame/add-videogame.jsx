import React, {useState, useEffect } from 'react';
import { HGet } from '../../redux/actions/get/get';
import { postVideogame} from "../../redux/actions/videogames";
import { getGenres } from '../../redux/actions/genres';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav/nav';
import s from './add-videogame.module.css';

const AddVideogame= () => {
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);
    const [videogames, setVideogames] = useState([]);
    const genres = useSelector((state) => state.genres);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const[v, setV] = useState({
        name:'',
        description:'',
        date:'',
        rating:'',
        image: '',
        platforms:[], 
        genres:[],
    })    
    
    let platforms = [
        "PC",
        "Xbox Series S/X",
        "PlayStation 4",
        "PlayStation 3",
        "Xbox 360",
        "Xbox One",
        "PlayStation 5",
        "Nintendo Switch",
        "Linux",
        "macOS",
        "Android",
        "iOS",
        "Xbox",
        "PS Vita",
        "Web"
    ]


    useEffect(() => {
        dispatch(getGenres());

        const get = async () => {
            HGet(`/videogames`).then((res) => {
                setLoading(true);
                setVideogames(res.data);
                setLoading(false);
            });
        }
        get();
    }, []);


    function handleChange(e) {
        setV(() => {
          return {
            ...v,
            [e.target.name]: e.target.value,
          };
        });
    }

    function handleChangePlatforms(e) {
        setV(() => {
            return {
              ...v,
              platforms: v.platforms.includes(e.target.value) ? v.platforms.filter((p) => p !== e.target.value) : v.platforms.concat(e.target.value),
            };
        });          
    }
      
    function handleSubmit(e) {
        e.preventDefault();

        if(v.name ==="" || v.description ===''|| v.date ==="" || v.rating ==="" || v.platforms ==="" 
        || v.image ==="" || selectedGenres.length ===0){
            window.alert('COMPLETE TODOS LOS CAMPOS');
        }else{

            
            if(videogames.find((c) => c.name === v.name.toUpperCase())){
                window.alert("Ya existe un videojuego con ese nombre");

            }else{    
                        
    
                        const addVideogame = {
                            name: v.name,
                            description: v.description,
                            date: v.date,
                            rating: v.rating.slice(0,3),
                            image: v.image,
                            platforms: v.platforms,
                            genres: selectedGenres
                        }
            
                        dispatch(postVideogame(addVideogame));
                        window.alert("videogame agregado");
    
                        let video = {
                            name:'',
                            description:'',
                            date:'',
                            rating: '',
                            image:'',
                            platforms:[],
                            genres:[]
                        };

                        setSelectedGenres(video.genres);
                        setV(video);

            }

        }
    }
    
    const deleteGenre = (genre) => {
        let genress = selectedGenres.filter((c) => c !== genre);
        setSelectedGenres([...genress]);
    }

    const addGenre = () => {
        const select = document.getElementById('genres');
        const text = select.options[select.selectedIndex].text;
        if(!selectedGenres.includes(text)){
            setSelectedGenres([...selectedGenres, text]);
        }
    }



    return(
        <div>
            <Nav/>
            <form className={s.form} onSubmit={handleSubmit}>
                <h1 className={s.title}>Add Videogame</h1>
                <fieldset>
                        <div className={s.containerText}>
                            <label className={s.labelTitle}>Name of videogame:</label>
                            <input className={s.input} type='text' name="name" maxlength="30" value={v.name} onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerText}>
                            <label className={s.labelTitle}>Description:</label>
                            <input className={s.input} type='text' name="description" value={v.description} maxlength="1000" onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerText}>   
                            <label className={s.labelTitle}>Image (URL):</label>
                            <input className={s.input} type='text' name="image" maxLength='100' value={v.image} onChange={(e) => handleChange(e)}/>
                        </div>


                        <div className={s.containerRating}> 
                            <label className={s.labelTitle}>Rating:</label>
                            <input className={s.input} type="number" name="rating" max="5" min="0" step="0.1" value={v.rating} onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className={s.containerDate}> 
                            <label className={s.labelTitle}>Date:</label>
                            <input className={s.input} type="date" name="date" min="1950-01-01" max="2030-01-01" value={v.date} onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className={s.containerPlatform}> 
                            <label className={s.labelTitle}>Platforms:</label>
                            <div className={s.platforms}>
                                <div className={s.platformsL}>
                                    {platforms.slice(0,platforms.length/2).map((p) => {
                                        return(
                                            <div>
                                              <input type="checkbox" id={p}  value={p} onChange={(e) => handleChangePlatforms(e)} className={s.checkboxL}/>
                                              <label for={p} className={s.labelL}>{p}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className={s.platformsR}>
                                    {platforms.slice(platforms.length/2,platforms.length).map((p) => {
                                        return(
                                            <div>
                                                <input type="checkbox" id={p}  value={p} onChange={(e) => handleChangePlatforms(e)} className={s.checkboxR}/>
                                                <label for={p} className={s.labelR}>{p}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <br/>
                        <br/>

                        <div className={s.containerGenres}> 
                            <label className={s.labelTitle}>Genres:</label>
                            <br/>
                            <div className={s.divSelect}>
                                <div className={s.containerSelect}> 
                                    <select name="genres" id="genres"  onChange={(e) => handleChange(e)}>
                                        {genres.map((g) => {
                                        return( <option>{g.name}</option>)
                                        })}
                                    </select>
                                </div>
                                <input className={s.addGenre} type='button' value='+' onClick={addGenre}/>
                            </div>     
                        </div>

                        <div className={s.grid} id='genres-selected'>
                            {selectedGenres.map((g) => {
                            return (
                                <div className={s.hashtag} key={g}>
                                    <p className={s.genre}>{g}</p>
                                    <input className={s.buttonDelete} type="button" value="X" onClick={()=>deleteGenre(g)}/>
                                </div>
                            );
                            })}
                         </div>
                         
                         <button className={s.buttonSubmit}type="submit">ADD VIDEOGAME</button>                       

                </fieldset>
            </form>
        </div>
    )
}



export default AddVideogame;