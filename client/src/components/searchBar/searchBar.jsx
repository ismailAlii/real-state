import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.scss';

const types = ['buy', 'rent'];

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    type: 'buy',
    location: '',
    minPrice: 0,
    maxPrice: 0,
  });

  const changeType = (type) => {
    setQuery((prev) => {
      return { ...prev, type };
    });
  };

  return (
    <div className='searchBar'>
      <div className='type'>
        {types.map((type) => {
          return (
            <button
              key={type}
              className={
                query.type === type
                  ? 'active'
                  : ''
              }
              onClick={() => changeType(type)}
            >
              {type}
            </button>
          );
        })}
      </div>
      <form>
        <input
          type='text'
          name='location'
          placeholder='City Location'
        />
        <input
          type='number'
          name='minPrice'
          min={0}
          max={10000000}
          placeholder='Min Price'
        />
        <input
          type='number'
          name='maxPrice'
          min={0}
          max={10000000}
          placeholder='Max Price'
        />
        <button onClick={() => navigate('/list')}>
          <img
            src='/search.png'
            alt='Search'
          />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
