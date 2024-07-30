"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Dropzone from "./Dropzone";
import ReactPlayer from "react-player";
import { fetchMe } from '../../api/auth';
import { uploadVideo } from '../../api/video'

export enum FileType {
  VIDEO = 'video',
}

export default function Upload() {
  const router = useRouter()
  const toast = useToast();

  const [userId, setUserId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null) as any;

  const [videoTitle, setVideoTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const me = await fetchMe();
        const { user } = me;
        setUserId(user._id)
        if (!user) {
          router.push('/')
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUser();
  }, [userId]);

  const onDrop = (file: any) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedFile(file);
      };
      reader.readAsDataURL(file[0]);
    } catch (error) {
      throw new Error(`Error reading file: ${error}`);
    }
  };

  const handleTitleChange = (e: any) => {
    setVideoTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    const videoData =  { file: uploadedFile[0], title: videoTitle, description, uploadedBy: userId }
    try {
      setUploading(true);
      const data = await uploadVideo(videoData)
      setUploadedFile(data);

      toast({
        title: "Video uploaded successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      router.push('/')
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <form onSubmit={handleUpload}>
      {!uploadedFile && (
        <>
        <Box justifyContent='space-between' mb='24px'  width="full">
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            accept={[FileType.VIDEO]}
          />
        </Box>
        {uploading && (
          <Box mt={4}>
            <CircularProgress value={uploadProgress} color="green.400" />
          </Box>
        )}
        </>
      )}
      <Grid
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
        gap={4}
      >
        {uploadedFile && (
          <>
            <GridItem rowSpan={2} colSpan={1}>
              <Text>Video preview</Text>
              <video controls>
                <ReactPlayer
                  url={`${uploadedFile}`}
                  controls
                  width={"100%"}
                  height={"100%"}
                  style={{ aspectRatio: "16/9", verticalAlign: "middle" }}
                />
                  Your browser does not support the video element.
                </video>
            </GridItem>
            <Stack>
              <GridItem colSpan={2}>
                <Input 
                  placeholder="Video title..." 
                  value={videoTitle} 
                  onChange={handleTitleChange}
                />
              </GridItem>
              <GridItem colSpan={2.5} mt={4}>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder='Add description for your video'
                  size='md'
                />
              </GridItem>
              <GridItem colSpan={3} mt={8}>
                <Button
                  variant="outline"
                  type="submit"
                  color={'teal'}
                  width="md"
                >
                  Upload Video
                </Button>
              </GridItem>
            </Stack>
        </>
        )}
      </Grid>
    </form>
  );
}