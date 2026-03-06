"use client";

import { useRef, useState } from "react";

export default function BlurTool() {

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drawing = useRef(false);

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {

        if (!drawing.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
    };

    const startDraw = () => {
        drawing.current = true;
    };

    const stopDraw = () => {
        drawing.current = false;
    };

    const clearMask = () => {

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const handleUpload = async () => {

        if (!file || !canvasRef.current) return;

        const canvas = canvasRef.current;

        const maskBlob: Blob = await new Promise((resolve) =>
            canvas.toBlob((blob) => resolve(blob!), "image/png")
        );

        const formData = new FormData();
        formData.append("image", file);
        formData.append("mask", maskBlob, "mask.png");

        setLoading(true);

        try {

            const res = await fetch("http://localhost:5000/api/blur", {
                method: "POST",
                body: formData
            });

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            setResult(url);

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="space-y-6">

            {/* Upload */}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {

                    if (!e.target.files) return;

                    const selected = e.target.files[0];

                    setFile(selected);
                    setPreview(URL.createObjectURL(selected));
                    setResult(null);

                }}
            />

            {/* Editor */}
            {preview && (

                <div className="space-y-4">

                    <h2 className="text-xl font-semibold">
                        Paint Area To Blur
                    </h2>

                    <div className="relative inline-block">

                        <img
                            src={preview}
                            className="rounded max-w-full"
                            onLoad={(e) => {

                                const img = e.currentTarget;

                                const canvas = canvasRef.current;
                                if (!canvas) return;

                                canvas.width = img.naturalWidth;
                                canvas.height = img.naturalHeight;

                                canvas.style.width = img.width + "px";
                                canvas.style.height = img.height + "px";

                                const ctx = canvas.getContext("2d");
                                if (!ctx) return;

                                // initialize mask
                                ctx.fillStyle = "black";
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                            }}
                        />

                        {/* Blur Mask */}
                        <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 cursor-crosshair opacity-50"
                            onMouseDown={startDraw}
                            onMouseUp={stopDraw}
                            onMouseLeave={stopDraw}
                            onMouseMove={draw}
                        />

                    </div>

                    <div className="flex gap-4">

                        <button
                            onClick={clearMask}
                            className="px-4 py-2 bg-gray-700 text-white rounded"
                        >
                            Clear Mask
                        </button>

                        <button
                            onClick={handleUpload}
                            className="px-6 py-2 bg-blue-500 text-white rounded"
                        >
                            {loading ? "Processing..." : "Apply Blur"}
                        </button>

                    </div>

                </div>

            )}

            {/* Result */}
            {result && (

                <div className="space-y-2">

                    <h2 className="text-xl font-semibold">
                        Result
                    </h2>

                    <img
                        src={result}
                        className="rounded max-w-lg"
                    />

                </div>

            )}

        </div>
    );
}