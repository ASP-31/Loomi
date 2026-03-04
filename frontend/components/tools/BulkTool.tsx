"use client"

import { useState } from "react"

export default function BulkTool() {

    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(false)

    const [operation, setOperation] = useState("compress")

    const [quality, setQuality] = useState(80)
    const [format, setFormat] = useState("png")
    const [width, setWidth] = useState(800)
    const [height, setHeight] = useState(0)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        setFiles(Array.from(e.target.files))
    }

    const handleUpload = async () => {

        if (files.length === 0) return

        const formData = new FormData()

        files.forEach((file) => {
            formData.append("images", file)
        })

        let url = `http://localhost:5000/api/bulk?operation=${operation}`

        if (operation === "compress") {
            url += `&quality=${quality}&format=jpeg`
        }

        if (operation === "convert") {
            url += `&format=${format}`
        }

        if (operation === "resize") {
            url += `&width=${width}&height=${height}`
        }

        setLoading(true)

        try {

            const res = await fetch(url, {
                method: "POST",
                body: formData
            })

            const blob = await res.blob()

            const downloadUrl = window.URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = downloadUrl
            a.download = "loomi-bulk-output.zip"
            a.click()

        } catch (err) {
            console.error(err)
        }

        setLoading(false)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">

            <h1 className="text-3xl font-bold text-white">
                Bulk Image Processor
            </h1>

            {/* Operation */}

            <div className="space-y-2">

                <label className="text-gray-400 text-sm">
                    Operation
                </label>

                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                >
                    <option value="compress">Compress</option>
                    <option value="resize">Resize</option>
                    <option value="convert">Convert</option>
                    <option value="stripMetadata">Strip Metadata</option>
                </select>

            </div>

            {/* Dynamic Inputs */}

            {operation === "compress" && (

                <div className="space-y-2">

                    <label className="text-sm text-gray-400">
                        Quality: {quality}
                    </label>

                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) =>
                            setQuality(Number(e.target.value))
                        }
                        className="w-full"
                    />

                </div>
            )}

            {operation === "convert" && (

                <div className="space-y-2">

                    <label className="text-sm text-gray-400">
                        Output Format
                    </label>

                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
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

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                            Width
                        </label>

                        <input
                            type="number"
                            value={width}
                            onChange={(e) =>
                                setWidth(Number(e.target.value))
                            }
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                            Height
                        </label>

                        <input
                            type="number"
                            value={height}
                            onChange={(e) =>
                                setHeight(Number(e.target.value))
                            }
                            className="w-full p-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                        />
                    </div>

                </div>
            )}

            {/* File Upload */}

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400"
            />

            {/* Process Button */}

            <button
                onClick={handleUpload}
                disabled={loading || files.length === 0}
                className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-50"
            >
                {loading ? "Processing Images..." : "Process Images"}
            </button>

        </div>
    )
}