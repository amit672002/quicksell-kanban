import React, { useState } from 'react';
import './Navbar.css';
import { ChevronDown, ChevronUp, Menu } from 'react-feather';

const Navbar = ({sortingOption, onSortingChange, groupingOption, onGroupingChange}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='nav-bar'>
      <div className='drop-down' onClick={toggleDropdown}>
        <Menu className='icon' /> 
        <p className='bold'>Display</p>
        {dropdownOpen ? <ChevronUp className='icon' /> : <ChevronDown className='icon' />}
      </div>
      {dropdownOpen && (
        <div className='dropdown-options'>
          <div className='dd-option'>
            <label>Group By:</label>
            <select value={groupingOption} onChange={onGroupingChange}>
              <option value='status'>Status</option>
              <option value='user'>User</option>
              <option value='priority'>Priority</option>
            </select>
          </div>
          <div className='dd-option'>
            <label>Sort By:</label>
            <select value={sortingOption} onChange={onSortingChange}>
              <option value='priority'>Priority</option>
              <option value='title'>Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
