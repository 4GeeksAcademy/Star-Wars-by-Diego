import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../Services/Services";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Details = () => {
    const { theId } = useParams();
    const {store, dispatch} = useGlobalReducer();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}people/${theId}`)
            .then(res => res.json())

            .then(data => {
                setItem(data.result.properties);
                dispatch({ type: 'GET_Details', payload: data.result.properties });
            })
            .catch(err => console.error(err));
    }, [theId, dispatch]);

    if (!item) return <h2 className="text-warning text-center mt-5">Loading data from archive...</h2>;

    return (
        <div className="container mt-5 pt-5">
            <div className="card mb-3 bg-dark text-white border-warning shadow-lg">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${theId}.jpg`}
                            className="img-fluid rounded-start border-end border-warning"
                            alt={item.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title sw-title mb-4">{item.name}</h1>

                            <div className="row text-details border-top border-secondary pt-3 mt-3 text-center">
                                <div className="col"><strong>Birth Year</strong><br />{item.birth_year}</div>
                                <div className="col"><strong>Gender</strong><br />{item.gender}</div>
                                <div className="col"><strong>Height</strong><br />{item.height}cm</div>
                                <div className="col"><strong>Skin Color</strong><br />{item.skin_color}</div>
                                <div className="col"><strong>Eye Color</strong><br />{item.eye_color}</div>
                            </div>

                            <p className="card-text mt-4 text-secondary">
                                <strong>Description:</strong> <br/>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec ligula ac sem dignissim consequat at ac dui. Nulla scelerisque odio ligula, eu volutpat purus elementum sed. Maecenas sodales, ipsum at lobortis laoreet, ante nisi vulputate tellus, ut fringilla sapien magna consectetur ipsum. Integer imperdiet mauris sed diam tempor, vehicula venenatis erat pharetra. Suspendisse gravida sem nisi, sit amet placerat felis malesuada mollis. Duis quis condimentum ex.
                            </p>

                            <Link to="/" className="btn btn-outline-warning mt-3">
                                <i className="fa-solid fa-arrow-left me-2"></i> Back to Galaxy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};