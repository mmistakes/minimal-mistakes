import styled from "styled-components";
import { PRIMARY, SECONDARY } from "../constants/colors";

export const Button = styled.button`
  color: #fff;
  background: ${props => (props.primary ? PRIMARY : SECONDARY)};
  font-size: 1.3em;
  font-family: "Open Sans", sans-serif;
  margin: 1em;
  padding: 0.6em 2em;
  border: none;
  cursor: pointer;
  @media (max-width: 540px) {
    padding: 0.3em 1em;
    margin: 0.5em;
    font-size: 1em;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 5%;
  flex-direction: row;
`;
