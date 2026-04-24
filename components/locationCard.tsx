import { LocationType } from "@/lib/types";

export default function LocationCard({ location }: { location: LocationType }) {
  return (
    <div className="card p-5 group cursor-pointer">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition">
            {location.name}
          </h3>

          <p className="text-xs text-gray-400 mt-1">{location.category}</p>
        </div>

        <div className="text-emerald-600 text-sm font-medium">→</div>
      </div>

      {/* BODY */}
      <p className="text-sm text-gray-500 mt-3 leading-relaxed">
        {location.description}
      </p>

      {/* FOOTER */}
      <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
        <span>{location.aliases[0]}</span>
        <span>Campus</span>
      </div>
    </div>
  );
}
