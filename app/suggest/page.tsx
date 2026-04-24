"use client";

import { useState } from "react";

export default function SuggestPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 text-white">
        <div className="container-app py-16 text-center">
          <h1 className="text-3xl font-bold">Suggest a new location</h1>

          <p className="text-white/80 mt-2 max-w-lg mx-auto">
            Help other students find places on campus faster by adding missing
            locations.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="container-app py-12">
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-1">Location Details</h2>
              <p className="text-sm text-gray-500 mb-6">
                Provide accurate information to help others navigate easily.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                {/* NAME */}
                <div>
                  <label className="text-sm font-medium">Location Name</label>
                  <input
                    className="input mt-1"
                    placeholder="e.g. Faculty of Engineering"
                    required
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <input
                    className="input mt-1"
                    placeholder="Academic / Hostel / Admin"
                  />
                </div>

                {/* COORDINATES */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Latitude</label>
                    <input className="input mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Longitude</label>
                    <input className="input mt-1" />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="input mt-1"
                    rows={3}
                    placeholder="Short description of the location..."
                  />
                </div>

                {/* SUBMIT */}
                <button className="btn-primary w-full">
                  Submit Suggestion
                </button>
              </form>
            </div>
          ) : (
            /* SUCCESS STATE */
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center">
              <div className="text-emerald-600 text-4xl mb-3">✓</div>

              <h2 className="text-xl font-semibold">Suggestion submitted</h2>

              <p className="text-gray-500 mt-2">
                Thanks for contributing to goLocator. Your input helps improve
                campus navigation.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary mt-6"
              >
                Add another
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
