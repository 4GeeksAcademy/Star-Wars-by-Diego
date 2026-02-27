
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Characters } from "../components/Characters.jsx";
import { Starships } from "../components/Starships.jsx";
import { Planets } from "../components/Planets.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()





	return (


		<div className="d-flex flex-column gap-5">
			<Characters className="my-5"/>
			<Starships className="my-5"/>
			<Planets className="my-5"/>

		</div>

		
	);
}; 