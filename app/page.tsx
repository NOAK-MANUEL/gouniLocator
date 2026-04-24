"use client";

import { useEffect, useState } from "react";
import LocationCard from "@/components/locationCard";
import { getLocations } from "@/lib/actions";
import { LocationType } from "@/lib/types";

export default function Home() {
  // const [query, setQuery] = useState("");

  const [locations, setLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    getLocations().then((dat) => {
      if (!dat.success) {
        return alert(dat.message);
      }
      setLocations(dat.locations || []);
    });
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 text-white">
        <div className="container-app py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight animate-fadeIn">
            Find your way around campus
          </h1>

          <p className="text-white/80 mt-3 animate-fadeIn delay-100">
            Search for offices, lecture halls, hostels and more.
          </p>

          {/* SEARCH */}
          <div className="mt-8 max-w-xl mx-auto relative animate-fadeIn delay-200 ">
            <input
              className="w-full px-5 py-4 rounded-xl text-black shadow-lg focus:ring-2 focus:ring-white outline-none bg-white"
              placeholder="Search VC Office, Library..."
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-app py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">All Locations</h2>
          <span className="text-sm text-gray-500">
            {locations.length} results
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      </section>
    </div>
  );
}
