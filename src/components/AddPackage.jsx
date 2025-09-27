import { useState } from "react";
const AddPackage = ({ onAdd }) => {
	const [nom, setNom] = useState("");
	const [description, setDescription] = useState("");
	const [prix, setPrix] = useState("");
	const [categorie, setCategorie] = useState("");

	const onSubmit = (e) => {
		// console.log(e)
		e.preventDefault();
		// console.log(text)
		if (!nom) {
			alert("SVP, ajoute un forfait");
			return;
		}
		onAdd({ nom, description, prix, categorie });
		setNom("");
		setDescription("");
		setPrix("");
		setCategorie("");

		 console.log({nom, description, prix, categorie})
	};

	return (
		<form className="add-form" onSubmit={onSubmit}>
			<div className="form-control">
				<label>Forfait</label>
				<input
					type="text"
					placeholder="Forfait"
					value={nom}
					onChange={(e) => setNom(e.target.value)}
				/>
			</div>
			<div className="form-control">
				<label>Détail du forfait</label>
				<textarea
					placeholder="Ajoute une description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={3}
				/>
			</div>
			<div className="form-control">
				<label>Prix</label>
				<input
					type="double"
					value={prix}
                    min={500.00}
                    step={0.01}
                    placeholder="Ajoute un prix"
					onChange={(e) => setPrix(e.target.value)}
				/>
			</div>
			<div className="form-control-select">
				<label>Catégorie</label>
				<select
					type="select"
					value={categorie}
					onChange={(e) => setCategorie(e.currentTarget.selected)}
				/>
                <option value="">Choisis une catégorie</option>
                <option value="Aventure">Aventure</option>
                <option value="Culture">Culture</option>
                <option value="Famille">Famille</option>
                <option value="Gastronomique">Gastronomique</option>
                <option value="Historique">Historique</option>
                <option value="Luxe">Luxe</option>
                <option value="Plage">Plage</option>
                <option value="Romantique"><Romantique></Romantique></option>
                <option value="Spa et détente">Spa et détente</option>
                <option value="Sport">Sport</option>
			</div>
			<input type="submit" className="btn btn-gray btn-block" />
		</form>
	);
};
export default AddPackage;
