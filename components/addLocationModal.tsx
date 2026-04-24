"use client";

import { addLocationSchema, locationType } from "@/lib/formTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeLocation } from "@/lib/actions";

export default function AddLocationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<locationType>({
    resolver: zodResolver(addLocationSchema),
  });
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue("lat", pos.coords.latitude);
      setValue("long", pos.coords.longitude);
    });
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, setValue]);

  if (!open) return null;

  const addLocation = async (data: locationType) => {
    const res = await storeLocation(data);
    alert(res.message);
    if (res.success) return onClose();
  };

  return (
    <div className="sticky inset-0 z-60 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={() => onClose()}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
      />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-scaleIn">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Location</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(addLocation)} className="space-y-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="input mt-1"
              {...register("name")}
              placeholder="e.g. VC Office"
            />
            <p className="text-red-700">{errors.name?.message}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <input
              {...register("category")}
              className="input mt-1"
              placeholder="Hostel"
            />
            <p className="text-red-700">{errors.category?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              {...register("lat")}
              className="input"
              placeholder="Latitude"
            />
            <input
              {...register("long")}
              className="input"
              placeholder="Longitude"
            />
          </div>
          <p className="text-red-700">{errors.lat?.message}</p>
          <p className="text-red-700">{errors.long?.message}</p>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...register("description")}
              className="input mt-1"
              rows={2}
            />
            <p className="text-red-700">{errors.description?.message}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Aliases</label>
            <input
              className="input mt-1"
              {...register("aliases")}
              placeholder="VC Office, Admin Block"
            />
            <p className="text-red-700">{errors.aliases?.message}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between  pt-3">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              type="submit"
              className={`btn-primary ${isSubmitting && "cursor-not-allowed"}`}
            >
              Save Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
