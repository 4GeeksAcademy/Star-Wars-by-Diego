import React from "react";
import { Link } from "react-router-dom";
import '../components/ComponentStyle.css';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { BASE_URL } from "../Services/Services";
import { useEffect } from "react";




export const Starships = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const getStarships = async () => {
            try {
                const res = await fetch(`${BASE_URL}starships/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await res.json();

                dispatch({ type: 'GET_Starships', payload: data.results });

            } catch (err) {
                console.log("Error:", err);
            }
        };

        getStarships(); // 
    }, []);



    const setFavorite = (ship) => {


        const isFavorite = store.favoritesList.some(fav => fav.name === ship.name);

        const updateFavorites = isFavorite ? store.favoritesList.filter(fav => fav.name !== ship.name) : [...store.favoritesList, ship];
        dispatch({ type: 'SET_Favorites', payload: updateFavorites });
        localStorage.setItem("favoritesList", JSON.stringify(updateFavorites))
    };




    return (

        <div className="container-fluid mt-5">
            <h1 className="text-center textYellow sw-title mb-4">Starships</h1>

            {/* Contenedor del Carrusel */}
            <div className="d-flex flex-row overflow-auto pb-4 scroll-container">
                {store.starships && store.starships.map((ship) => {
                    const isFav = store.favoritesList.some(fav => fav.name === ship.name);
                    return (
                        <div className="px-3" key={ship.uid}>
                            <div className="card sw-card" style={{ minWidth: '18rem' }}>
                                <img
                                    src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/starships/${ship.uid}.jpg`}
                                    className="card-img-top sw-img"
                                    alt={ship.name}
                                    onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                                />
                                <div className="card-body bg-dark text-light border-top border-warning">
                                    <h5 className="card-title sw-char-name text-center">{ship.name}</h5>
                                    <div className="d-flex justify-content-center gap-3 py-2">
                                        <Link to={`/details/starships/${ship.uid}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => setFavorite(ship)}
                                            type="button"
                                            className="btn yellowBorderThin yellowText btnYellow"
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