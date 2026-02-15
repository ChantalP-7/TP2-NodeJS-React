import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopUpSuccess from "./PopUpSuccess";

const EditPackage = ({ packages, onEdit, categories = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // États pour chaque champ
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");  
  const [images, setImages] = useState([""]); // Toujours au moins un input
  const validImages = images.filter((img) => img?.trim() !== "");
  const [successMessage, setSuccessMessage] = useState(""); 

  // Récupération du forfait
  useEffect(() => {
   
        if (!packages || packages.length === 0) return;

        const data = packages.find((item) => item.id === id);

        if (!data) {
          console.error("Forfait non trouvé");
          return;
        }
        setNom(data.nom || "");
        setDescription(data.description || "");
        setPrix(
          data.prix !== undefined && data.prix !== null ? data.prix.toString() : ""
        );
        setCategorie(data.categorie || "");
        setImages(Array.isArray(data.images) && data.images.length ? data.images : [""]);
     
  }, [id, packages]);

  // Gestion des images
  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const addImageInput = () => {
    if (images.length < 5) setImages([...images, ""]);
  };

  const removeImageInput = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages.length ? updatedImages : [""]); // Toujours au moins un input
  };

  // Soumission du formulaire
  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedPackage = {
      id,
      nom,
      description,
      prix: parseFloat(prix),
      categorie,
      dateMiseAJour: new Date().toISOString(),
      images: images.filter((img) => img.trim() !== ""),
    };

    onEdit(updatedPackage);
    
    navigate(`/forfait/${data.id}`, {
      state: { successMessage: "Le forfait a bien été modifié!" },
    });
  };
   

  return (
    <div className="formulaire p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Éditer le Forfait</h2>
      <PopUpSuccess message={successMessage} onClose={() => setSuccessMessage("")} />

      {/* Affichage des images valides */}
      {validImages.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 my-4">
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
        <p className="italic text-gray-600">Aucune image valide à afficher.</p>
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
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="ligneBasse">
					<p></p>
				</div>

        <div className="form-control mt-5">
          <p className="text-lg mb-5 text-green-900">Ajoute jusqu'à 5 url d'images.</p>

          {images.map((url, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="url"
                placeholder={`Image ${index + 1}`}
                className="w-full p-2 border rounded mb-3"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageInput(index)}
                  className="text-red-500 cursor-pointer"
                >
                  {/* icône */}
                </button>
              )}
            </div>
          ))}

          {images.length < 5 && (
            <button
              type="button"
              onClick={addImageInput}
              className="mt-2 btn btn-blue flex justify-center items-center"
            >
              Ajouter une image
            </button>
          )}
        </div>

        <div className="ligneBasse"><p></p></div>

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
