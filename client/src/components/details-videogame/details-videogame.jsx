import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameId, getClean } from '../../redux/actions/videogames';
import { useParams } from 'react-router-dom';
import Nav from '../nav/nav';
import s from './details-videogame.module.css';

const VideogameDetails= () => {
    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogame);
    let { id } = useParams();

    useEffect(() => {
        dispatch(getClean())
        dispatch(getVideogameId(id));
    }, [dispatch, id]);

    function imgStyle(img)  {
        return {
        backgroundImage:
          `url(${img})`,
        }
    };

    return (
        <div>
            <Nav/>
            <div className={s.grid}>
                                <div className={s.card}>
                                    <div className={s.box} style={imgStyle(videogame.image)}></div>
                                    <a className={s.name} >{videogame.name} </a>
                                    
                                    <div className={s.info}>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Description:</a>
                                            {videogame.id && videogame.id.toString().length > 25 ? <a className={s.dato}>{videogame.description}</a>:
                                            <a className={s.dato} dangerouslySetInnerHTML={{__html: videogame.description}}/>
                                            }
                                        </div>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Release Date:</a>
                                            <a className={s.dato}>{videogame.date}</a>
                                        </div>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Rating:</a>
                                            <a className={s.dato}>{videogame.rating}</a>
                                        </div>

                                        <div className={s.infoBox}>
                                            <a className={s.title}>Platforms:</a>
                                            {videogame.platforms ? (videogame.platforms.map((p) => {
                                                return(
                                                    <a className={s.platform}>{p}</a>
                                                )
                                            })):
                                            <a></a>
                                            }
                                        </div>
                                        
                                        <div className={s.infoBox}>
                                            <a className={s.title}>Genres:</a>
                                        </div>
                                        <div className={s.gridH}>
                                            {videogame.genres && videogame.genres.length > 0 ? ( videogame.genres.map((g) => {
                                                return(
                                                    <div className={s.hashtag}>
                                                        <p className={s.genre}>{g.name}</p>
                                                    </div>
                                                )
                                            })):
                                            <h2></h2>
                                            }
                                        </div>
                                    </div>       
                                </div>
            </div>
        </div>

    );
}



export default VideogameDetails;
