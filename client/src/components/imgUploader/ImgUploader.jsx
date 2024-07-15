import './imgUploader.scss';

function ImgUploader({ currentUser, img, setImg }) {
  const oldImg = currentUser.avatar || '/noavatar.jpg';
  const handleFileChange = (event) => {
    setImg(event.target.files[0]);
  };
  return (
    <>
      <img
        src={img ? URL.createObjectURL(img) : oldImg}
        alt={currentUser.username}
        className='avatar'
      />
      <input
        className='fileInput'
        type='file'
        accept='image/*'
        name='image'
        id='image'
        onChange={handleFileChange}
      />
    </>
  );
}

export default ImgUploader;
