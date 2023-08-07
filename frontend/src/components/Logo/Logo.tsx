import "./Logo.scss";
import logo from "./../../assets/logo.png";

type LogoProps = {
  onClick: () => void;
};

export function Logo({ onClick }: LogoProps) {
  return <img src={logo} alt="logo gotan" height={45} onClick={onClick} />;
}
