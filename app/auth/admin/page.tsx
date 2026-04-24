"use client";

import { useEffect, useState } from "react";
import AddLocationModal from "@/components/addLocationModal";
import {
  deleteLocationFromDb,
  editLocationFromDB,
  getLocations,
} from "@/lib/actions";
import { locationType } from "@/lib/formTypes";

export default function AdminPage() {
  interface LocationType {
    id: string;
    name: string;
    category: string;
    lat: number | null;
    long: number | null;
    description: string | null;
    aliases: string[];
  }
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [edit, setEdit] = useState<string>();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    getLocations().then((dat) => {
      if (!dat.success) {
        return alert(dat.message);
      }
      setLocations(dat.locations || []);
    });
  }, []);

  const deleteLocation = async (id: string) => {
    const res = await deleteLocationFromDb(id);
    if (!res.success) return alert(res.message);
    setLocations(locations.filter((loc) => loc.id !== id));
    alert("Deleted Successfully");
  };
  const editLocation = async (data: locationType) => {
    if (!edit) return;
    const res = await editLocationFromDB(data, edit);
    alert(res.message);
    if (res.success) {
      const currentIndex = locations.findIndex((l) => l.id === edit);

      if (currentIndex === -1) return;

      const newLocations = [...locations];

      newLocations[currentIndex] = {
        ...locations[currentIndex],
        ...data,
        aliases: data.aliases.split(",").map((a) => a.trim()), // 🔥 FIX
      };

      setLocations(newLocations);
      setOpen(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <section className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
        <div
          className={`container-app py-10 flex justify-between items-center flex-col gap-3.5 md:flex-row `}
        >
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80 text-sm mt-1">
              Manage campus locations and data
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-emerald-700 px-5 py-2 rounded-xl font-medium"
            >
              + Add Location
            </button>
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-emerald-700 px-5 py-2 rounded-xl font-medium"
            >
              + Add Admin
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-app py-10">
        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="card p-5">
            <p className="text-sm text-gray-500">Total Locations</p>
            <p className="text-2xl font-bold mt-1">{locations.length}</p>
          </div>

          <div className="card p-5">
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-2xl font-bold mt-1">
              {new Set(locations.map((l) => l.category)).size}
            </p>
          </div>
        </div>

        {/* SEARCH + TABLE */}
        <div className="card">
          {/* SEARCH BAR */}
          <div className="p-4 border-b">
            <input
              className="input"
              placeholder="Search locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* TABLE */}
          <div className="max-h-[300px] overflow-y-scroll">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="p-4">Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th className="text-right pr-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {locations.map((l) => (
                  <tr
                    key={l.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{l.name}</td>

                    <td>
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                        {l.category}
                      </span>
                    </td>

                    <td className="text-gray-500">{l.description}</td>

                    <td className="text-right pr-4 space-x-3">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setEdit(l.id);
                        }}
                        className="text-emerald-600 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteLocation(l.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <AddLocationModal
        editLocation={editLocation}
        isEdit={edit ? locations.find((l) => l.id === edit) || null : null}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
