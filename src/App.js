import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Container } from "./components/Container";
import { SubHeading } from "./components/SubHeading";
import { Span } from "./components/Span";
import { Button, ButtonContainer } from "./components/Button";
import logo from "./assets/images/logo.png";

function App() {
  return (
    <Container>
      <img src={logo} alt="Logo" width={50} height={50} />
      <Header>
        <Span primary>Artificial</Span>
        <Span>impact</Span>
      </Header>
      <SubHeading>
        We are a not-for-profit initiative matching NGO's and international
        organizations with A.I. developers with the goal of making the world a
        better place.
      </SubHeading>
      <ButtonContainer>
        <Button primary>I need help</Button>
        <Button>I offer help</Button>
      </ButtonContainer>
    </Container>
  );
}

export default App;
