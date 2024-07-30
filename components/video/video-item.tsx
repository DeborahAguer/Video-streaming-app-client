"use client";

import { useState } from "react";
import Link from "next/link";
import moment from "moment/moment";
import { RxDotFilled } from "react-icons/rx";
import { abbreviateNumber } from "js-abbreviation-number";
import { Box, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";

const VideoItem = ({ video }: any) => {
  const { _id: videoId, title, createdAt } = video;

  const [duration, setDuration] = useState(0);
  const [viewCount, setViewConunt] = useState(0);

  return (
    <Box m={3} w={{ base: "100%", md: "46%", lg: "30.5%" }}>
      <Link href={`/videos/${videoId}`}>
        <Box w={"100%"} position="relative" borderRadius={12} overflow="hidden">
           <ReactPlayer
            url={`${video.videoUrl}`}
            controls
            width={"100%"}
            height={"100%"}
            playing={false}
            style={{ aspectRatio: "16/9", verticalAlign: "middle" }}
          />
          {duration !== 0 && (
            <Box
              py={1}
              px={1.5}
              color={"white"}
              bg={"blackAlpha.900"}
              position="absolute"
              right={1}
              bottom={1}
              borderRadius={5}
            >
              {moment
                .utc(moment.duration(duration).asMilliseconds())
                .format("mm:ss")}
            </Box>
          )}
        </Box>
      </Link>
      <Box mt={3} w={"100%"} display="flex" alignItems="flex-start">
        <Box ml={3}>
          <Link href={`/videos/${videoId}`}>
            <Text as={"b"}>
              {title.substring(0, 65)}
              {title.length > 66 && <span>...</span>}
            </Text>
          </Link>
          <Link href={`/videos/${videoId}`}>
            <Box
              mt={0.5}
              display={"flex"}
              alignItems="center"
              fontSize={"0.95rem"}
            >
              {viewCount !== 0 && (
                <>
                  <Text color={"gray"}>
                    {abbreviateNumber(viewCount, 1)} views
                  </Text>
                  <span>
                    <RxDotFilled style={{ color: "gray" }} />
                  </span>
                </>
              )}
              <Text color={"gray"}>{moment(createdAt).fromNow()}</Text>
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoItem;
