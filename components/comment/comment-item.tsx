import React, { useState, useEffect } from 'react';
import moment from "moment";
import { Avatar, Box, Button, Text, useToast, } from "@chakra-ui/react";
import { BiLike, BiDislike } from "react-icons/bi";
import DisplayReplies from '../../components/reply/render-replies';
import ReplyForm from '../../components/reply/reply-form';
import { fetchRepliesForComment, replyToComment } from '../../api/replies';
import { fetchMe } from '../../api/auth'


const CommentItem = ({ comment }:any) => {
  const toast = useToast();

  const { _id, text, commentBy, createdAt } = comment;

  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleReply = () => {
    setReplying(true);
  };
  const handleCancelReply = () => {
    setReplyText('');
    setReplying(false);
  };

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const data = await fetchRepliesForComment(_id);
        if (data) {
          setReplies(data);
        }
      } catch (error) {
        throw new Error(`${error}`)
      }
    };

    fetchReplies();
  }, []);

  useEffect(() => {
    const me = async () => {
      try {
        const me = await fetchMe();
        const { user } = me;
        setUserId(user._id)
      } catch (error: any) {
        throw new Error(error);
      }
    };

    me();
  }, []);

  const onSubmitReply = async () => {
    const data = { text: replyText, replyBy: userId, commentId: _id };
    try {
      const token = JSON.parse(localStorage.getItem('token') as any);
      await replyToComment(data, token);
      setReplyText('')

      toast({
        title: "Reply added",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
      const replies = await fetchRepliesForComment(_id);
      if (replies) {
        setReplies(replies);
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  return (
    <Box mb={2}>
      <Box display={"flex"}>
        <Avatar
          size={"md"}
          name={commentBy}
          src={''}
        />
        <Box ml={4}>
          <Box display={"flex"} alignItems={"center"}>
            <Text fontSize={"0.9rem"} fontWeight={"semibold"}>
              {commentBy}
            </Text>
            <Text ml={2} fontSize={"0.85rem"} color={"gray.500"}>
              {moment(createdAt).fromNow()}
            </Text>
          </Box>
          <Text pt={1} fontSize={"0.925rem"}>
            {text}
          </Text>
          <Box mt={0.5} display={"flex"} alignItems={"center"}>
            <Box fontSize={"0.8rem"} display={"flex"} alignItems={"center"}>
              <BiLike fontSize={"0.95rem"} style={{ marginRight: "0.25rem" }} />
            </Box>
            <Box ml={4}>
              <BiDislike fontSize={"0.95rem"} />
            </Box>
            {!replying && (<Button
                ml={3}
                variant={"ghost"}
                colorScheme={"gray"}
                borderRadius={"full"}
                fontSize={"0.85rem"}
                onClick={handleReply}
              >
                Reply
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      <Box ml={16} mr={4} mb={4}>
        {replying && (
          <ReplyForm
            text={replyText}
            commentId={_id}
            onChange={(e: any) => setReplyText(e.target.value)}
            onReply={onSubmitReply}
            handleCancelReply={handleCancelReply}
          />
        )}
      </Box>
      <DisplayReplies replies={replies} />
    </Box>
  );
};

export default CommentItem;
