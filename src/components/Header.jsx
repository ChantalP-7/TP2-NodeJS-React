import Button from "./Button";
const Header = ({ title = "Liste des forfaits", toggleForm, showAdd }) => {
	/*const onClick = () => {
		console.log("click component");
	};*/

	return (
		<header className="flex justify-between items-center mb-8">
			<h1 className="text-2xl">{title}</h1>
			<Button
				text={showAdd ? "Close" : "Add"}
				onClick={toggleForm}
				color="btn-green"
			/>
		</header>
	);
};

export default Header;
