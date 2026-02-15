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

	// Charger les forfaits depuis LocalStorage ou le JSON initial
	useEffect(() => {
		const storedPackages = localStorage.getItem("packages");
		if (storedPackages) {
		setPackages(JSON.parse(storedPackages));
		} else {
		fetch("/forfaits.json")
			.then((res) => res.json())
			.then((data) => {
			setPackages(data.forfaits);
			localStorage.setItem("packages", JSON.stringify(data.forfaits));
			});
		}
	}, []);

	 // Mettre à jour localStorage
	const savePackages = (updatedPackages) => {
		setPackages(updatedPackages);
		localStorage.setItem("packages", JSON.stringify(updatedPackages));
	};

	const toggleReminder = async (id) => {
		
		const updatedPackages = packages.map((p) =>
		p.id === id ? { ...p, reminder: !p.reminder } : p
		);
		savePackages(updatedPackages);
	};

	const deletePackage = async (id) => {
		const updatedPackages = packages.filter((p) => p.id !== id);
    	savePackages(updatedPackages);
	};

	const editPackage = (updatedPackage) => {
		const updatedPackages = packages.map((p) =>
			p.id === updatedPackage.id ? updatedPackage : p
		);
		savePackages(updatedPackages);
	};

	const addPackage = (p) => {
		const newPackage = { ...p, id: crypto.randomUUID() }; 
		const updatedPackages = [...packages, newPackage];
		savePackages(updatedPackages);
	};

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
								path="/"
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
									packages={packages}
										setShowAddPackage={setShowAddPackage}
										onDelete={deletePackage}
									/>
								}
							/>
							<Route
								path="/forfaits/:id/edit"
								element={
									<EditPackage
										packages={packages}
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
