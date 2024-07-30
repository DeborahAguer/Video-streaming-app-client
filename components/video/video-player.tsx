import { Box } from "@chakra-ui/react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }: any) => {
  return (
    <Box w="100%" borderRadius="2xl" overflow="hidden" textAlign="center">
      <ReactPlayer
        url={`${videoUrl}`}
        controls
        width={"100%"}
        height={"100%"}
        style={{ aspectRatio: "16/9", verticalAlign: "middle" }}
      />
    </Box>
  );
};

export default VideoPlayer;
