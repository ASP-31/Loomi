import Link from "next/link";
import { Image as ImageIcon, Minimize2, ArrowRight } from "lucide-react";

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 py-32 px-6">
            {/* Narrower max-width makes lists significantly easier to read */}
            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-3 tracking-tight">Toolkit</h1>
                    <p className="text-neutral-400 text-lg">
                        Select a utility below to begin optimizing your assets.
                    </p>
                </div>

                {/* Grouped List Container */}
                <div className="flex flex-col border border-neutral-800/60 rounded-2xl overflow-hidden bg-neutral-900/20 shadow-sm">

                    {/* Image Converter Row */}
                    <Link
                        href="/tools/converter"
                        className="group flex items-center p-5 border-b border-neutral-800/60 hover:bg-neutral-800/40 transition-colors duration-200"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-800/60 border border-neutral-700/50 text-neutral-300 mr-5 group-hover:text-white transition-colors">
                            <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-base font-semibold text-neutral-200 mb-0.5 group-hover:text-white transition-colors">
                                Image Converter
                            </h2>
                            <p className="text-neutral-400 text-sm">
                                Convert images between PNG, JPEG, WEBP, and AVIF formats.
                            </p>
                        </div>

                        <div className="shrink-0 pl-4 text-neutral-600 group-hover:text-neutral-300 transition-colors">
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                        </div>
                    </Link>

                    {/* Image Compressor Row */}
                    <Link
                        href="/tools/compressor"
                        className="group flex items-center p-5 hover:bg-neutral-800/40 transition-colors duration-200"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-800/60 border border-neutral-700/50 text-neutral-300 mr-5 group-hover:text-white transition-colors">
                            <Minimize2 className="w-5 h-5" strokeWidth={1.5} />
                        </div>

                        <div className="flex-grow">
                            <h2 className="text-base font-semibold text-neutral-200 mb-0.5 group-hover:text-white transition-colors">
                                Image Compressor
                            </h2>
                            <p className="text-neutral-400 text-sm">
                                Reduce file sizes aggressively without noticeable quality loss.
                            </p>
                        </div>

                        <div className="shrink-0 pl-4 text-neutral-600 group-hover:text-neutral-300 transition-colors">
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                        </div>
                    </Link>

                </div>
            </div>
        </main>
    );
}