import React from "react";
import { Button } from "reactstrap";
import scrollToElement from "scroll-to-element";
import TypedJSText from "./TypedJSText";
import meImg from "../images/displayImg.jpg";
import background from "../images/background.jpeg";

const LandingPage: React.SFC = (): JSX.Element => (
  <div
    className="landing__container"
    style={{ background: `url(${background}) no-repeat center center` }}
  >
    <div className="landing__image-container animated fadeInDownBig">
      <img src={meImg} alt="Me!" className="landing__image" />
    </div>
    <TypedJSText
      strings={[
        "I am a full-stack developer",
        "I develop full-stack applications.",
        "I develop back-end servers and API's.",
        "I develop database solutions.",
        "I design and build applications.",
      ]}
      name={"Hi, I'm James."}
    />
    <Button
      outline
      size="lg"
      color="secondary"
      className="landing__open-button animated slideInRight"
      onClick={(): void => scrollToElement("#current-work")}
    >
      Open Portfolio
    </Button>
  </div>
);
export default LandingPage;