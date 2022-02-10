import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Verification = () => {
  return (
    <Box>
      you were sent a verification link to your email address,verify by clicking
      the link then <Link to="login">Log in</Link>
    </Box>
  );
};

export default Verification;
