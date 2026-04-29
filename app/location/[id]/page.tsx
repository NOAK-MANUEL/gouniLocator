"use client";

import { getLocation } from "@/lib/actions";
import { LocationType } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LocationPage() {
  const { id } = useParams();

  const [location, setLocation] = useState<LocationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserPos({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  interface geo {
    lng: number;
    lat: number;
  }
  function getDirection(user: geo, target: geo) {
    const dx = target.lng - user.lng;
    const dy = target.lat - user.lat;

    if (Math.abs(dx) > Math.abs(dy)) {
      return dx > 0 ? "⬅️ Move Left" : "➡️ Move Right";
    } else {
      return dy > 0 ? "⬇️ Move Back" : "⬆️ Move Forward";
    }
  }

  useEffect(() => {
    if (!id) return;

    getLocation(id.toString()).then((res) => {
      if (!res.success || !res.location) {
        setNotFoundState(true);
      } else {
        setLocation(res.location);
      }

      setLoading(false);
    });
  }, [id]);
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (loading) {
    return (
      <div className="container-app py-20 text-center">
        <div className="animate-pulse text-gray-400">Loading location...</div>
      </div>
    );
  }

  if (notFoundState) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="text-2xl font-semibold">Location not found</h1>
        <p className="text-gray-500 mt-2">
          The location you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 text-white">
        <div className="container-app py-16">
          <p className="text-white/70 text-sm">Location</p>

          <h1 className="text-4xl font-bold mt-1">{location?.name}</h1>

          <p className="text-white/80 mt-3 max-w-xl">
            {location?.description || "No description available"}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container-app py-10">
        {/* INFO GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* CATEGORY */}
          <div className="card p-5">
            <p className="text-xs text-gray-400">Category</p>
            <p className="text-lg font-semibold mt-1">{location?.category}</p>
          </div>

          {/* ALIASES */}
          <div className="card p-5">
            <p className="text-xs text-gray-400">Also known as</p>
            <p className="text-sm mt-1">{location?.aliases.join(", ")}</p>
          </div>

          {/* COORDINATES */}
          <div className="card p-5">
            <p className="text-xs text-gray-400">Coordinates</p>
            <p className="text-sm mt-1">
              {location?.lat}, {location?.long}
            </p>
          </div>
        </div>

        {/* NAVIGATION SECTION */}
        <div className="card p-6 mt-8">
          <h2 className="font-semibold text-lg">Get Directions</h2>

          <p className="text-gray-500 text-sm mt-2">
            Use your current location to navigate to this place on campus.
          </p>

          <div className={`flex gap-3 mt-5 ${userPos && "hidden"}`}>
            <button onClick={getUserLocation} className="btn-primary">
              Start Navigation
            </button>
          </div>
        </div>
        {userPos && location && (
          <div className="mt-6 p-5 bg-emerald-50 border rounded-xl beep">
            <p className="text-sm text-gray-500">Distance</p>
            <p className="text-xl font-semibold">
              {getDistance(
                userPos.lat,
                userPos.lng,
                location.lat!,
                location.long!,
              ).toFixed(2)}
              {""}
              km
            </p>
            <p className="mt-3 text-lg font-medium text-emerald-700">
              {getDirection(userPos, {
                lat: location.lat || 0,
                lng: location.long || 0,
              })}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
