import { useParams } from 'react-router-dom';
import './SinglePage.scss';
import { listData } from '../../lib/dummyData';
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import { useState } from 'react';

function SinglePage() {
  const [index, setIndex] = useState(0);
  const [openSlider, setOpenSlider] =
    useState(false);
  const { id } = useParams();
  const item = listData.find((e) => e.id === +id);

  const openImgSlider = (i) => {
    setIndex(i);
    setOpenSlider(true);
  };

  const imgs = item.images.map((img, i) => {
    if (i === 0) return;
    return (
      <div
        key={`${img}-${i}`}
        className='img'
        onClick={() => openImgSlider(i)}
      >
        <img
          src={img}
          alt={item.title}
        />
      </div>
    );
  });

  const nextImg = () => {
    setIndex((prev) => {
      return item.images.length === prev + 1
        ? prev
        : prev + 1;
    });
  };
  const prevImg = () => {
    setIndex((prev) => {
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const closeSlider = () => {
    setOpenSlider(false);
  };

  return (
    <div className='singlePage'>
      <Slider
        images={item.images}
        index={index}
        open={openSlider}
        closeSlider={closeSlider}
        nextImg={nextImg}
        prevImg={prevImg}
      />
      <div className='left'>
        <div className='wrapper'>
          <div className='images'>
            <div
              className='main'
              onClick={() => openImgSlider(0)}
            >
              <img
                src={item.images[0]}
                alt={item.title}
              />
            </div>
            <div className='img-list'>{imgs}</div>
          </div>
          <div className='info'>
            <div className='left'>
              <h1>{item.title}</h1>
              <div className='location'>
                <img
                  src='/pin.png'
                  alt='location'
                />
                <span>{item.address}</span>
              </div>
              <span className='price'>
                $ {item.price}
              </span>
            </div>
            <div className='right'>
              <img
                src='/noavatar.jpg'
                alt='Person'
              />
              john doe
            </div>
          </div>
          <p className='desc'>
            Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Corporis
            neque ratione doloribus ab error
            possimus nesciunt veniam omnis,
            consectetur cupiditate tempore
            molestiae nemo asperiores, ad
            similique eius laboriosam, modi
            repellat?
          </p>
        </div>
      </div>
      <div className='right'>
        <div className='wrapper'>
          <h2>General</h2>
          <div className='general'>
            <div className='box'>
              <img
                src='/utility.png'
                alt='Utilities'
              />
              <div className='text'>
                <p>Utilities</p>
                <span>Owner is responsible</span>
              </div>
            </div>
            <div className='box'>
              <img
                src='/pet.png'
                alt='Pet Policy'
              />
              <div className='text'>
                <p>Pet Policy</p>
                <span>Pets not Allowed</span>
              </div>
            </div>
            <div className='box'>
              <img
                src='/fee.png'
                alt='Income Policy'
              />
              <div className='text'>
                <p>Income Policy</p>
                <span>some income</span>
              </div>
            </div>
          </div>
          <h2>Room Sizes</h2>
          <div className='sizes'>
            <div className='box'>
              <img
                src='/size.png'
                alt='Size'
              />
              <span>74 sqft</span>
            </div>
            <div className='box'>
              <img
                src='/bed.png'
                alt='Bed'
              />
              <span>2 beds</span>
            </div>
            <div className='box'>
              <img
                src='/bath.png'
                alt='Bathroom'
              />
              <span>1 bathroom</span>
            </div>
          </div>
          <h2>Nearby Places</h2>
          <div className='place'>
            <div className='box'>
              <img
                src='/school.png'
                alt='School'
              />
              <div className='text'>
                <p>School</p>
                <span>1000 km away</span>
              </div>
            </div>
            <div className='box'>
              <img
                src='/bus.png'
                alt='Bus'
              />
              <div className='text'>
                <p>Bus Stop</p>
                <span>150m away</span>
              </div>
            </div>
            <div className='box'>
              <img
                src='/restaurant.png'
                alt='Restaurant'
              />
              <div className='text'>
                <p>Restaurant</p>
                <span>210m away</span>
              </div>
            </div>
          </div>
          <h2>Location</h2>
          <div className='map'>
            <Map items={[item]} />
          </div>
          <div className='actions'>
            <button>
              <img
                src='/chat.png'
                alt='Message'
              />
              <span>Send a Message</span>
            </button>
            <button>
              <img
                src='/save.png'
                alt='Save'
              />
              <span>Save the Place</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
