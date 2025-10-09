import { useState, useEffect } from "react";

const AllPackages = ({ packages }) => {
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const packagesPerPage = 9;

	// Filtrage par catégorie
	const categories = [...new Set(packages.map((p) => p.categorie))];

	const filteredForfaits =
		selectedCategory === "all"
			? packages
			: packages.filter((p) => p.categorie === selectedCategory);

	// Réinitialiser la page lors du changement de catégorie
	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory]);

	// Pagination
	const startIndex = (currentPage - 1) * packagesPerPage;
	const endIndex = startIndex + packagesPerPage;
	const currentPackages = filteredForfaits.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filteredForfaits.length / packagesPerPage);

	const goToNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl text-white font-bold mb-10">
				Tous les Forfaits
			</h1>

			<div className="flex flex-wrap gap-5 mb-6">
				<button
					onClick={() => setSelectedCategory("all")}
					className={`px-6 py-2 rounded-full  text-2xl ${
						selectedCategory === "all"
							? "btn-aqua text-white"
							: "bg-white text-gray-700"
					}`}
				>
					Tous
				</button>
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => setSelectedCategory(cat)}
						className={`px-4 py-2 rounded-full text-2xl ${
							selectedCategory === cat
								? "btn-aqua text-white"
								: "bg-white text-gray-700 hover"
						}`}
					>
						{cat}
					</button>
				))}
			</div>

			<div className="grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
				{currentPackages.length > 0 ? (
					currentPackages.map((item) => {
						const validImages = Array.isArray(item.images)
							? item.images.filter((img) => img?.trim() !== "")
							: [];

						const imageUrl =
							validImages.length > 0
								? validImages[0]
								: "https://via.placeholder.com/300x200?text=Pas+d'image";

						return (
							<div key={item.id} className="grid-item ">
								<div
									key={item.id}
									className="card pb-5 rounded-lg shadow overflow-hidden"
								>
									<img
										src={imageUrl}
										alt={item.nom}
										className="w-full h-auto aspect-[4/2] object-cover rounded mb-2"
									/>
									<div className="carte-info">
										<h3 className="font-bold text-2xl">
											<strong>{item.nom}</strong>
										</h3>
										<p className="text-sm text-gray-900 ">
											<strong>Catégorie : </strong>
											{item.categorie}
										</p>

										<a
											href={`/forfait/${item.id}`}
											className="text-xl text-blue-600 hover"
										>
											En savoir plus
										</a>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p>Aucun forfait trouvé pour cette catégorie.</p>
				)}
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-8">
					<button
						onClick={goToPreviousPage}
						disabled={currentPage === 1}
						className="px-4 py-2 btn-aqua text-white mt-50 mb-50 rounded text-2xl disabled:text:gray"
					>
						Précédent
					</button>
					<span className=" text-3xl font-bold ">
						Page {currentPage} sur {totalPages}
					</span>
					<button
						onClick={goToNextPage}
						disabled={currentPage === totalPages}
						className="px-4 py-2 rounded btn-aqua text-white text-2xl mt-50 mb-50 disabled:text-gray"
					>
						Suivant
					</button>
				</div>
			)}
		</div>
	);
};

export default AllPackages;
