"use client";

import { useEffect, useState } from "react";
import { useApp } from "../../../context/app-context";
import { Box, Divider, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "../../../components/video/video-loading-skeleton";
import DarkLoadingSpinner from "../../../components/spinner/dark-loading-spinner";
import RelatedVideoItem from "../../../components/video/related-video-item";
import VideoDetails from "../../../components/video/video-details";
import VideoPlayer from "../../../components/video/video-player";
import CommentSection from "../../../components/comment/comment-section";
import { fetchVideos, fetchVideoDetails } from '../../../api/video'

const page = ({ params }: any) => {
  const { setSelectedCategory } = useApp();

  const [video, setVideo] = useState({
    title: "",
    videoUrl: "",
    description: "",
    createdAt: "",
  });
  const [loadingVideoDetails, setLoadingVideoDetails] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(false);

  useEffect(() => {
    const fetchRelatedVideos = async () => {
      setLoadingRelatedVideos(true);
      try {
        const data = await fetchVideos();
        if (data) {
          setLoadingRelatedVideos(false);
          setRelatedVideos(data);
        }
      } catch (error) {
        throw new Error(`Error fetching videos: ${error}`)
      }
    };

    fetchRelatedVideos();
  }, []);

  useEffect(() => {
    const getVideoDetails = async () => {
      setLoadingVideoDetails(true);
      try {
        const data = await fetchVideoDetails(params.videoId);
        if (data) {
          setLoadingVideoDetails(false);
          setVideo(data);
        }
      } catch (error) {
        throw new Error(`${error}`)
      }
    };

    getVideoDetails();
  }, [params.videoId]);

  useEffect(() => {
    setSelectedCategory();
  }, []);

  return (
    <Box
      py={4}
      px={{ base: 2, md: 4, lg: 5 }}
      w="100%"
      display="flex"
      flexDirection={{ base: "column", md: "row", lg: "row" }}
      justifyContent={{ base: "center", md: "center", lg: "center" }}
      alignItems={{ base: "flex-start", md: "flex-start", lg: "flex-start" }}
      gap={4}
    >
      {loadingVideoDetails ? (
        <Box w={{ base: "100%", md: "60%", lg: "60%", xl: "40%" }}>
          <LoadingSkeleton height={"23rem"} />
        </Box>
      ) : (
        <Box w={{ base: "100%", md: "58%", lg: "60%" }}>
          <VideoPlayer videoUrl={video.videoUrl}/>
          <VideoDetails video={video} />
          <CommentSection videoId={params.videoId} />
        </Box>
      )}
      <Box w={{ base: "100%", md: "40%", lg: "36%", xl: "40%" }}>
        <InfiniteScroll
          dataLength={relatedVideos.length}
          next={fetchVideos}
          hasMore={true}
          loader={<DarkLoadingSpinner /> }
          style={{ width: "100%" }}
          scrollableTarget="relatedVideosContainer"
        >
            <Text 
              fontWeight="bold"
              fontSize={{ base: "1rem", md: "1.2rem", lg: "1.3rem" }} 
              mb={2}
            >
              Watch More
          </Text>
          <Divider mb={4} borderColor={'teal'}  size='md'/>
          {!loadingRelatedVideos && relatedVideos && relatedVideos.length > 0 ?
            relatedVideos.map((v: any) => (
              <RelatedVideoItem key={v.id} video={v} />
            )): (
              [...Array(12)].map((_, index) => (
                <Box mb={2} w={"100%"} key={index}>
                  <LoadingSkeleton height={"13rem"} />
                </Box>
              ))
            )}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default page;
