export default function LocationModal({ location, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-fadeIn">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{location.name}</h2>
          <button onClick={onClose} className="text-gray-500">
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">{location.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500">Category</p>
            <p className="font-medium">{location.category}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-500">Aliases</p>
            <p className="font-medium">{location.aliases.join(", ")}</p>
          </div>
        </div>

        <button className="btn-primary w-full mt-5">Get Directions</button>
      </div>
    </div>
  );
}
