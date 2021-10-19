import React from "react";

const Nav = () => {
  return (
    <nav className="top-section__nav desktop-only menu-header-menu-de-container">
      <ul className="top-section__header__ul">
        {/* TODO Add Langs */}
        <li className="menu-item">
          <a href="https://www.accountable.de/selbstandig-werden-mit-accountable/">
            Selbständig werden
          </a>
        </li>
        <li className="menu-item">
          <a href="https://www.accountable.de/preise/">Preise</a>
        </li>
        <li className="menu-item">
          <a href="https://www.accountable.de/blog/">Steuer-Ratgeber</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
