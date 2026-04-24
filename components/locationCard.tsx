import { LocationType } from "@/lib/types";
import Link from "next/link";

export default function LocationCard({ location }: { location: LocationType }) {
  return (
    <Link
      href={`/location/${location.id}`}
      className="group relative bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* TOP BADGE */}
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 mb-2">
            {location.category}
          </span>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition">
            {location.name}
          </h3>
        </div>

        {/* ARROW */}
        <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition">
          <span className="text-emerald-600 text-lg">→</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-3 line-clamp-2">
        {location.description || "No description available"}
      </p>

      {/* FOOTER */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {location.aliases.slice(0, 2).map((alias, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600"
            >
              {alias}
            </span>
          ))}
        </div>

        <span className="text-xs text-gray-400">View</span>
      </div>

      {/* HOVER GLOW */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-100/20 to-transparent pointer-events-none transition" />
    </Link>
  );
}
