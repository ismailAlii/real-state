import { Link } from 'react-router-dom';
import './card.scss';

function Card({ item }) {
  return (
    <div className='card'>
      <div className='left'>
        <Link to={`/${item.id}`}>
          <img
            src={item.images[0]}
            alt={item.title}
          />
        </Link>
      </div>
      <div className='right'>
        <Link to={`/${item.id}`}>
          <h1>{item.title}</h1>
        </Link>
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
        <div className='itemFooter'>
          <div className='footerLeft'>
            <div>
              <img
                src='/bed.png'
                alt='Bed'
              />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div>
              <img
                src='/bath.png'
                alt='Bathroom'
              />
              <span>
                {item.bathroom} bathroom
              </span>
            </div>
          </div>
          <div className='footerRight'>
            <button>
              <img
                src='/save.png'
                alt='Save'
              />
            </button>
            <button>
              <img
                src='/chat.png'
                alt='Chat'
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
