import { useState } from "react";
import { Link } from "react-router-dom";

const AllPackages = ({ packages }) => {

	// Pagination : 9 forfaits par page
	const [currentPage, setCurrentPage] = useState(1);
	const packagesPerPage = 9;

	// 1. Calculer les indices du slice
	const startIndex = (currentPage - 1) * packagesPerPage;
	const endIndex = startIndex + packagesPerPage;

	// 2. Découper les forfaits à afficher
	const currentPackages = packages.slice(startIndex, endIndex);

	// 3. Nombre total de pages
	const totalPages = Math.ceil(packages.length / packagesPerPage);

	// 4. Navigation
	const goToNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<>
			<div className="div-title">
				<h1 className="text-center title-show ">Tous nos forfaits</h1>
			</div>
			<div className="grid-container">
				{currentPackages.map((item) => {
					// Trouver une image valide
					const validImages = Array.isArray(item.images)
						? item.images.filter((img) => img?.trim() !== "")
						: [];

					const imageUrl =
						validImages.length > 0
							? validImages[0]
							: "https://via.placeholder.com/300x200?text=Pas+d'image";

					return (
						<div key={item.id} className="grid-item">
							<div className="card  pb-5">
								<img
									src={imageUrl}
									alt={`Image du forfait ${item.nom}`}
									className="w-full h-48 object-cover rounded mb-2"
								/>
								<div className="carte-info">
									<h3 className="font-bold text-2xl">
										{item.nom}
									</h3>
									<p className="text-xl">
										<strong>Categorie :</strong>
										<em>{item.categorie}</em>
									</p>
									<a
										href={`/forfait/${item.id}`}
										className="text-xl text-blue-600"
									>
										En savoir plus
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex justify-center mb-10 mt-6 gap-4 items-center">
				<button
					onClick={goToPreviousPage}
					disabled={currentPage === 1}
					className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
				>
					Précédent
				</button>
				<span>
					Page {currentPage} sur {totalPages}
				</span>
				<button
					onClick={goToNextPage}
					disabled={currentPage === totalPages}
					className="px-3 py-1 bg-blue-500  text-white rounded disabled:opacity-50"
				>
					Suivant
				</button>
			</div>
		</>
	);
};

export default AllPackages;
