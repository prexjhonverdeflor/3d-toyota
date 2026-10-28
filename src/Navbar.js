import React, { useEffect, useState } from "react";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Body paint", href: "#colors" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(() =>
    window.matchMedia("(min-width: 641px)").matches
  );

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 641px)");
    const updateMenu = (event) => setMenuOpen(event.matches);

    desktop.addEventListener("change", updateMenu);
    return () => desktop.removeEventListener("change", updateMenu);
  }, []);

  return (
    <header className="site-header">
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="side-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <a className="brand-lockup" href="#top" aria-label="Trueno AE86 home">
        <span className="brand-name">TRUENO</span>
      </a>
      <div className="header-tools">
        <span className="header-language">EN</span>
        <span className="header-profile" aria-hidden="true">
          <svg viewBox="0 0 16 16" focusable="false">
            <circle cx="8" cy="8" r="7" />
            <circle cx="8" cy="6" r="2" />
            <path d="M4.6 12.2c.7-1.6 1.8-2.4 3.4-2.4s2.7.8 3.4 2.4" />
          </svg>
        </span>
      </div>
      <nav
        className={`side-nav${menuOpen ? " is-open" : ""}`}
        id="side-navigation"
        aria-label="Main navigation"
      >
        {LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
