import "./SearchModal.scss";
import { useState } from "react";
import { Logo } from "./Logo/Logo";
import { RoutesSelection } from "./RoutesSelection/RoutesSelection";
import { SearchInput } from "./SearchInput/SearchInput";
import { WelcomeTitle } from "./WelcomeTitle/WelcomeTitle";

export function SearchModal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour suivre si le menu est ouvert ou fermé

  return (
    <div className={isMenuOpen ? "search-filter open" : "search-filter"}>
      {!isMenuOpen && <Logo onClick={() => setIsMenuOpen(true)} />}

      {isMenuOpen && (
        <>
          <WelcomeTitle onCloseMenu={() => setIsMenuOpen(false)} />
          <SearchInput />
          <RoutesSelection />
        </>
      )}
    </div>
  );
}
