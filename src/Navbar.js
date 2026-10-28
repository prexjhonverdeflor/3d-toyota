import React from "react";

function Navbar() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="Toyota AE86 home">
        <span className="brand-name">TOYOTA</span>
        <span className="brand-divider" aria-hidden="true" />
        <span className="brand-model">AE86 / TRUENO</span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#story">The machine</a>
        <a href="#colors">Body paint</a>
      </nav>
      <span className="header-edition">SPRINTER · 1983—1987</span>
    </header>
  );
}

export default Navbar;
