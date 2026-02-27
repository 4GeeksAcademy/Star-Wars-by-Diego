import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const Navbar = () => {

    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {

        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (store.favoritesList?.length === 0 && savedFavorites.length > 0)
            dispatch({ type: "SET_Favorites", payload: savedFavorites });



    }, [dispatch, store.favoritesList]

    );

    const removeFavorite = (name) => {
        const updatedList = store.favoritesList.filter(item => item.name !== name);
        dispatch({ type: "SET_Favorites", payload: updatedList });
        localStorage.setItem("favoritesList", JSON.stringify(updatedList));
    };

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark border-bottom border-warning py-2 shadow-lg">
            <div className="container d-flex justify-content-between align-items-center">

                <Link className="navbar-brand m-0" to="/">
                    <img
                        className="LogoStarwars"
                        src="./src/assets/img/Star_Wars_Logo.png"
                        alt="Star Wars"
                        style={{ width: "120px" }}
                    />
                </Link>

             
                <div className="dropdown">
                    <button
                        className="btn_favorites btn dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="dropdownFavorites"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <span className="me-2">Favorites</span>
                        <span className="btn_favoritesCounter badge bg-dark rounded-pill">
                            {store.favoritesList?.length || 0}
                        </span>
                    </button>

                    <ul
                        className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow-lg border-warning"
                        aria-labelledby="dropdownFavorites"
                        style={{ minWidth: "220px" }}
                    >
                        {store.favoritesList && store.favoritesList.length > 0 ? (
                            store.favoritesList.map((fav, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center px-3 py-1">
                                    <span className="listFavorites text-truncate me-2" style={{ maxWidth: "150px" }}>
                                        {fav.name}
                                    </span>
                                    <i
                                        className="fa-solid fa-trash text-danger cursor-pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeFavorite(fav.name)}
                                    ></i>
                                </li>
                            ))
                        ) : (
                            <li className="text-center py-2 text-muted">
                                <em>(Empty)</em>
                            </li>
                        )}
                        
                      
                    </ul>
                </div>

            </div>
        </nav>
            );
};