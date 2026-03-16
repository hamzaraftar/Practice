export default function NotFound() {
  const goHome = () => {
    window.location.href = "/"; // redirects to home
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-r from-blue-400 via-blue-500 to-blue-700 text-white px-4">
      <h1 className="text-6xl font-bold mb-4  animate-bounce">404</h1>
      <h2 className="text-3xl md:text-3xl mb-6">Oops! Page Not Found</h2>
      <p className="mb-6 text-center max-w-md text-xl">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={goHome}
        className=" cursor-pointer bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-100 transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
