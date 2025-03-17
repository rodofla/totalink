import { Link } from 'react-router-dom';
export default function NotFoundView() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-8xl font-extrabold text-white mb-4">404</h1>
            <p className="text-xl text-gray-300 mb-6 text-center">
                Lo sentimos, la página que buscas no existe.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors"
            >
                Regresar a Inicio
            </Link>
        </div>
    );
}