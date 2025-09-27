import Header from "./components/Header";
import AddPackage from "./components/AddPackage";
import ManyPackages from "./components/ManyPackages";
import { useState, useEffect } from "react";

function App() {
	const [packages, setPackages] = useState([]);

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

	const deletePackage = async (id) => {
		// alert(id)
		// console.log(id)
		await fetch(`http://localhost:5000/packages/${id}`, {
			method: "DELETE",
		});
		setPackages(packages.filter((p) => p.id !== id));
	};

	const toggleReminder = (id) => {
		// alert(id)
		setForfait(
			tasks.map((f) =>
				f.id === id ? { ...f, reminder: !f.reminder } : f
			)
		);
	};

	
	const addPackage = async (p) => {
		const res = await fetch("http://localhost:5000/packages", {
			method: "POST",

			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(p),
		});

		const newPackage = await res.json();

		// console.log(task)
		/*const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
	const id = lastId + 1;
	const newTask = { id, ...task };*/
		setPackages([...packages, newPackage]);
	};
	const [showAddPackage, setShowAddPackage] = useState(false);
	return (
		<div className="font-sans min-h-screen">
			<div className="container mx-auto p-8 border-2 border-blue-200 mt-16 max-w-screen-md rounded">
				<Header toggleForm={() => setShowAddPackage(!showAddPackage)} />
				{showAddPackage && <AddPackage onAdd={addPackage} />}
				<ManyPackages
					packages={packages}
					onDelete={deletePackage}
					onToggle={toggleReminder}
				/>
			</div>
		</div>
	);
}

export default App;
