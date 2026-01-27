import { Link } from "react-router-dom";
const Home = ({ packages }) => {

	// Trier les packages en ordre descendant
	const sortedPackages = [...packages].sort((a, b) => {
		const dateA = a.dateMiseAJour || a.dateCreation;
		const dateB = b.dateMiseAJour || b.dateCreation;
		return new Date(dateB) - new Date(dateA);
	});

	// Prendre les 6 premiers
	const recentPackages = sortedPackages.slice(0, 6);	
	return (
		<>
			<div className="div-title">
				<h1 className="text-center title-show ">
					Nos forfaits récents
				</h1>
			</div>
			<div className="grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
				{/* Boucle dans les 6 derniers forfaits enregistrés */}
				{recentPackages.map((item) => {
					// Trouver une image valide
					const validImages = Array.isArray(item.images)
						? item.images.filter((img) => img?.trim() !== "")
						: [];

					const imageUrl =
						validImages.length > 0
							? validImages[0] + "?w=600&auto=format&fit=crop&q=70"
							: "https://via.placeholder.com/300x200?text=Pas+d'image";

					return (
						<div key={item.id} className="grid-item">
							<div className="card pb-0">
								<picture>
  									<source media="(max-width: 640px)" srcSet={validImages[0] + "?w=400&auto=format&q=70"} />
									<img
										src={imageUrl}
										alt={`Image du forfait ${item.nom}`}
										className="w-full h-auto aspect-[5/3] object-cover rounded bg-gray-200"
										loading="lazy" decoding="async"
									/>
								</picture>
								<div className="carte-info">
									<h4 className="text-md">
										{item.nom}
									</h4>
									<p className="text-lg">
										<strong>Categorie : </strong>
										<em>{item.categorie}</em>
									</p>
									
									<a
									href={`/forfait/${item.id}`}
									className="flex justify-center text-white text-lg"
									>
										En savoir plus
									</a>									
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<Link to="/forfaits" className="text-blue-600 hover:cursor-pointer">
				Forfaits
			</Link>
		</>
	);
};

export default Home;
