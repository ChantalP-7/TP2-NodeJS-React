import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


const Package = ({ setShowAddPackage, onDelete, packages }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [successMessage, setSuccessMessage] = useState("");
	const [p, setPackage] = useState(null);
	const [previewImage, setPreviewImage] = useState(null);

	useEffect(() => {
		setShowAddPackage(false);

		if (!packages || packages.length === 0) {
			console.error("Pas de forfaits disponibles !");
			setPackage(null);
			return;
		}

		const foundPackage = packages.find((item) => item.id === id);
		if (foundPackage) {
			setPackage(foundPackage);
		} else {
			console.error("Forfait non trouvé pour l'id :", id);
			setPackage(null);
		}
	}, [id, setShowAddPackage, packages]);

	useEffect(() => {
		if (location.state?.successMessage) {
			const delayTimer = setTimeout(() => {
				setSuccessMessage(location.state.successMessage);
			}, 500); // Affiche après 1s

			const hideTimer = setTimeout(() => {
				setSuccessMessage("");
			}, 6000); // Disparaît 5s après l'affichage

			return () => {
				clearTimeout(delayTimer);
				clearTimeout(hideTimer);
			};
		}
	}, [location.state]);

	if (p === null) return <h1 text-white font-bold>Chargement...</h1>;

	// Formater les dates en français

	const formatDate = (dateString) => {
		if (!dateString) return "";
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("fr-FR", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	};

	const validImages = Array.isArray(p?.images)
		? p.images.filter((img) => img?.trim() !== "")
		: []; // Protéger les accès

	const mainImage =
		validImages.length > 0
			? validImages[0]
			: "https://via.placeholder.com/600x300?text=Pas+d'image";

	// Autres images (galerie)
	const galleryImages = validImages.slice(1);

	const handleDelete = () => {
		if (window.confirm("Voulez-vous vraiment supprimer ce forfait ?")) {
			onDelete(p.id);
			navigate("/");
		}
	};

	const handleEdit = () => {
		navigate(`/forfaits/${p.id}/edit`);
	};

	return (
		<>
			{successMessage && (
				<div className="fixed top-30 left-30 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 w-auto max-w-xs text-center text-sm sm:text-base">
					{successMessage}
				</div>
			)}
			<div className="div-title">
				<h1 className="text-center title-show">{p.nom} </h1>
			</div>
			<div className="bg-white single-package mx-4 sm:mx-8 md:mx-16 lg:mx-32 m-30 mt-30 border border-gray-200 shadow rounded-2xl p-2 sm:p-3 xs:p-2 mb-10">
				<div className="mt-4 mb-8 ">
					<img
						src={previewImage || mainImage}
						alt="Image principale du forfait"
						className="w-full h-auto aspect-[5/3] cover rounded-t-xl "
					/>
				</div>
				<h3 className="flex items-center justify-between font-bold text-2xl">
					{p.nom}
				</h3>
				<p className="text-xl  ">
					<strong>Description: </strong> {p.description}
				</p>
				<p>
					<strong>Prix: </strong> {p.prix}.00 $
				</p>
				<p className="mb-6">
					<strong>Catégorie: </strong> {p.categorie}
				</p>

				<p className="text-xl">
					<strong>Créé le : </strong>
					{formatDate(p.dateCreation)}
				</p>
				<p className="text-xl">
					<strong>Mis à jour le : </strong>{" "}
					{formatDate(p.dateMiseAJour)}
				</p>
				{galleryImages.length > 0 && (
					<div className="mt-10 ">
						<div className="ligneBasse">
							<p></p>
						</div>
						<h4 className="font-semibold mb-2">Galerie</h4>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
							{galleryImages.map((img, i) => (
								<img
									key={i}
									src={img}
									alt={`Galerie ${i + 1}`}
									className="w-full h-auto aspect-[5/3] object-cover transition-all duration-300 rounded-md cursor-pointer filter grayscale-0 hover:grayscale"
									onClick={() => setPreviewImage(img)}
								/>
							))}
						</div>
					</div>
				)}
				{previewImage && (
					<div
						className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.83)] flex items-center justify-center"
						onClick={() => setPreviewImage(null)}
					>
						<div onClick={(e) => e.stopPropagation()}>
							<img
								src={previewImage}
								alt="Aperçu"
								className="max-h-[90vh] max-w-[90vw] md:max-h-[90vw] md:max-w-[90vw] object-contain rounded shadow-lg"
							/>
						</div>
					</div>
				)}
				<div className="mt-10 flex flex-wrap gap-4 items-center">
					<Link
						to="/"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 hover-cursor-pointer text-sm sm:text-base"
					>
						Retour
					</Link>
					<button
						onClick={handleEdit}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-600 hover-cursor-pointer text-sm sm:text-base"
					>
						Éditer
					</button>
					<button
						onClick={handleDelete}
						className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 hover-cursor-pointer text-sm sm:text-base"
					>
						Supprimer
					</button>
				</div>
			</div>
		</>
	);
};

export default Package;
