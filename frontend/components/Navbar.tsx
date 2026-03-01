"use client";

import { usePathname } from "next/navigation";
import PillNav from "@/components/ui/PillNav";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <PillNav
            logo="/loomi.webp"
            logoAlt="Loomi Logo"
            items={[
                { label: "Home", href: "/" },
                { label: "Converter", href: "/tools/converter" },
            ]}
            className="custom-nav"
            activeHref={pathname}
            ease="power2.easeOut"
            baseColor="#000000"
            pillColor="#ffffff"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#000000"
            theme="light"
            initialLoadAnimation={false}
        />
    );
}