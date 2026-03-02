import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import '../components/ComponentStyle.css';


export const SearchBar = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();


    const [inputValue, setInputValue] = useState("");


    const allItems = [
        ...(store.characters || []).map(item => ({ ...item, type: "people" })),
        ...(store.planets || []).map(item => ({ ...item, type: "planets" })),
        ...(store.starships || []).map(item => ({ ...item, type: "starships" }))
    ];

    const filteredItems = allItems.filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        inputValue.trim() !== ""
    );


    const itemSelected = (type, uid) => {
        console.log("Navegando a:", `/details/${type}/${uid}`); 
        navigate(`/details/${type}/${uid}`);
        setInputValue("");
    };

    return (

        <div className="w-50 mx-auto mb-4 position-relative">
            <input
                type="text"
                className="SearchInput form-control yellowText yellowBorder bg-transparent"
                placeholder="Luke, Tatooine..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />

            {filteredItems.length > 0 && (
                <ul className="custom-dropdown w-100 shadow-lg">
                    {filteredItems.map((item, index) => (
                        <li
                            key={`${item.type}-${item.uid}`}
                            onClick={() => itemSelected(item.type, item.uid)}
                            className="dropdown-item-sw d-flex justify-content-between align-items-center"
                        >

                            <span className="item-name">{item.name}</span>
                            <span className="item-type badge">
                                {item.type}
                            </span>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};