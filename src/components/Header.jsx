import Button from "./Button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ title = "Vol au bout du monde", toggleForm, showAdd }) => {
	const location = useLocation();
	return (
		<header className="w-full flex  justify-between items-center mb-8">
			<h1 className="brand text-2xl [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)]">
				{title}
			</h1>
			<div>
				<Button
					className="btnAdd hover:cursor-pointer font-bold"
					nom={showAdd ? "Fermer" : "Ajouter un forfait"}
					onClick={toggleForm}
				/>
			</div>
			<nav className="flex align-items-center gap-4 bg-white p-4 rounded ">
				<Link
					to="/"
					className="text-blue-600 font-semibold hover:cursor-pointer"
				>
					Accueil
				</Link>
				<Link
					to="/forfaits"
					className="text-blue-600 hover:cursor-pointer"
				>
					Forfaits
				</Link>
			</nav>
		</header>
	);
};
export default Header;
