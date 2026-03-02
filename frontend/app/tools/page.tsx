import Link from "next/link";


export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">Toolkit</h1>
                <p className="text-neutral-400 mb-12">
                    High-performance utilities for image transformation and optimization.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    <Link href="/tools/converter"
                        className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">Image Converter</h2>
                        <p className="text-neutral-400 text-sm">
                            Convert images between PNG, JPEG, WEBP, AVIF and more.
                        </p>
                    </Link>

                    <Link href="/tools/compressor"
                        className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">Image Compressor</h2>
                        <p className="text-neutral-400 text-sm">
                            Reduce file size without noticeable quality loss.
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    );
}