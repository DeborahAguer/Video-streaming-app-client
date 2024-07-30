"use client";

import { useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChannelVideoItem from "./channel-video-item";
import DarkLoadingSpinner from "../spinner/dark-loading-spinner";

const ChannelVideos = ({ uploadsPlaylistId }: any) => {
  const { colorMode } = useColorMode();

  const [error, setError] = useState("");
  const [channelVideos, setChannelVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");

  const getChannelVideos = async () => {
    try {
      const { data } = await axios.post("/api/channels/channelVideos", {
        playlistId: uploadsPlaylistId,
        nextPageToken: nextPageToken,
      });

      if (data?.videosData?.items) {
        setNextPageToken(data.videosData.nextPageToken);
        setChannelVideos((prev: any) => [...prev, ...data.videosData.items] as any);
      }
    } catch (error) {
      setError("Something went wrong, failed to load videos");
      throw new Error(`${error}`)
    }
  };

  useEffect(() => {
    if (uploadsPlaylistId === "") return;
    else {
      setChannelVideos([]);
      setNextPageToken("");
      getChannelVideos();
    }
  }, [uploadsPlaylistId]);

  return (
    <InfiniteScroll
      dataLength={channelVideos.length}
      next={getChannelVideos}
      hasMore={true}
      loader={ <DarkLoadingSpinner />}
      endMessage={
        <div style={{ textAlign: "center" }}>
          <b>Thats all!</b>
        </div>
      }
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
      }}
    >
      {channelVideos.map((v: any) => (
        <ChannelVideoItem key={v?.resourceId?.videoId} video={v} />
      ))}
    </InfiniteScroll>
  );
};

export default ChannelVideos;
