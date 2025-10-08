import { useEffect, useState } from "react";

const PopUpSuccess = ({ message, onClose }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (message) {
			// Fade in
			const showTimer = setTimeout(() => {
				setVisible(true);
			}, 100); // petit délai pour forcer l’animation

			// Fade out après 5s
			const hideTimer = setTimeout(() => {
				setVisible(false);
				// Supprimer le message après l’animation
				setTimeout(onClose, 500);
			}, 8000);

			return () => {
				clearTimeout(showTimer);
				clearTimeout(hideTimer);
			};
		}
	}, [message, onClose]);

	if (!message) return null;

	return (
		<div
			className={`fixed top-6 right-6 bg-green-500 text-white px-4 text-2xl py-4 rounded shadow-lg z-50 transition-opacity duration-500 ease-in-out
				${visible ? "opacity-100" : "opacity-0"}
			`}
		>
			{message}
			<button
				onClick={() => {
					setVisible(false);
					setTimeout(onClose, 500);
				}}
				className="ml-4 font-bold text-white text-xl"
			>
				X
			</button>
		</div>
	);
};

export default PopUpSuccess;
