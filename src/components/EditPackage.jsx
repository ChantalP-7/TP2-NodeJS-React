import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopUpSuccess from "./PopUpSuccess"; 
import { useLocation } from "react-router-dom";
const location = useLocation();
const forfait = location.state?.forfait;

const EditPackage = ({onEdit, categories = [] }) => {
	const { id } = useParams();
	const navigate = useNavigate();

	// États pour chaque champ
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");
	const [prix, setPrix] = useState("");
	const [categorie, setCategorie] = useState("");	
	const [dateMiseAJour, setDateMiseAJour] = useState("");
	const [images, setImages] = useState([]);
	const validImages = images.filter((img) => img?.trim() !== "");
	const [successMessage, setSuccessMessage] = useState(""); // Message de succès

	useEffect(() => {
	if (forfait) {
		setNom(forfait.nom || "");
		setDescription(forfait.description || "");
		setPrix(
		forfait.prix !== undefined && forfait.prix !== null
			? forfait.prix.toString()
			: ""
		);
		setCategorie(forfait.categorie || "");
		setDateMiseAJour(forfait.dateMiseAJour || "");
		setImages(Array.isArray(forfait.images) ? forfait.images : []);
	}
}, [forfait]);


	// Section images

	const handleImageChange = (index, value) => {
		const updatedImages = [...images];
		updatedImages[index] = value;
		setImages(updatedImages);
	};

	const addImageInput = () => {
		if (images.length < 5) {
			setImages([...images, ""]);
		}
	};

	const removeImageInput = (index) => {
		const updatedImages = [...images];
		updatedImages.splice(index, 1);
		setImages(updatedImages);
	};

	// Soumission du formulaire

	const onSubmit = async (e) => {
		e.preventDefault();

		const updatedPackage = {
			nom,
			description,
			prix: parseFloat(prix),
			categorie,
			dateMiseAJour,
			images: images.filter((img) => img.trim() !== ""), // nettoyer les vides
		};

		try {
			const res = await fetch(`/forfaits.json/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedPackage),
			});

			if (!res.ok) {
				throw new Error("Échec de la mise à jour du forfait");
			}
			const data = await res.json(); // contient le nouveau forfait avec son id

			navigate(`/forfait/${data.id}`, {
				state: {
					
					successMessage: `Le forfait a bien été modifié!`,
				},
			});
			

		} catch (error) {
			console.error("Erreur lors de la modification :", error);
		}
	};

	return (
		<div className="formulaire p-6 max-w-xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Éditer le Forfait</h2>
			<PopUpSuccess
				message={successMessage}
				onClose={() => setSuccessMessage("")}
			/>
			{validImages.length > 0 ? (
				<div className=" grid grid-cols-2 gap-4 my-4">
					{validImages.map((img, i) => (
						<img
							key={i}
							src={img}
							alt={`Image ${i + 1}`}
							className="w-full h-48 object-cover rounded"
						/>
					))}
				</div>
			) : (
				<p className="italic text-gray-600">
					Aucune image valide à afficher.
				</p>
			)}
			<form className="space-y-4" onSubmit={onSubmit}>
				<div className="form-control mt-5">
					<label>Forfait</label>
					<input
						type="text"
						className="w-full p-2 border rounded"
						value={nom}
						onChange={(e) => setNom(e.target.value)}
						required
					/>
				</div>
				<div className="form-control mt-5">
					<label>Détail du forfait</label>
					<textarea
						className="w-full p-2 border rounded"
						rows={3}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div className="form-control mt-5">
					<label>Prix</label>
					<input
						type="number"
						className="w-full p-2 border rounded"
						value={prix}
						onChange={(e) => setPrix(e.target.value)}
						required
						placeholder="Minimum: 500.00$"
						min={500.0}
						step={50.0}
					/>
				</div>
				<div className="form-control mt-5">
					<label>Catégorie</label>
					<select
						value={categorie}
						className="block px-3 py-2 text-base text-gray-700 bg-white border border-blue-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-5"
						onChange={(e) => setCategorie(e.target.value)}
						required
					>
						<option value="">Sélectionner une catégorie</option>
						{categories.map((cat, index) => (
							<option key={index} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>
				<div className="form-control mt-5">
					<label>Date de mise à jour</label>
					<input
						type="date"
						className="w-full p-2 border rounded"
						value={dateMiseAJour}
						onChange={(e) => setDateMiseAJour(e.target.value)}
						required
					/>
				</div>
				<div className="ligneBasse">
					<p></p>
				</div>
				<div className="form-control mt-5 ">
					<p className="text-lg mb-5 text-green-900">
						Ajoute jusqu'à 5 url d'images.
					</p>
					<div className="flex md:place-content gap-5 mb-5">
						<a
							className="underline bold  text-blue-600 cursor-pointer text-xl font-bold hover-text-green-600"
							href="https://pixabay.com/fr/photos/search/voyage/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Pixabay
						</a>
						<a
							className="underline bold  text-blue-600 cursor-pointer text-xl font-bold hover-text-green-600"
							href="https://unsplash.com/fr/s/photos/Voyages"
							target="_blank"
							rel="noopener noreferrer"
						>
							Unsplash
						</a>
						<a
							className="underline bold  text-blue-600 cursor-pointer text-xl font-bold hover-text-green-600"
							href="https://www.pexels.com/fr-fr/chercher/voyage/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Pexels
						</a>
					</div>
					<label className="mb-5">Ajoute des images</label>

					{images.map((url, index) => (
						<div
							key={index}
							className="flex items-center gap-2 mb-2"
						>
							<input
								type="url"
								placeholder={`Image ${index + 1}`}
								className="w-full p-2 border rounded mb-3"
								value={url}
								onChange={(e) =>
									handleImageChange(index, e.target.value)
								}
							/>
							{images.length > 1 && (
								<button
									type="button"
									onClick={() => removeImageInput(index)}
									className="text-red-500 cursor-pointer "
								>
									<svg
										width="28"
										height="28"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										color="red"
									>
										<path
											d="M0 0h24v24H0V0z"
											fill="none"
										></path>
										<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path>
									</svg>
								</button>
							)}
						</div>
					))}
					{images.length < 5 && (
						<button
							type="button"
							onClick={addImageInput}
							className="mt-20 btn btn-blue flex justify-center items-center "
						>
							<svg
								width="24"
								height="24"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								color="#fff"
							>
								<path d="M0 0h24v24H0z" fill="none"></path>
								<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
							</svg>
							<svg
								width="24"
								height="24"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								color="#fff"
							>
								<path d="M0 0h24v24H0z" fill="none"></path>
								<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
							</svg>
						</button>
					)}
				</div>
				<div className="ligneBasse">
					<p></p>
				</div>
				<button
					type="submit"
					className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
				>
					Enregistrer
				</button>
			</form>
		</div>
	);
};

export default EditPackage;
