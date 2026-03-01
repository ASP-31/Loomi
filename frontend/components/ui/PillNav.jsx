"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import "@/components/PillNav.css";

const PillNav = ({
                   logo,
                   logoAlt = "Logo",
                   items = [],
                   activeHref,
                   className = "",
                   ease = "power3.easeOut",
                   baseColor = "#fff",
                   pillColor = "#060010",
                   hoveredPillTextColor = "#060010",
                   pillTextColor,
                   initialLoadAnimation = true,
                 }) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
            Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const tl = gsap.timeline({ paused: true });

        tl.to(circle, {
          scale: 1.2,
          duration: 0.6,
          ease,
        });

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [items, ease]);

  const handleEnter = (i) => {
    tlRefs.current[i]?.play();
  };

  const handleLeave = (i) => {
    tlRefs.current[i]?.reverse();
  };

  const handleLogoEnter = () => {
    if (!logoImgRef.current) return;
    gsap.fromTo(
        logoImgRef.current,
        { rotate: 0 },
        { rotate: 360, duration: 0.4, ease }
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  };

  return (
      <div className="pill-nav-container">
        <nav
            className={`pill-nav ${className}`}
            aria-label="Primary"
            style={cssVars}
        >
          {/* Logo */}
          <Link
              className="pill-logo"
              href="/"
              aria-label="Home"
              onMouseEnter={handleLogoEnter}
              ref={logoRef}
          >
            <img src={logo} alt={logoAlt} ref={logoImgRef} />
          </Link>

          {/* Desktop Nav */}
          <div className="pill-nav-items desktop-only" ref={navItemsRef}>
            <ul className="pill-list" role="menubar">
              {items.map((item, i) => (
                  <li key={item.href} role="none">
                    <Link
                        role="menuitem"
                        href={item.href}
                        className={`pill ${
                            activeHref === item.href ? "is-active" : ""
                        }`}
                        onMouseEnter={() => handleEnter(i)}
                        onMouseLeave={() => handleLeave(i)}
                    >
                  <span
                      className="hover-circle"
                      ref={(el) => (circleRefs.current[i] = el)}
                  />
                      <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover">
                      {item.label}
                    </span>
                  </span>
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Mobile Button */}
          <button
              className="mobile-menu-button mobile-only"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              ref={hamburgerRef}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef}>
              <ul className="mobile-menu-list">
                {items.map((item) => (
                    <li key={item.href}>
                      <Link
                          href={item.href}
                          className={`mobile-menu-link ${
                              activeHref === item.href ? "is-active" : ""
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
};

export default PillNav;