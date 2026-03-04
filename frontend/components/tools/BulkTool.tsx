"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MorphingSquare } from "@/components/ui/morphing-square";
import ArrowNarrowLeftIcon from "@/components/ui/arrow-narrow-left-icon";
import { useRouter } from "next/navigation";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function BulkPage() {

    const router = useRouter();

    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    const [operation, setOperation] = useState("compress");
    const [quality, setQuality] = useState(80);
    const [format, setFormat] = useState("png");
    const [width, setWidth] = useState(800);
    const [height, setHeight] = useState(0);

    const handleFileChange = (newFiles: File[]) => {
        if (!newFiles.length) {
            setFiles([]);
            return;
        }

        setFiles(newFiles);
    };

    const handleProcess = async () => {

        if (!files.length) return;

        const formData = new FormData();

        files.forEach((file) => {
            formData.append("images", file);
        });

        let url = `${API_URL}/api/bulk?operation=${operation}`;

        if (operation === "compress") {
            url += `&quality=${quality}&format=jpeg`;
        }

        if (operation === "convert") {
            url += `&format=${format}`;
        }

        if (operation === "resize") {
            url += `&width=${width}&height=${height}`;
        }

        setLoading(true);

        try {

            const res = await fetch(url, {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                toast.error("Bulk processing failed");
                setLoading(false);
                return;
            }

            const blob = await res.blob();

            const downloadUrl = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "loomi-bulk-output.zip";
            a.click();

            toast.success("Processing complete!");

        } catch (err) {

            toast.error("Server unavailable");

        } finally {

            setLoading(false);

        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-35 px-6">

            {/* Loading overlay */}

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6">
                        <MorphingSquare />
                        <p className="text-sm text-neutral-300 tracking-wide">
                            Processing images...
                        </p>
                    </div>
                </div>
            )}

            <div className="mx-auto w-full max-w-3xl">

                {/* Header */}

                <header className="mb-12 flex items-center gap-4">

                    <button
                        onClick={() => router.back()}
                        className="group flex items-center justify-center w-10 h-10"
                    >
                        <ArrowNarrowLeftIcon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-200" />
                    </button>

                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter text-white">
                            Bulk Processor
                        </h1>

                        <p className="mt-2 text-neutral-400">
                            Process multiple images simultaneously with Loomi.
                        </p>
                    </div>

                </header>

                {/* Main Container */}

                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-2 shadow-2xl">

                    {/* Upload Area */}

                    <div className="w-full bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
                        <FileUpload onChange={handleFileChange} multiple />
                    </div>

                    {files.length > 0 && (

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-6 p-8 border-t border-neutral-800 mt-2"
                        >

                            {/* Operation */}

                            <div className="flex flex-col">

                                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-2">
                                    Operation
                                </label>

                                <select
                                    value={operation}
                                    onChange={(e) => setOperation(e.target.value)}
                                    className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg px-4 py-2.5 text-neutral-200"
                                >
                                    <option value="compress">Compress</option>
                                    <option value="resize">Resize</option>
                                    <option value="convert">Convert</option>
                                    <option value="stripMetadata">Strip Metadata</option>
                                </select>

                            </div>

                            {/* Dynamic controls */}

                            {operation === "compress" && (

                                <div>

                                    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-2 block">
                                        Quality
                                    </label>

                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(Number(e.target.value))}
                                        className="w-full"
                                    />

                                </div>

                            )}

                            {operation === "convert" && (

                                <div>

                                    <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-2 block">
                                        Format
                                    </label>

                                    <select
                                        value={format}
                                        onChange={(e) => setFormat(e.target.value)}
                                        className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg px-4 py-2.5 text-neutral-200"
                                    >
                                        <option value="png">PNG</option>
                                        <option value="jpeg">JPEG</option>
                                        <option value="webp">WEBP</option>
                                        <option value="avif">AVIF</option>
                                        <option value="tiff">TIFF</option>
                                    </select>

                                </div>

                            )}

                            {operation === "resize" && (

                                <div className="grid grid-cols-2 gap-4">

                                    <div>

                                        <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-2 block">
                                            Width
                                        </label>

                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => setWidth(Number(e.target.value))}
                                            className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg px-4 py-2.5 text-neutral-200 w-full"
                                        />

                                    </div>

                                    <div>

                                        <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-500 mb-2 block">
                                            Height
                                        </label>

                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(Number(e.target.value))}
                                            className="bg-neutral-900 border border-neutral-800 text-sm rounded-lg px-4 py-2.5 text-neutral-200 w-full"
                                        />

                                    </div>

                                </div>

                            )}

                            {/* Process Button */}

                            <button
                                onClick={handleProcess}
                                disabled={loading}
                                className={cn(
                                    "w-full h-12 px-10 rounded-lg font-bold text-sm transition-all duration-200",
                                    "bg-white text-black hover:bg-neutral-200 active:scale-95",
                                    "disabled:bg-neutral-800 disabled:text-neutral-500"
                                )}
                            >
                                Process & Download
                            </button>

                        </motion.div>

                    )}

                </div>

            </div>

        </main>
    );
}