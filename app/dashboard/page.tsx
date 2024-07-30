import React from "react";
import { Box } from "@chakra-ui/react";
import Upload from "./Upload";

export default function Profile() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Upload />
    </Box>
  );
}