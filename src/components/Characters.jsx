import React from "react";
import { Link } from "react-router-dom";
import '../components/ComponentStyle.css';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { BASE_URL } from "../Services/Services.js";
import { useEffect } from "react";
import { Details } from "../pages/Details.jsx";




export const Characters = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const getCharacters = async () => {
            try {
                const res = await fetch(`${BASE_URL}people/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await res.json();

                dispatch({ type: 'GET_Characters', payload: data.results });

            } catch (err) {
                console.log("Error:", err);
            }
        };

        getCharacters(); // 
    }, []);



    const setFavorite = (char) => {

        
        const isFavorite = store.favoritesList.some(fav => fav.name === char.name);

        const updateFavorites = isFavorite ? store.favoritesList.filter(fav => fav.name !== char.name) : [...store.favoritesList, char];
        dispatch({ type: 'SET_Favorites', payload: updateFavorites });
        localStorage.setItem("favoritesList", JSON.stringify(updateFavorites))
    };




    return (

<div className="container-fluid mt-5">
            <h1 className="text-center sw-title mb-4">Characters</h1>
            
            {/* Contenedor del Carrusel */}
            <div className="d-flex flex-row overflow-auto pb-4 scroll-container">
                {store.characters && store.characters.map((char) => {
                    const isFav = store.favoritesList.some(fav => fav.name === char.name);
                    return (
                        <div className="px-3" key={char.uid}>
                            <div className="card sw-card" style={{ minWidth: '18rem' }}>
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${char.uid}.jpg`}
                                    className="card-img-top sw-img"
                                    alt={char.name}
                                    onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                                />
                                <div className="card-body bg-dark text-light border-top border-warning">
                                    <h5 className="card-title sw-char-name text-center">{char.name}</h5>
                                    <div className="d-flex justify-content-center gap-3 py-2">
                                        <Link to={`/details/${char.uid}`}> 
                                        <button type="button" className="btn btn-outline-info">
                                            <i className="fa-solid fa-eye"></i>
                                        </button>
                                        </Link>
                                        <button 
                                            onClick={() => setFavorite(char)} 
                                            type="button" 
                                            className="btn btn-outline-warning"
                                        >
                                            <i className={`${isFav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
       
    )
}