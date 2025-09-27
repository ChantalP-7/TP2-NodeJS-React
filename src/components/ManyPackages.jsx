import SinglePackage from "./SinglePackage";
const ManyTasks = ({ packages, onDelete }) => {
	return (
		<>
			{packages.map((p) => (
				<SinglePackage
					key={p.id}
					myPackage={p}
					onDelete={onDelete}
				/>
			))}
		</>
	);
};

export default ManyTasks;
