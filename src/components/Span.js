import styled from "styled-components";
import { PRIMARY, SECONDARY } from "../constants/colors";

export const Span = styled.div`
  color: ${props => (props.primary ? PRIMARY : SECONDARY)};
`;
