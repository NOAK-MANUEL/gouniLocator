"use client";

import { addLocationSchema, locationType } from "@/lib/formTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeLocation } from "@/lib/actions";
import { LocationType } from "@/lib/types";

export default function AddLocationModal({
  open,
  onClose,
  isEdit,
  editLocation,
}: {
  open: boolean;
  isEdit: LocationType | null;
  onClose: () => void;
  editLocation: (data: locationType) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<locationType>({
    resolver: zodResolver(addLocationSchema),
  });
  // const [edit]
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handle);
    if (isEdit) {
      const content = { ...isEdit, aliases: isEdit.aliases.join(",") };
      reset(content as locationType);
    }

    return () => window.removeEventListener("keydown", handle);
  }, [onClose, setValue, isEdit, reset]);

  if (!open) return null;

  const useLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue("lat", pos.coords.latitude);
      setValue("long", pos.coords.longitude);
    });
  };

  const addLocation = async (data: locationType) => {
    const res = await storeLocation(data);
    alert(res.message);
    if (res.success) return onClose();
  };

  return (
    <div className="sticky inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
      />

      {/* MODAL */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl animate-scaleIn">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? "Edit Location" : "Add New Location"}
            </h2>
            <p className="text-sm text-gray-500">Fill in the details below</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(isEdit ? editLocation : addLocation)}
          className="px-6 py-6 space-y-6"
        >
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              className="input mt-2"
              placeholder="e.g. VC Office"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              {...register("category")}
              className="input mt-2"
              placeholder="Hostel / Academic"
            />
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* COORDINATES */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Coordinates
            </label>

            <div className="grid grid-cols-2 gap-3 mt-2">
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

            <button
              type="button"
              onClick={useLocation}
              className="mt-3 text-sm text-emerald-700 hover:underline"
            >
              Use my current location 📍
            </button>

            {(errors.lat || errors.long) && (
              <p className="text-xs text-red-500 mt-1">Invalid coordinates</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              className="input mt-2"
              rows={3}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* ALIASES */}
          <div>
            <label className="text-sm font-medium text-gray-700">Aliases</label>
            <input
              {...register("aliases")}
              className="input mt-2"
              placeholder="VC Office, Admin Block"
            />
            {errors.aliases && (
              <p className="text-xs text-red-500 mt-1">
                {errors.aliases.message}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition disabled:opacity-50"
            >
              {isEdit ? "Save Update" : "Save Location"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
