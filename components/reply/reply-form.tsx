import React from 'react';
import { Button, Input, InputGroup } from '@chakra-ui/react';

interface Props {
  commentId: string;
  text: string;
  onReply: (commentId: string, text: string) => void
  handleCancelReply: () => void
  onChange: (event: any) => void
}

const ReplyForm = ({ text, commentId, onReply, onChange, handleCancelReply }: Props) => {

  const handleReply = (event: any) => {
    event.preventDefault();
    onReply(commentId, text);
  };

  return (
    <form onSubmit={handleReply}>
      <InputGroup size="md" mt={2}>
        <Input
          type="text"
          value={text}
          onChange={onChange}
          placeholder="Add a reply..."
        />
        <Button type="button" ml={2} mr={2} onClick={handleCancelReply}> Cancel</Button>
        <Button type="submit"> Reply</Button>
      </InputGroup>
    </form>
  );
};

export default ReplyForm;
