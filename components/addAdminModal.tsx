"use client";

import { addAdminSchema, adminType } from "@/lib/formTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeAdmin } from "@/lib/actions";
// import { LocationType } from "@/lib/types";

export default function AddAdminModal({
  open,
  onClose,
  // isEdit,
  // editLocation,
}: {
  open: boolean;
  // isEdit: LocationType | null;
  onClose: () => void;
  // editLocation: (data: locationType) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<adminType>({
    resolver: zodResolver(addAdminSchema),
  });
  // const [edit]
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handle);
    // if (isEdit) {
    //   const content = { ...isEdit, aliases: isEdit.aliases.join(",") };
    //   reset(content as locationType);
    // }

    return () => window.removeEventListener("keydown", handle);
  }, [onClose, setValue, reset]);

  if (!open) return null;

  const addAdmin = async (data: adminType) => {
    const res = await storeAdmin(data);
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
            <h2 className="text-xl font-semibold">Add New Admin</h2>
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
          // onSubmit={handleSubmit(isEdit ? editLocation : addLocation)}
          onSubmit={handleSubmit(addAdmin)}
          className="px-6 py-6 space-y-6"
        >
          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              {...register("name")}
              className="input mt-2"
              placeholder="random_name"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              className="input mt-2"
              placeholder="Hostel / Academic"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="input mt-2"
              placeholder="****"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="input mt-2"
              placeholder="*****"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
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
              Add Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
