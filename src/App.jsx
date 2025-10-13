import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import AddPackage from "./components/AddPackage";
import AllPackages from "./components/AllPackages";
import EditPackage from "./components/EditPackage";
import Package from "./components/Package";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
	const [packages, setPackages] = useState([]);
	const [showAddPackage, setShowAddPackage] = useState(false);
	const categories = [...new Set(packages.map((p) => p.categorie))];
	const location = useLocation();

	// Fermer le formulaire à chaque navigation
	useEffect(() => {
		setShowAddPackage(false);
	}, [location]);

	useEffect(() => {
		const getPackages = async () => {
			const packagesFromServer = await fetchPackages(
				"http://localhost:5000/forfaits"
			);
			setPackages(packagesFromServer);
		};
		getPackages();
	}, []);

	const fetchPackages = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	};

	const toggleReminder = async (id) => {
		const packageToToggle = await fetchPackages(
			`http://localhost:5000/forfaits/${id}`
		);
		const updPackage = {
			...packageToToggle,
			reminder: !packageToToggle.reminder,
		};
		const res = await fetch(`http://localhost:5000/forfaits/${id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(updPackage),
		});
		const data = await res.json();

		setPackages(
			packages.map((p) =>
				p.id === id ? { ...p, reminder: data.reminder } : p
			)
		);
	};

	const deletePackage = async (id) => {
		await fetch(`http://localhost:5000/forfaits/${id}`, {
			method: "DELETE",
		});
		setPackages(packages.filter((p) => p.id !== id));
	};

	const editPackage = async (id) => {
		await fetch(`http://localhost:5000/forfaits/${id}`, {
			method: "PATCH",
		});
		setPackages(packages.filter((p) => p.id !== id));
	};

	const addPackage = async (p) => {
		try {
			console.log("Données envoyées :", p);
			const res = await fetch("http://localhost:5000/forfaits", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(p),
			});
			if (!res.ok) {
				throw new Error("Erreur lors de l'ajout du forfait");
			}
			const newPackage = await res.json();
			setPackages([...packages, newPackage]);
		} catch (error) {
			console.error("Erreur d'ajout :", error);
		}
	};

	//const [showAddPackage, setShowAddPackage] = useState(false);

	return (
		
			<div className="body font-sans min-h-screen">
				<div className="container mx-auto p-8 mt-16 max-w-screen-md rounded bg-white">
					<Header
						toggleForm={() => setShowAddPackage(!showAddPackage)}
						showAdd={showAddPackage}
					/>

					{showAddPackage ? (
						<AddPackage
							onAdd={addPackage}
							categories={categories}
						/>
					) : (
						<Routes>
							<Route
								path="/react"
								element={
									<Home
										packages={packages}
										onToggle={toggleReminder}
									/>
								}
							/>
							<Route
								path="/forfaits"
								element={<AllPackages packages={packages} />}
							/>
							<Route
								path="/About"	
								element={<About />}							
							/>
							<Route
								path="/forfait/:id"
								element={
									<Package
										setShowAddPackage={setShowAddPackage}
										onDelete={deletePackage}
									/>
								}
							/>
							<Route
								path="/forfaits/:id/edit"
								element={
									<EditPackage
										onEdit={editPackage}
										categories={categories}
									/>
								}
							/>
						</Routes>
					)}

					<Footer />
				</div>
			</div>
	);
}
export default App;
