import { NavLink } from 'react-router-dom';
import s from './videogames.module.css';

const VideogamesBoxs = ({videogames, loading, genreFilter}) => {

    if(loading){
        return <h2>Loading...</h2>
    }

    function imgStyle(img)  {
        return {
        backgroundImage:
          `url(${img})`,
        }
      };

    return (
        <div className={s.grid}>
            {videogames && videogames.length > 0 ? (videogames.map((c) => {
                    return (
                        
                            <div className={s.card}>
                                <NavLink className={s.link} to={`/videogames/${c.id}`}>
                                <div>
                                <div className={s.box} style={imgStyle(c.image)}>
                                <div className={s.ratingbox} title="Rating">
                                    <a className={s.rating}>{c.rating}</a>
                                </div>
                                </div>
                                <a className={s.name} >{c.name} </a>

                                <div className={s.gridH}>
                                    {c.genres && c.genres.length ? (c.genres.map((t) => {
                                        return(
                                            <div className={s.hashtag} onClick= {genreFilter(t)}>
                                                <p className={s.temperament}>{t.name}</p>
                                            </div>
                                        )
                                    })):<h2></h2>}
                                </div>
                                </div>
                                </NavLink>                          
                            </div>
                        
                    )
            })): <h2></h2>}
        </div>

        
    );
}

export default VideogamesBoxs;