import { Link } from 'react-router-dom'

const Footer = () => {
    return (
		<footer className="w-full mt-6 pt-4 flex sm:flex-col sm-gap-2 md:flex-col flex-row items-center justify-center text-center bg-gray-100">
			<Link
				to="/About"
				className="hover:text-blue-700 hover:underline"
			>
				À propos
			</Link>
			<p className="text-sm mt-2">Copyright &copy; 2025</p>
			<p className="text-sm mt-1">Conception : Chantal Pépin</p>
		</footer>
	);
}

export default Footer;