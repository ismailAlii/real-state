import { useState } from 'react';
import ChatBox from './ChatBox';
import Message from './Message';
import './chat.scss';

function Chat() {
  const [chatBoxOpen, setChatBoxOpen] =
    useState(false);

  const openChat = () => {
    setChatBoxOpen(true);
  };

  const closeChat = () => {
    setChatBoxOpen(false);
  };
  return (
    <div className='chat'>
      <div className='messages'>
        <h1>Messages</h1>
        <Message
          name='John Doe'
          avatar='/noavatar.jpg'
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sit ducimus delectus tenetur unde?'
          onClick={openChat}
        />
        <Message
          name='John Doe'
          avatar='/noavatar.jpg'
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sit ducimus delectus tenetur unde?'
          onClick={openChat}
        />
        <Message
          name='John Doe'
          avatar='/noavatar.jpg'
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sit ducimus delectus tenetur unde?'
          onClick={openChat}
        />
        <Message
          name='John Doe'
          avatar='/noavatar.jpg'
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sit ducimus delectus tenetur unde?'
          onClick={openChat}
        />
        <Message
          name='John Doe'
          avatar='/noavatar.jpg'
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sit ducimus delectus tenetur unde?'
          onClick={openChat}
        />
      </div>
      <ChatBox
        open={chatBoxOpen}
        closeFn={closeChat}
      />
    </div>
  );
}

export default Chat;
