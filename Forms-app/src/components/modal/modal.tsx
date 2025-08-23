export default function Modal() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4 relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold">
          Закрыть
        </button>
        <p className="text-gray-800">This is modal</p>
      </div>
    </div>
  );
}
