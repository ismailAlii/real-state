import { createPortal } from 'react-dom';
import './slider.scss';

function Slider({
  images,
  open,
  index,
  closeSlider,
  nextImg,
  prevImg,
}) {
  return createPortal(
    <div
      className={`slider ${open ? 'active' : ''}`}
    >
      <div className='imgContainer'>
        <img
          src={images[index]}
          alt=''
        />
      </div>
      <button
        className='btnLeft'
        onClick={() => prevImg()}
      >
        <img
          src='/arrow.png'
          alt='Go left'
        />
      </button>
      <button
        className='btnRight'
        onClick={() => nextImg()}
      >
        <img
          src='/arrow.png'
          alt='Go Right'
        />
      </button>
      <button
        className='btnClose'
        onClick={() => closeSlider()}
      >
        X
      </button>
    </div>,
    document.getElementById('slider')
  );
}

export default Slider;
