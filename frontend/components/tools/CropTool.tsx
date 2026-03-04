"use client";

import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { FileUpload } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { MorphingSquare } from "@/components/ui/morphing-square";
import ArrowNarrowLeftIcon from "@/components/ui/arrow-narrow-left-icon";
import { useRouter } from "next/navigation";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CropPage() {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        width: 50,
        height: 50,
        x: 25,
        y: 25
    });

    const [pixelCrop, setPixelCrop] = useState<PixelCrop | null>(null);

    const imgRef = useRef<HTMLImageElement | null>(null);

    const router = useRouter();

    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/avif",
        "image/gif",
        "image/tiff",
    ];

    const handleFileChange = (newFiles: File[]) => {
        if (!newFiles.length) {
            setFile(null);
            setImage(null);
            return;
        }

        const selected = newFiles[0];

        if (!allowedTypes.includes(selected.type)) {
            toast.error("Invalid file type", {
                description: "Only PNG, JPEG, WEBP and AVIF files are allowed."
            });
            return;
        }

        setFile(selected);
        setImage(URL.createObjectURL(selected));
    };

    const handleCrop = async () => {
        if (!pixelCrop || !file || !imgRef.current) return;

        const img = imgRef.current;

        const scaleX = img.naturalWidth / img.width;
        const scaleY = img.naturalHeight / img.height;

        const scaledCrop = {
            x: pixelCrop.x * scaleX,
            y: pixelCrop.y * scaleY,
            width: pixelCrop.width * scaleX,
            height: pixelCrop.height * scaleY,
        };

        const formData = new FormData();
        formData.append("image", file);
        formData.append("x", String(scaledCrop.x));
        formData.append("y", String(scaledCrop.y));
        formData.append("width", String(scaledCrop.width));
        formData.append("height", String(scaledCrop.height));

        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/crop`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                toast.error("Cropping failed");
                setLoading(false);
                return;
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "loomi-cropped.png";
            a.click();

            toast.success("Image cropped successfully!");

        } catch {
            toast.error("Server unavailable");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-35 px-6">

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-6">
                        <MorphingSquare />
                        <p className="text-sm text-neutral-300 tracking-wide">
                            Cropping image...
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
                            Image Crop Tool
                        </h1>
                        <p className="mt-2 text-neutral-400">
                            Precisely crop images before downloading.
                        </p>
                    </div>
                </header>

                {/* Tool Container */}
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-2 shadow-2xl">

                    {/* Upload */}
                    <div className="w-full bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden">
                        <FileUpload onChange={handleFileChange} />
                    </div>

                    {/* Crop Editor */}
                    {image && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 border-t border-neutral-800 mt-2 flex flex-col items-center gap-6"
                        >
                            <ReactCrop
                                crop={crop}
                                onChange={(c, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setPixelCrop(c)}
                            >
                                <img
                                    ref={imgRef}
                                    src={image}
                                    alt="Crop"
                                    className="max-h-[500px] rounded-md"
                                />
                            </ReactCrop>

                            <button
                                onClick={handleCrop}
                                disabled={loading}
                                className={cn(
                                    "h-12 px-10 rounded-lg font-bold text-sm transition-all duration-200",
                                    "bg-white text-black hover:bg-neutral-200 active:scale-95",
                                    "disabled:bg-neutral-800 disabled:text-neutral-500"
                                )}
                            >
                                Crop & Download
                            </button>

                        </motion.div>
                    )}

                </div>
            </div>
        </main>
    );
}