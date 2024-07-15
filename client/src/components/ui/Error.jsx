import './error.scss';

function Error({
  message = 'Something went Wronge!',
}) {
  return (
    <span className='errorMessage'>
      {message}
    </span>
  );
}

export default Error;
