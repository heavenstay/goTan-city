import "./WelcomeTitle.scss";
import { Logo } from "../Logo/Logo";

type WelcomeTitleProps = {
  onCloseMenu: () => void;
};

export function WelcomeTitle({ onCloseMenu }: WelcomeTitleProps) {
  return (
    <div className="title">
      <Logo onClick={onCloseMenu} />
      <h1>Welcome to Gotan city</h1>
    </div>
  );
}
