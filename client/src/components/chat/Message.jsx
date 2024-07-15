function Message({
  name,
  avatar,
  message,
  ...props
}) {
  const cutText = (text, length) => {
    if (text.length < length) {
      return text;
    }
    return `${text.slice(0, length - 1)}..`;
  };
  return (
    <div
      className='message'
      {...props}
    >
      <img
        src={avatar}
        alt='User'
      />
      <span>{name}</span>
      <p>{cutText(message, 30)}</p>
    </div>
  );
}

export default Message;
