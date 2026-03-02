import React from "react";
import { Link } from "react-router-dom";
import '../components/ComponentStyle.css';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { BASE_URL } from "../Services/Services";
import { useEffect } from "react";




export const Planets = () => {
    const { store, dispatch } = useGlobalReducer();

   useEffect(() => {
          const getPlanets = async () => {
              try {
                  const res = await fetch(`${BASE_URL}planets/`, {
                      method: "GET",
                      headers: {
                          "Content-Type": "application/json"
                      },
                  });
  
                  const data = await res.json();
  
                  dispatch({ type: 'GET_Planets', payload: data.results });
  
              } catch (err) {
                  console.log("Error:", err);
              }
          };
  
          getPlanets(); // 
      }, []);
  
  
  
      const setFavorite = (plan) => {
  
          
          const isFavorite = store.favoritesList.some(fav => fav.name === plan.name);
  
          const updateFavorites = isFavorite ? store.favoritesList.filter(fav => fav.name !== plan.name) : [...store.favoritesList, plan];
          dispatch({ type: 'SET_Favorites', payload: updateFavorites });
          localStorage.setItem("favoritesList", JSON.stringify(updateFavorites))
      };
  
  
  
  
      return (
  
  <div className="container-fluid mt-5">
              <h1 className="text-center textYellow sw-title mb-4">Planets</h1>
              
              {/* Contenedor del Carrusel */}
              <div className="d-flex flex-row overflow-auto pb-4 scroll-container">
                  {store.planets && store.planets.map((plan) => {
                      const isFav = store.favoritesList.some(fav => fav.name === plan.name);
                      return (
                          <div className="px-3" key={plan.uid}>
                              <div className="card sw-card" style={{ minWidth: '18rem' }}>
                                  <img
                                      src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/planets/${plan.uid}.jpg`}
                                      className="card-img-top sw-img"
                                      alt={plan.name}
                                      onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
                                  />
                                  <div className="card-body bg-dark text-light border-top border-warning">
                                      <h5 className="card-title sw-char-name text-center">{plan.name}</h5>
                                      <div className="d-flex justify-content-center gap-3 py-2">
                                          <Link to={`/details/${plan.uid}`}> 
                                          <button type="button" className="btn btn-outline-info">
                                              <i className="fa-solid fa-eye"></i>
                                          </button>
                                          </Link>
                                          <button 
                                              onClick={() => setFavorite(plan)} 
                                              type="button" 
                                              className="btn yellowBorder yellowText btnYellow"
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