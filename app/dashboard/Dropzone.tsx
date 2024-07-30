"use client";

import React, { useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const fileTypesArray = [
  {
    key: 'video',
    value: ['video/mp4', 'video/quicktime']
  },
];

const Dropzone = ({ onDrop, multiple, accept }: any) => {

  const acceptedExtensions = useMemo((): any => {
    return Object.fromEntries(
      accept.flatMap((fileType: any) => {
        const matchingObject = fileTypesArray.find(
          (obj) => obj.key === fileType
        );
        return matchingObject
          ? matchingObject.value.map((value) => [value, []])
          : [];
      })
    );
  }, [accept]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedExtensions,
    multiple,
  });

  return (
    <Box 
      p={4} 
      borderWidth={2} 
      borderColor="gray.300" 
      borderRadius="md" 
      cursor="pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Text>Drag 'n' drop a video file here, or click to select a file</Text>
    </Box>
  );
};

export default Dropzone;
