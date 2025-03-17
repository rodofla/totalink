type LoadingSpinnerProps = {
    message?: string;
    containerClass?: string;
}

/**
 * Componente LoadingSpinner que muestra un spinner animado junto con un mensaje.
 * @param {string} [props.message="Cargando..."] - Mensaje a mostrar debajo del spinner.
 * @param {string} [props.containerClass=""] - Clases CSS adicionales para el contenedor.
 * @returns {JSX.Element} El elemento JSX del spinner.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = "Cargando...",
    containerClass = ""
}) => {
    return (
        <div className={`flex items-center justify-center ${containerClass}`}>
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <svg
                    className="animate-spin h-10 w-10 mb-4 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                </svg>
                {/* Mensaje de carga */}
                <h1 className="text-white text-xl font-semibold">{message}</h1>
            </div>
        </div>
    );
};

export default LoadingSpinner;