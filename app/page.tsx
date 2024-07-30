"use client";

import { Box } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useApp } from "../context/app-context";
import VideoItem from "../components/video/video-item";
import LoadingSkeleton from "../components/video/video-loading-skeleton";
import DarkLoadingSpinner from "../components/spinner/dark-loading-spinner";
import { fetchVideos } from '../api/video'

export default function Home() {
  const {
    videos,
    error,
    loadingVideos,
  } = useApp();

  return (
    <Box w="100%">
      {loadingVideos ? (
        <Box
          w={"100%"}
          display="flex"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          {[...Array(12)].map((_, index) => (
            <Box key={index} m={2} w={{ base: "100%", md: "47%", lg: "31.5%" }}>
              <LoadingSkeleton />
            </Box>
          ))}
        </Box>
      ) : error ? (
        <Box p={2}>{error}</Box>
      ) : (
        <InfiniteScroll
          dataLength={20}
          next={fetchVideos}
          hasMore={true}
          loader={ <DarkLoadingSpinner />}
          endMessage={
            <div style={{ textAlign: "center" }}>
              <b>No more videos</b>
            </div>
          }
          style={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {videos?.map((v: any) => (
            <VideoItem key={v?._id} video={v} />
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
}
