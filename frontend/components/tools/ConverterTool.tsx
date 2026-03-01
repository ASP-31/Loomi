"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [format, setFormat] = useState("webp");
    const [loading, setLoading] = useState(false);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        onDrop,
    });

    const handleConvert = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);
        formData.append("format", format);

        setLoading(true);

        const response = await fetch("http://localhost:5000/api/convert", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            alert("Conversion failed");
            setLoading(false);
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `converted.${format}`;
        a.click();

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-16 px-6">
            <div className="mx-auto w-full max-w-3xl">
                <div className="mb-10">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-500">
                        Loomi
                    </span>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
                        Image Converter
                    </h1>
                    <p className="text-neutral-400">
                        Upload your image to quickly convert it into an optimized format.
                    </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 sm:p-10">
                    <div
                        {...getRootProps()}
                        className={`w-full cursor-pointer rounded-lg border border-dashed p-10 text-center transition-all duration-200 
                        ${
                            isDragActive
                                ? "border-neutral-500 bg-neutral-800/80"
                                : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/40"
                        }`}
                    >
                        <input {...getInputProps()} />
                        {file ? (
                            <p className="font-medium text-neutral-200">{file.name}</p>
                        ) : (
                            <p className="text-neutral-400">
                                Drag & drop an image here, or click to browse
                            </p>
                        )}
                    </div>

                    {file && (
                        <div className="mt-8 flex flex-col items-end gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
                            <div className="w-full sm:flex-1">
                                <label className="mb-2 block text-sm font-medium text-neutral-400">
                                    Format Output
                                </label>
                                <select
                                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-neutral-200 transition-all duration-200 focus:border-neutral-500 focus:outline-none"
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                >
                                    <option value="webp">WebP</option>
                                    <option value="png">PNG</option>
                                    <option value="jpeg">JPEG</option>
                                    <option value="avif">AVIF</option>
                                </select>
                            </div>

                            <button
                                onClick={handleConvert}
                                disabled={loading}
                                className="w-full rounded-lg bg-white px-6 py-2.5 font-semibold text-black transition-all duration-200 hover:bg-neutral-200 disabled:bg-neutral-800 disabled:text-neutral-500 sm:w-auto"
                            >
                                {loading ? "Converting..." : "Convert & Download"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}