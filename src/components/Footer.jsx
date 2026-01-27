import { Link } from 'react-router-dom'

const Footer = () => {
    return (
		<footer className="w-full mt-6  pt-2 flex justify-center">
			<div className="text-center">
				<Link
					to="/AddPackage"
					className="hover:text-white-700 hover:cursor-pointer "
				>
					Contactez-nous
				</Link>
			</div>
			
				<p className="text-sm mt-2">Copyright &copy; 2025</p>
				<p className="text-sm mt-2">Conception : Chantal Pépin</p>
		</footer>
	);
}

export default Footer;