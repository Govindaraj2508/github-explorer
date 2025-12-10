import React, { useState } from 'react'
import './Home.css'
import Users from '../UserComponent/Users';
import { useGetUserQuery, useSearchUsersQuery } from '../../common/services/apiServices';

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: allUsers, isLoading: allUsersLoading, isError: allUsersError } = useGetUserQuery();
  
  const { data: searchResults, isLoading: searchLoading, isError: searchError } = useSearchUsersQuery(
    searchTerm,
    { skip: !searchTerm.trim() }
  );

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Auto-search as user types
    if (value.trim()) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  // Determine which data to display
  const displayUsers = isSearching && searchTerm.trim() ? searchResults : allUsers;
  const displayLoading = isSearching ? searchLoading : allUsersLoading;
  const displayError = isSearching ? searchError : allUsersError;

  return (
    <>
      <div className={`search-container`}>
        <div className="search-wrapper">
          <div className="search-input-container">
            <input
              type="text"
              id='search-input'
              placeholder="Search GitHub Users..."
              className="search-input"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            {searchTerm ? (
              <button
                className="serach-button clear-button"
                onClick={handleClear}
                title="Clear search"
              >
                <svg
                  className="clear-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ):
            <button
              className="search-button"
              onClick={handleSearch}
            >
              <svg
                className="search-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button> }
            
          </div>
        </div>
      </div>
      <Users 
        searchedusers={displayUsers} 
        isSearchUserLoading={displayLoading} 
        isSearchUserError={displayError}
        searchTerm={searchTerm}
      />
    </>
  )
}