const Button = ({ color = "", textColor = "white", textSize = "text-xl", nom = "Ajouter un forfait", onClick }) => {
	return (
		<button onClick={onClick} className="btnAdd ">
			{nom}
		</button>
	);
};

export default Button;
