"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import { SlOptions } from "react-icons/sl";
import { PiShareFatThin } from "react-icons/pi";
import { RiPlayListAddFill } from "react-icons/ri";
import { LiaDownloadSolid } from "react-icons/lia";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiOutlineScissors } from "react-icons/hi";
import { MdOutlineOutlinedFlag } from "react-icons/md";

const VideoDetails = ({ video }: any) => {
  const { colorMode } = useColorMode();

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <>
      <Text
        mt={3}
        fontWeight="bold"
        fontSize={{ base: "1rem", md: "1.2rem", lg: "1.3rem" }}
      >
        {video.title}
      </Text>
      <Box mt={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{
            base: "space-between",
            md: "flex-start",
            lg: "flex-start",
          }}
        >
          <Box ml={4}>
            <Button
              variant="ghost"
              borderRadius="3xl"
              colorScheme="transparent"
            >
              Join
            </Button>
            <Button
              ml={2}
              variant="solid"
              borderRadius="3xl"
              colorScheme="gray"
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        mt={3.5}
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          px={4}
          py={3}
          display={"flex"}
          alignItems={"center"}
          bg={colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"}
          borderRadius="3xl"
        >
          <Box mr={2} display={"flex"} alignItems={"center"} cursor="pointer">
            <BiLike fontSize={"1.15rem"} />
            <Text ml={1} fontWeight="semibold">
            </Text>
          </Box>
          |
          <Box ml={2} cursor="pointer">
            <BiDislike fontSize={"1.25rem"} />
          </Box>
        </Box>
        <Menu>
          <MenuButton as={Button} borderRadius={"full"}>
            <SlOptions />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <LiaDownloadSolid
                fontSize={"1.15rem"}
                style={{ marginRight: "0.75rem" }}
              />{" "}
              Download
            </MenuItem>
            <MenuItem>
              <PiShareFatThin
                fontSize={"1.15rem"}
                style={{ marginRight: "0.75rem" }}
              />{" "}
              Share
            </MenuItem>
            <MenuItem>
              <RiPlayListAddFill
                fontSize={"1.15rem"}
                style={{ marginRight: "0.75rem" }}
              />{" "}
              Save
            </MenuItem>
            <MenuItem>
              <HiOutlineScissors
                fontSize={"1.15rem"}
                style={{ marginRight: "0.75rem" }}
              />{" "}
              Clip
            </MenuItem>
            <MenuItem>
              <MdOutlineOutlinedFlag
                fontSize={"1.15rem"}
                style={{ marginRight: "0.75rem" }}
              />
              Report
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Box
        mt={3}
        px={{ base: 2, md: 4, lg: 4 }}
        pt={{ base: 2, md: 4, lg: 4 }}
        maxH={showFullDescription ? "fit-content" : "7.5rem"}
        bg={colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"}
        overflow={"hidden"}
        borderTopRadius="xl"
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Text ml={4} fontWeight={"bold"}>
            {moment(video.createdAt).fromNow()}
          </Text>
        </Box>
        <Box mt={2}>{video.description}</Box>
      </Box>
      <Text
        pt={1}
        fontWeight="bold"
        cursor={"pointer"}
        borderBottomRadius="xl"
        px={{ base: 2, md: 4, lg: 4 }}
        pb={{ base: 2, md: 4, lg: 4 }}
        bg={colorMode === "dark" ? "whiteAlpha.200" : "blackAlpha.200"}
        onClick={() => setShowFullDescription((prev) => !prev)}
      >
        {showFullDescription ? "Show less" : "Show more"}
      </Text>
    </>
  );
};

export default VideoDetails;
