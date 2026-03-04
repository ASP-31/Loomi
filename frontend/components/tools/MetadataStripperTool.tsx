"use client";

import { useState } from "react";

export default function MetadataStripperTool() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleProcess = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/strip-metadata", {
                method: "POST",
                body: formData,
            });

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "metadata-stripped-image";
            a.click();
        } catch (err) {
            console.error("Strip metadata error:", err);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col gap-6 max-w-md">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button
                onClick={handleProcess}
                className="bg-white text-black px-4 py-2 rounded-md"
            >
                {loading ? "Processing..." : "Remove Metadata"}
            </button>
        </div>
    );
}