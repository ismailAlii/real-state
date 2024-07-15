import { useEffect, useRef } from 'react';

function ChatBox({ closeFn, open }) {
  const chatRef = useRef(null);
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className={`chatBox ${open ? 'active' : ''}`}>
      <div className='chatHeader'>
        <div className='user'>
          <img
            src='/noavatar.jpg'
            alt='User'
          />
          <span>John Doe</span>
        </div>
        <button onClick={closeFn}>x</button>
      </div>
      <div
        className='chatContent'
        ref={chatRef}
      >
        <div className='text from'>
          <p>Lorem ipsum dolor sit.</p>
          <span>1 hour ago</span>
        </div>
        <div className='text to'>
          <p>
            Lorem ipsum dolor sit. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. At quidem laboriosam animi
            nemo accusantium perferendis, voluptatibus maiores.
          </p>
          <span>1 hour ago</span>
        </div>
        <div className='text to'>
          <p>Lorem ipsum dolor sit.</p>
          <span>1 hour ago</span>
        </div>
        <div className='text from'>
          <p>Lorem ipsum dolor sit.</p>
          <span>1 hour ago</span>
        </div>
        <div className='text to'>
          <p>Lorem ipsum dolor sit.</p>
          <span>1 hour ago</span>
        </div>
        <div className='text from'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quaerat, accusamus! Fugiat alias suscipit minus?
          </p>
          <span>1 hour ago</span>
        </div>
      </div>
      <div className='sendBox'>
        <input
          type='text'
          name='message'
          id='message'
          placeholder='message..'
        />
        <button>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
