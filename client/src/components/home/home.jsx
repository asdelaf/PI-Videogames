import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres} from '../../redux/actions/genres';
import VideogamesBoxs from '../videogames/videogames';
import { HGet } from '../../redux/actions/get/get';
import Nav from '../nav/nav';
import Pagination from '../pagination/pagination';
import s from './home.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const [videogames, setVideogames] = useState([]);
    const [allVideogames, setAllVideogames] = useState([]);
    
    const [loading, setLoading] = useState(false);
   
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(9)

    const [filter, setFilter] = useState({
        name:'',
        genre: '',
        order:''
    });
    
    const genres = useSelector((state) => state.genres);
    
    
    
    useEffect(() => {

        dispatch(getGenres());

        const get = async () => {
            HGet(`/videogames`).then((res) => {
                setLoading(true);
                setVideogames(res.data);
                setAllVideogames(res.data);
                setLoading(false);
            });
        }

        get();
    }, []);

    function searchChange(e) {
        let newFilter = {...filter}
        newFilter.name = e.target.value;
        setFilter(newFilter);
    }

    const searchVideogame = () => {
        let newFilter = {...filter};
        const get = async () => {
            HGet(`/videogames/?name=${newFilter.name}`).then((res) => {
                setLoading(true);
                setVideogames(res.data);
                setLoading(false);
            });
        }
        get();
        setCurrentPage(1)
        newFilter.name = '';
        setFilter(newFilter)
    }

    function genreChange(e) {
        if(e.target.value === "All"){
            setVideogames(allVideogames);            
        }else{
            let newFilter = {...filter}
            newFilter.videogame= e.target.value;
            setFilter(newFilter);
    
            
            let newVideogames = allVideogames.filter((d) => {
               let aux = d.genres
               return aux.some((t) => t.name == e.target.value)
            })
            setVideogames(newVideogames);
        }
        
        setCurrentPage(1)
    }
    
    function orderChange(e) {
        let newFilter = {...filter}
        newFilter.order = e.target.value;
        setFilter(newFilter);
        
        if(e.target.value === 'desc'){
            videogames.sort(function (a, b) {
                if (a.name < b.name) {
                  return 1;
                }
                if (a.name > b.name) {
                  return -1;
                }
                return 0;
              });
        
        }else{
            if(e.target.value === 'asc'){
                videogames.sort(function (a, b) {
                    if (a.name > b.name) {
                      return 1;
                    }
                    if (a.name < b.name) {
                      return -1;
                    }
                    return 0;
                  });
            
            }else{
                if(e.target.value === 'min-rating'){
                    videogames.sort(function (a, b) {
                            if (a.rating > b.rating) {
                                return 1;
                            }
                            if (a.rating < b.rating)  {
                                return -1;
                            }                         
                        return 0;
                                            
                    });
                
                }else{
                    
                    if(e.target.value === 'max-rating'){
                        videogames.sort(function (a, b) {
                            if(a.rating < b.rating) { 
                                return 1;
                            }
                            if(a.rating > b.rating) {
                                return -1;
                            }
                            return 0; 
                                                  
                        });

                    }
                }
            } 
        }


    }

    const indexOfLastPost = currentPage * videogamesPerPage;
    const indexOfFirstPost = indexOfLastPost - videogamesPerPage;
    const currentVideogames = videogames.slice(indexOfFirstPost, indexOfLastPost); 

    const paginate = pageNumber => setCurrentPage(pageNumber);



    return(
        <div className={s.body}>
            <Nav/>
            <div id="search" className={s.container}>

                <div className={s.containerSelect}>
                    <select name="genres" id="genres" autocomplete="nope" onChange={(e) => genreChange(e)}>
                        <option selected disabled>Genres:</option>
                        <option value='All'>All</option>
                        {genres && genres.length > 0 ? (genres.map((c) => {
                        return( <option>{c.name}</option>)
                        })): <option></option>}
                    </select>
                </div>

                <div className={s.containerSearch}>
                    <input className={s.search} placeholder="Search..." type="text" name="videogame" id="videogame" value={filter.name} onChange={(e) => searchChange(e)} />
                    <input className={s.button} type='button' value='  ' onClick={searchVideogame}/>
                </div>

                <div className={s.containerSelect}> 
                    <select name="order" value={filter.order} onChange={(e) => orderChange(e)}>
                        <option value ="" selected disabled>Order:</option>
                        <option value='asc'>A-Z</option>
                        <option value='desc'>Z-A</option>
                        <option value='max-rating'>Max Rating</option>
                        <option value='min-rating'>Min Rating</option>
                    </select>
                </div>  
            </div>
            <VideogamesBoxs videogames={currentVideogames} loading={loading}/>
            <Pagination videogamesPerPage={videogamesPerPage} totalVideogames={videogames.length} paginate={paginate}/>
        </div>
    );

};

export default Home;