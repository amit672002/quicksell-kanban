import React, { useEffect, useState } from "react";
import './App.css';

import Navbar from "./Components/Navbar/Navbar";
import Board from "./Components/Board/Board";
import axios from "axios"; 

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(localStorage.getItem('groupBy') || "status");
  const [sortingOption, setSortingOption] = useState(localStorage.getItem('sortBy') || "priority");

  const priorityLabels = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent"
  };

  const userLabels = users.reduce((labels, user) => {
    labels[user.id] = user.name;
    return labels;
  }, {});

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupingOption);
    localStorage.setItem('sortBy',sortingOption);
  }, [groupingOption, sortingOption])

  async function getDetails() {
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      setTickets(data.tickets); 
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const organizeTickets = () => {
    const organizedData = {};
  
    if (groupingOption === 'status') {
      const ticketStatus = {
        "Backlog": [],
        "Todo": [],
        "In progress": [],
        "Done": [],
        "Cancelled": []
      };
  
      tickets.forEach(ticket => {
        if (ticketStatus[ticket.status]) {
          ticketStatus[ticket.status].push(ticket);
        }
      });
  
      return ticketStatus;
    } else if (groupingOption === 'priority') {
      const priorityStatus = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: []
      };
  
      tickets.forEach(ticket => {
        if (priorityStatus[ticket.priority]) {
          priorityStatus[ticket.priority].push(ticket);
        }
      });
  
      return priorityStatus;
    } else if (groupingOption === 'user') {
      const userStatus = {
        "usr-1": [],
        "usr-2": [],
        "usr-3": [],
        "usr-4": [],
        "usr-5": []
      };
  
      tickets.forEach(ticket => {
        if (userStatus[ticket.userId]) {
          userStatus[ticket.userId].push(ticket);
        }
      });
  
      return userStatus;
    } 
  
    return organizedData;
  };

  const sortByPriority = (tickets) => {
    return [...tickets].sort((a, b) => b.priority - a.priority);
  };

  const sortByTitle = (tickets) => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const sortedTickets = (tickets) => {
    if (sortingOption === 'priority') {
      return sortByPriority(tickets);
    } else if (sortingOption === 'title') {
      return sortByTitle(tickets);
    }
    return tickets;
  };

  const boards = organizeTickets();

  return (
    <div className="app-container">
      <div className="app-navbar">
        <nav>
          <Navbar 
            sortingOption={sortingOption}
            onSortingChange={handleSortingChange}
            groupingOption={groupingOption}
            onGroupingChange={handleGroupingChange}
          />
        </nav>
      </div>
      <div className="app-outer-container">
        <div className="app-boards">
        {Object.keys(boards).map(boardKey => (
            <Board 
              key={boardKey} 
              title={groupingOption === 'priority' ? priorityLabels[boardKey] : 
              groupingOption === "user" ? userLabels[boardKey] : boardKey}
              count={boards[boardKey].length}
              tickets={sortedTickets(boards[boardKey])}
              sortingOption={sortingOption}
              groupingOption={groupingOption} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;