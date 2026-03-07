"use client";

import { useState } from "react";

const filterPreview: Record<string, string> = {
  bw: "grayscale(100%)",
  cool: "hue-rotate(180deg) saturate(1.2)",
  warm: "sepia(40%) saturate(1.3)",
  sepia: "sepia(100%)",
};

export default function FiltersPage() {
  const [file, setFile] = useState<File | null>(null);
  const [filter, setFilter] = useState("bw");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (f: File | null) => {
    if (!f) return;

    setFile(f);
    setFilter("bw");
    setPreview(URL.createObjectURL(f));
  };

  const applyFilter = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("filter", filter);

    const res = await fetch("http://localhost:5000/api/images/filter", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered.png";
    a.click();

    setLoading(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 text-white">

      <div className="w-full max-w-xl p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-6">
          Image Filters
        </h1>

        <p className="text-center text-white/60 mb-8">
          Upload an image, choose a filter, and download the result.
        </p>

        <div className="flex flex-col items-center gap-5">

          {/* Upload */}
          <label className="w-full cursor-pointer border border-white/10 rounded-xl p-6 text-center hover:bg-white/5 transition">
            <input
              type="file"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
            <p className="text-white/70">
              Click to upload image
            </p>
          </label>

          {/* Preview */}
          {preview && (
            <img
              src={preview}
              style={{ filter: filterPreview[filter] }}
              className="rounded-lg max-h-64 object-contain border border-white/10 transition duration-300"
            />
          )}

          {/* Filter selector */}
          <div className="w-full">
            <label className="block text-sm text-white/60 mb-2">
              Choose Filter
            </label>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="bw">Black & White</option>
              <option value="cool">Cool</option>
              <option value="warm">Warm</option>
              <option value="sepia">Sepia</option>
            </select>
          </div>

          {/* Apply button */}
          <button
            onClick={applyFilter}
            disabled={!file || loading}
            className="mt-4 w-full py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 active:scale-95 transition disabled:opacity-40"
          >
            {loading ? "Processing..." : "Apply Filter & Download"}
          </button>

        </div>

      </div>

    </main>
  );
}