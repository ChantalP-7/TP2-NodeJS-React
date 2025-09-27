const fs = require("fs");

const destinations = [
	"Paris",
	"Rome",
	"Barcelone",
	"Tokyo",
	"New York",
	"Cancún",
	"Le Caire",
	"Bangkok",
	"Bali",
	"Marrakech",
	"Sydney",
	"Londres",
	"Lisbonne",
	"Rio de Janeiro",
	"Cape Town",
	"Montréal",
	"Prague",
	"Vienne",
	"Amsterdam",
	"Dubaï",
	"Hanoï",
	"Istanbul",
	"Athènes",
	"Séoul",
	"Budapest",
];

const descriptions = [
	"Découvrez la beauté de la ville avec un guide local et des activités inoubliables.",
	"Un séjour parfait pour les amateurs de culture et de gastronomie.",
	"Explorez les plages, détendez-vous et profitez du soleil.",
	"Un mélange d’aventure et de détente dans une destination exotique.",
	"Visitez les sites historiques les plus emblématiques et vivez une expérience unique.",
	"Parfait pour les familles à la recherche de vacances divertissantes.",
	"Une immersion totale dans la culture locale avec des visites exclusives.",
	"Profitez de paysages à couper le souffle et d’activités en plein air.",
	"Un circuit complet pour découvrir tous les trésors cachés de la région.",
	"Idéal pour un séjour romantique ou une lune de miel inoubliable.",
];

const categories = [
	"Plage",
	"Culture",
	"Aventure",
	"Historique",
	"Nature",
	"Gastronomie",
	"Romantique",
	"Famille",
];

function getRandomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

const genererForfaits = (f) => {
	const forfaits = [];
	for (let i = 0; i < f; i++) {
		const destination = getRandomItem(destinations);
		forfaits.push({
			nom: `Séjour à ${destination}`,
			description: getRandomItem(descriptions),
			prix: +(Math.random() * (3500 - 800) + 800).toFixed(2),
			duree: `${Math.floor(Math.random() * 11 + 5)} jours`,
			categorie: getRandomItem(categories),
		});
	}
	return { forfaits };
}

const data = genererForfaits(25);

// Sauvegarde dans un fichier
fs.writeFileSync(
	"forfaits_voyages.json",
	JSON.stringify(data, null, 2),
	"utf-8"
);

console.log('Forfaits de voyage générés!')
