import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import moment from "moment";
import ReactPlayer from "react-player";

const RelatedVideoItem = ({ video }: any) => {
  const {
    title, videoUrl, createdAt,
  } = video;

  return (
    <Box w={"100%"}>
      <Link href={`/videos/${video._id}`}>
        <Box mb={3} display={{ base: "block", md: "flex", lg: "flex" }}>
          <Box
            mr={2}
            w={{ base: "100%", md: "50%", lg: "50%" }}
            overflow="hidden"
            borderRadius={12}
            position="relative"
          >
          <ReactPlayer
            url={`${videoUrl}`}
            controls
            width={"100%"}
            height={"100%"}
            playing={false}
            style={{ aspectRatio: "16/9", verticalAlign: "middle" }}
          />
          </Box>
          <Box
            mt={{ base: 2, md: 0, lg: 0 }}
            maxW={{ base: "100%", md: "50%", lg: "50%" }}
          >
            <Text fontSize={"0.9rem"} as={"b"}>
              {title.substring(0, 50)}
              {title.length > 50 && <span>...</span>}
            </Text>
            <Text mt={0.5} color={"gray"} fontSize={"0.85rem"}>
              {moment(createdAt).fromNow()}
            </Text>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default RelatedVideoItem;
