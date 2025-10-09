import { useState } from "react";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = ({
	title = "Vol au bout du monde",
	toggleForm,
	showAdd
	
}) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};
	const location = useLocation();
	return (
		<header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0">			
			<div className="flex flex-col md:flex-row items-center gap-5 p-0 text-center">
				<a href="/" className="cursor-pointer md:gap-0">
					<img
						className="logo md:gap-0"
						src="../../Logo-transparent.png"
						alt="Logo"
					/>
				</a>
				<h1 className="brand [text-shadow:_0_2px_4px_rgb(99_102_241_/_0.8)]">
					{title}
				</h1>
			</div>			
			<div>
				<Button
					className="btnAdd hover:cursor-pointer"
					nom={showAdd ? "Fermer" : "Ajouter un forfait"}
					onClick={toggleForm}
				/>
			</div>
			<nav className="w-full md:w-auto relative flex flex-col md:flex-row items-center gap-5 p-0">
				{/* Menu burger visible sur mobile */}
				<div className="lg:hidden">
					<button
						id="menu-btn"
						className="text-2xl focus:outline-none cursor-pointer"
						onClick={toggleMenu}
					>
						<svg
							width="30"
							height="30"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							color="#fff"
						>
							<path
								fill-rule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
				</div>

				{/* Menu mobile (affiché quand menuOpen est true) */}
				<ul
					id="menu"
					className={`flex flex-col gap-2 mt-4 bg-white p-4 rounded shadow ${
						menuOpen ? "block" : "hidden"
					}`}
				>
					<li className="text-black font-bold">
						<NavLink
							to="/"
							className="hover:text-blue-500"
							onClick={() => setMenuOpen(false)}
						>
							Accueil
						</NavLink>
					</li>
					<li className="text-black font-bold">
						<NavLink
							to="/About"
							className="hover:text-blue-500"
							onClick={() => setMenuOpen(false)}
						>
							À propos
						</NavLink>
					</li>
					<li className="text-black font-bold">
						<NavLink
							to="/forfaits"
							className="hover:text-blue-500"
							onClick={() => setMenuOpen(false)}
						>
							Forfaits
						</NavLink>
					</li>
				</ul>

				{/* Menu desktop */}
				<ul className="hidden lg:flex nav-link  space-x-6 items-center">
					<li>
						<NavLink
							to="/"
							className={({ isActive }) =>
								isActive ? "nav-link active" : "nav-link"
							}
						>
							Accueil
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/About"
							className={({ isActive }) =>
								isActive ? "nav-link active" : "nav-link"
							}
						>
							À propos
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/forfaits"
							className={({ isActive }) =>
								isActive ? "nav-link active" : "nav-link"
							}
						>
							Forfaits
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default Header;
