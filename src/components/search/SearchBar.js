import React, {useRef, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SearchSuggestion from './SearchSuggestion';
import useSearch from '../../hooks/useSearch';
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSearchSuggestion } from '../../utils/searchSlice';

const SearchBar = () => {
  // const searchText = useRef(null);
  const [ searchQuery, setSearchQuery ] = useState('');
  const showSearchSuggestion = useSelector((state)=> state.search.showSearchSuggestion);
  const dispatch = useDispatch();
  useSearch(searchQuery);
  const navigate = useNavigate();
  const suggestionListRef = useRef(null);

  const handleInputChange = (e)=> {
    const query = e.target.value || '';
    setSearchQuery(query);
    if(query.length >= 3){
      dispatch(setShowSearchSuggestion(true)); 
    }
    else{
      dispatch(setShowSearchSuggestion(false)); 
    }
    
    
  };

  const handleSearch = () => {
    if(searchQuery){
      // setSearchQuery(searchText.current.value);
      navigate(`/shop/?search=${searchQuery}`);
      dispatch(setShowSearchSuggestion(false));
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    dispatch(setShowSearchSuggestion(false));
  };

  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){
      handleSearch();
      dispatch(setShowSearchSuggestion(false));
    }
  };

  const handleBlur = (e) => {
    // Check if the new focus is on the suggestion list
    if (suggestionListRef.current && !suggestionListRef.current.contains(e.relatedTarget)) {
      dispatch(setShowSearchSuggestion(false));
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className='flex relative lg:w-[520px] w-full'>
          <input 
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={()=> searchQuery.length >= 3 && dispatch(setShowSearchSuggestion(true))}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            type='text' 
            className='border border-light-dark rounded-sm outline-1 outline-secondary px-4 py-2 h-10 2xl:h-12 text-light-dark w-full pr-20'
            placeholder='Search for products...'
          />
          {searchQuery &&
            <CloseOutlinedIcon onClick={handleClearSearch} className='bg-transparent hover:bg-gray-300 text-black !w-10 !h-10 p-2 rounded-full absolute right-16 top-1/2 -translate-y-1/2 cursor-pointer' />
          }

          <button onClick={handleSearch} className='bg-secondary text-white absolute top-1/2 right-0 -translate-y-1/2 px-4 py-2 h-10 2xl:h-12 flex items-center justify-center'><SearchIcon/></button>
      </form>
      {showSearchSuggestion &&
        <div ref={suggestionListRef} onMouseDown={(e) => e.preventDefault()}>
          <SearchSuggestion />
        </div>
      }
    </>
  )
}

export default SearchBar
