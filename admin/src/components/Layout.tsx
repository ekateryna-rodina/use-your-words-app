import { Container } from "@chakra-ui/react";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <Container maxW="container.xl">
      <main>{children}</main>
    </Container>
  );
};
export default Layout;
