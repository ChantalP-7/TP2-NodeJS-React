const Button = ({ color = "btn-blue", nom, onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{ backgroundColor: color }}
			className="btn btn-blue text-white font-bold py-2 px-4 rounded"
		>
			{nom}
		</button>
	);
};

export default Button;
