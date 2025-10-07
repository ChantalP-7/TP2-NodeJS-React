const Home = ({ packages }) => {	
	

	// Trier les packages en ordre descendant
	const sortedPackages = [...packages].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	// Prendre les 6 premiers
	const recentPackages = sortedPackages.slice(0, 6);

	return (
		<>
			<div className="div-title">
				<h1 className="text-center title-show ">
					Nos forfaits récents
				</h1>
			</div>
			<div className="grid-container">
				{/* Boucle dans les 6 derniers forfaits enregistrés */}
				{recentPackages.map((item) => {
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
							<div className="card pb-5">
								<img
									src={imageUrl}
									alt={`Image du forfait ${item.nom}`}
									className="w-full h-auto aspect-[5/3] object-cover rounded mb-2"
								/>
								<div className="carte-info">
									<h3 className="font-bold text-2xl">
										{item.nom}
									</h3>
									<p className="text-xl">
										<strong>Categorie : </strong>
										<em>{item.categorie}</em>
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
				})}
			</div>
		</>
	);
};

export default Home;
