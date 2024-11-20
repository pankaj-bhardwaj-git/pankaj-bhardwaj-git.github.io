import React, { useState } from 'react';
import './HeaderAndLoader.css';
import displayIcon from '../../assets/Display.svg';

export const HeaderAndLoader = ({
  grouping,
  setGrouping,
  ordering,
  setOrdering,
  loading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return loading ? (
    <div className="headerandloader-loader">Loading...</div>
  ) : (
    <div className="headerandloader-header">
      <div className="headerandloader-dropdown-container">
        <button
          className="headerandloader-dropdown-button"
          onClick={toggleDropdown}
        >
          <img
            src={displayIcon}
            alt="Display"
            className="headerandloader-dropdown-icon"
          />
          <span>Display</span>
        </button>
        {isDropdownOpen && (
          <div className="headerandloader-dropdown-menu">
            <div className="headerandloader-dropdown-section">
              <label>Grouping</label>
              <select
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="headerandloader-dropdown-section">
              <label>Ordering</label>
              <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
