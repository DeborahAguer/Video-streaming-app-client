import React, { useState } from 'react';
import { Box, Divider, Text, Button } from '@chakra-ui/react';

const RepliesDisplay = ({ replies }: any) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <Box ml={16}>
      { replies.length > 0 && <Button size="sm" mr={2} mb={2} onClick={() => setShowReplies(!showReplies)}>
        {showReplies ? 'Hide Replies' : `${replies.length} Replies`}
      </Button>}
      {showReplies ? (
        <Box bg='#F6F6F6' p={4} borderRadius='8px'>
          {replies.map((reply: any, index: any) => (
            <Box key={index} mb={4}>
              <Text fontWeight="bold">Reply by: {reply.replyBy}</Text>
              <Text pt={3} pb={5}>{reply.text}</Text>
              <Divider />
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default RepliesDisplay;
