import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

const AddPackage = ({onAdd, categories = [] }) => {
	const navigate = useNavigate();

	// États pour chaque champ
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");
	const [prix, setPrix] = useState("");
	const [categorie, setCategorie] = useState("");
	const [images, setImages] = useState([""]);
	const [successMessage, setSuccessMessage] = useState("");

	const handleImageChange = (index, value) => {
		const addedImages = [...images];
		addedImages[index] = value;
		setImages(addedImages);
	};

	const addImageInput = () => {
		if (images.length < 5) setImages([...images, ""]);
	};

	const removeImageInput = (index) => {
		const removedImage = [...images];
		removedImage.splice(index, 1);
		setImages(removedImage);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nom || !description || !prix || !categorie) {
			alert("Tous les champs sont obligatoires");
			return;
		}

		const newPackage = {
			nom,
			description,
			prix,
			categorie,
			dateCreation: new Date().toISOString(),
  			dateMiseAJour: null,
			images: images.filter((url) => url.trim() !== ""), // filtrer les champs vides
		};

		onAdd(newPackage)

		try {
			// Fetch avant de faire "navigate()", évite d'avoir un id undefined lorsqu'on soumet le formulaire
			const res = await fetch(`http://localhost:5000/forfaits`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPackage),
			});

			if (!res.ok) {
				throw new Error("Échec de l'ajout du forfait");
			}

			const data = await res.json(); // contient le nouveau forfait avec son id

			navigate(`/forfait/${data.id}`, {
				state: { package: data, successMessage: `Forfait enregistré avec succès!` },
			});

		} catch (error) {
			console.error("Erreur lors de l'ajout' :", error);
		}
	};

	return (
		<div className="formulaire p-6 max-w-xl mx-auto">
			<h2 className="text-2xl font-bold mb-4">Ajouter un Forfait</h2>
			{successMessage && (
				<div className="bg-green-100 text-green-700 px-4 py-2 rounded mt-10">
					{successMessage}
				</div>
			)}
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="form-control mt-5">
					<label>Forfait</label>
					<input
						type="text"
						className="w-full p-2 border rounded"
						value={nom}
						onChange={(e) => setNom(e.target.value)}
						placeholder="Nom du forfait"
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
						placeholder="Description"
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
									className="text-red-500 cursor-pointer"
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

export default AddPackage;
