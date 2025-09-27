import { FaTimes } from "react-icons/fa";
const SinglePackage = ({ myPackage, onDelete, onToggle }) => {
    
    return (
        <div
            
            onDoubleClick={() => onToggle(myPackage.id)}
        >
            <h3 className="flex justify-between items-center font-bold text-lg">
                {myPackage.nom}
                <FaTimes
                    className="text-red-600 pointer"
                    onClick={() => onDelete(myPackage.id)}
                />
            </h3>            
        </div>
    );
};
export default SinglePackage;