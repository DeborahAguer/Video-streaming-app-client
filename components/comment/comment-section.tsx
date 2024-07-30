"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import CommentItem from "./comment-item";
import DarkLoadingSpinner from "../spinner/dark-loading-spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { addComment, loadMoreComments } from '../../api/comment';
import { fetchMe } from '../../api/auth'

const CommentSection = ({ videoId }: any) => {
  const toast = useToast();

  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInputText(event.target.value);
    if (event.target.value.trim().length > 0) {
      setShow(true);
    }
  };

  const fetchMoreComments = async () => {
    try {
      const comments = videoId && await loadMoreComments(videoId);
      setComments(comments);
    } catch (error) {
      throw new Error(`${error}`)
    }
  };

  useEffect(() => {
    fetchMoreComments();
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

  const handleCommentSubmit = async (e: any) => {
    e.preventDefault();
    const comment = { text, commentBy: userId, videoId };
    try {
      setIsLoading(true)
      await addComment(comment);

      toast({
        title: "Comment added",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });

      await fetchMoreComments();
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setInputText('')
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleCommentSubmit}>
        <InputGroup size="md" mt={4}>
          <Input 
            placeholder="Add a comment..." 
            pr="4.5rem"
            value={text} 
            onChange={handleInputChange} 
          />
          <InputRightElement width="4.5rem">
            {isLoading && <DarkLoadingSpinner />}
            {show && <Button h="1.75rem" size="sm" type="submit">
                Post
              </Button>
            }
          </InputRightElement>
        </InputGroup>
      </form>
      {
        comments && comments.length > 0 ? (
          <Box
            mt={3}
            p={4}
            borderRadius={"2xl"}
            id="commentsContainer"
            display={{ base: "none", md: "block", lg: "block" }}
            bg={"blackAlpha.200"}
          >
            <InfiniteScroll
              dataLength={comments.length}
              next={fetchMoreComments}
              hasMore={true}
              loader={<DarkLoadingSpinner />}
              scrollableTarget="commentsContainer"
            >
              { comments.map((comment: any) => (
                <CommentItem key={comment.id} comment={comment} />
                ))
              }
            </InfiniteScroll>
          </Box>
        ): (
          null
        )
      }
    </>
  );
};

export default CommentSection;
