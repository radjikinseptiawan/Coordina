import TopNavigation from "@/_shared/layouts/navigation/TopNavigation";

export default function NotFound() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center p-4 bg-gray-50">
        <div className="border shadow-xl p-6 text-center w-full max-w-xl h-96 flex flex-col justify-center items-center rounded-md bg-white">
          <div>
            <h1 className="font-bold text-6xl text-gray-800 mb-2">404</h1>
            <p className="text-gray-500 font-medium text-lg">Page Not Found!</p>
          </div>
        </div>
      </div>
    </>
  );
}
