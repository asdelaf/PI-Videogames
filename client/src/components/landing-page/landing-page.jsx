import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import s from './landing-page.module.css';
import { postGenres } from '../../redux/actions/genres';


const LandingPage= () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(postGenres())
    },[])


    return (
        <div className={s.body}>
            <div className={s.container}>
                <h1 className={s.title}>VIDEOGAMES APP</h1>
                <NavLink className={s.link} to="/home">
                    <div>
                        <h1 className={s.h1}></h1>
                    </div>
                </NavLink>
            </div>
        </div>
    );
}

export default LandingPage;