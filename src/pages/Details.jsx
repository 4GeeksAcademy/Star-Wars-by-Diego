import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../Services/Services";
import useGlobalReducer from "../hooks/useGlobalReducer";
import './DetailsStyle.css'

export const Details = () => {
    const { theType, theId } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [item, setItem] = useState(null);

    useEffect(() => {

        setItem(null);

        fetch(`${BASE_URL}${theType}/${theId}`)
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    setItem(data.result.properties);
                    dispatch({ type: 'GET_Details', payload: data.result.properties });
                }
            })
            .catch(err => console.error(err));
    }, [theType, theId, dispatch]);

    if (!item) return <h2 className="yellowText text-center mt-5">Loading data from archive...</h2>;


    const getImgFolder = () => {
        if (theType === "people") return "characters";

        return theType;
    };
    return (
        <div className="container mt-5 pt-5">
            <div className="card mb-3 bg-dark text-white yellowBorder shadow-lg">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img

                            src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${getImgFolder()}/${theId}.jpg`}
                            className="img-fluid rounded-start border-end border-warning"
                            alt={item.name}

                            onError={(e) => {
                                e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title sw-title mb-4">{item.name}</h1>

                            <div className="row text-details yellowText border-top border-secondary pt-3 mt-3 text-center">
                                {theType === "people" && (
                                    <>
                                        <div className="col"><strong>Birth Year</strong><br />{item.birth_year}</div>
                                        <div className="col"><strong>Gender</strong><br />{item.gender}</div>
                                        <div className="col"><strong>Height</strong><br />{item.height}cm</div>
                                        <div className="col"><strong>Skin Color</strong><br />{item.skin_color}</div>
                                    </>
                                )}
                                {theType === "planets" && (
                                    <>
                                        <div className="col"><strong>Climate</strong><br />{item.climate}</div>
                                        <div className="col"><strong>Terrain</strong><br />{item.terrain}</div>
                                        <div className="col"><strong>Diameter</strong><br />{item.diameter}km</div>
                                        <div className="col"><strong>Population</strong><br />{item.population}</div>
                                    </>
                                )}
                                {theType === "starships" && (
                                    <>
                                        <div className="col"><strong>Model</strong><br />{item.model}</div>
                                        <div className="col"><strong>Class</strong><br />{item.starship_class}</div>
                                        <div className="col"><strong>Passangers</strong><br />{item.passengers}</div>
                                        <div className="col"><strong>Cost</strong><br />{item.cost_in_credits}</div>
                                    </>
                                )}
                            </div>

                            <p className="card-text mt-4 text-secondary">
                                <strong>Description:</strong> <br />
                                {item.description || `A fascinating from the Star Wars universe. More data is currently being retrieved from the Jedi archives.`}
                            </p>

                            <Link to="/" className="btn linkText mt-3">
                                <i className="fa-solid fa-arrow-left me-2"></i> Back to Galaxy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};