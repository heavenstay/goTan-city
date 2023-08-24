import "./Logo.scss";
import logo from "./../../../assets/logo.png";

type LogoProps = {
  onClick: () => void;
  style?: React.CSSProperties;
};

export function Logo({ onClick, style }: LogoProps) {
  return <img style={style} src={logo} alt="logo gotan" height={45} onClick={onClick} />;
}
