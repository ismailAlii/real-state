import './filter.scss';

function Filter() {
  return (
    <div className='filter'>
      <h1>
        Search results for <b>London</b>
      </h1>
      <div className='top'>
        <div className='item'>
          <label htmlFor='city'>Location</label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='City Location'
          />
        </div>
      </div>
      <div className='bottom'>
        <div className='box'>
          <label htmlFor='type'>Type</label>
          <select
            name='type'
            id='type'
          >
            <option value='any'>Any</option>
            <option value='buy'>Buy</option>
            <option value='rent'>Rent</option>
          </select>
        </div>
        <div className='box'>
          <label htmlFor='property'>
            Property
          </label>
          <select
            name='property'
            id='property'
          >
            <option value='any'>Any</option>
            <option value='apartment'>
              Apartment
            </option>
            <option value='house'>House</option>
            <option value='conda'>Conda</option>
            <option value='land'>Land</option>
          </select>
        </div>
        <div className='box'>
          <label htmlFor='minPrice'>
            Min Price
          </label>
          <input
            type='number'
            name='minPrice'
            id='minPrice'
          />
        </div>
        <div className='box'>
          <label htmlFor='maxPrice'>
            Max Price
          </label>
          <input
            type='number'
            name='maxPrice'
            id='maxPrice'
          />
        </div>
        <div className='box'>
          <label htmlFor='bedroom'>Bedroom</label>
          <input
            type='number'
            name='bedroom'
            id='bedroom'
          />
        </div>
        <button>
          <img
            src='/search.png'
            alt='Search'
          />
        </button>
      </div>
    </div>
  );
}

export default Filter;
