import React, { useState, useMemo, useEffect } from 'react'
import { useGetUserQuery } from '../../common/services/apiServices';
import './Users.css';

function UsersTest({searchedusers, isSearchUserLoading, isSearchUserError, searchTerm}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const {data: users, isLoading, isError, error} = useGetUserQuery();
  
  const usersToDisplay = searchTerm ? searchedusers : users;
  
  const paginatedData = useMemo((items, totalPages) => {
    if (!usersToDisplay) return { items: [], totalPages: 0 };
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = usersToDisplay.slice(startIndex, endIndex);
    const totalPages = Math.ceil(usersToDisplay.length / itemsPerPage);
    
    return { items, totalPages };
  }, [usersToDisplay, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const renderPageNumbers = () => {
    const pages = [];
    const { totalPages } = paginatedData;
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  useEffect(() => {
    setCurrentPage(1);
    paginatedData = { items: searchedusers, totalPages: 0 };
  }, [searchTerm]);

  // Show search loading state
  if (isSearchUserLoading) {
    return (
      <div className="users-container">
        <div className="loading">Searching users...</div>
      </div>
    );
  }

  // Show initial loading state
  if (isLoading && !searchTerm) {
    return (
      <div className="users-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  // Show search error
  if (isSearchUserError) {
    return (
      <div className="users-container"> 
        <div className="error">Error: Failed to search users</div>
      </div>
    );
  }

  // Show general error
  if (isError) {
    return (
      <div className="users-container">
        <div className="error">Error: {error?.message || 'Failed to load users'}</div>
      </div>
    );
  }

  // Show no results message
  if (!usersToDisplay || usersToDisplay.length === 0) {
    return (
      <div className="users-container">
        <div className="no-results">
          {searchTerm ? `No users found matching "${searchTerm}"` : 'No users available'}
        </div>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, usersToDisplay?.length || 0);

  return (
    <div className="users-container">
      <div className="glass-table-wrapper">
        <h2 className="table-title">
          {searchTerm ? `Search Results for "${searchTerm}"` : 'GitHub Users'}
        </h2>
        <div className="glass-table-container">
          <div className="table-scroll-wrapper">
            <table className="glass-table">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>Type</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.items.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img 
                        src={user.avatar_url} 
                        alt={user.login}
                        className="user-avatar"
                      />
                    </td>
                    <td className="username">{user.login}</td>
                    <td>
                      <span className="user-type">{user.type}</span>
                    </td>
                    <td>
                      <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="profile-link"
                      >
                        View Profile
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pagination-container">
            <div className="items-per-page">
              <label>Items per page:</label>
              <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            
            <div className="pagination-info">
              Showing {startIndex} - {endIndex} of {usersToDisplay?.length || 0}
            </div>
            
            <div className="pagination-controls">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {renderPageNumbers()}
              
              <button
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === paginatedData.totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersTest;