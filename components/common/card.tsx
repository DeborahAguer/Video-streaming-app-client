import { Box } from "@chakra-ui/react";
const Card = (props: any) => {
  const { variant, children, ...rest } = props;

  return (
    <Box {...rest}>
      {children}
    </Box>
  );
}

export default Card;