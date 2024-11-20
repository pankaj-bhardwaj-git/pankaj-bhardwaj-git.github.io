import React, { useState, useEffect } from 'react';
import { HeaderAndLoader } from './components/HeaderAndLoader/HeaderAndLoader';
import { MainBoard } from './components/MainBoard/MainBoard';
import { groupTickets ,sortTickets} from './helpers/helper';
// import { groupTickets, sortTickets } from './utils/helpers';
import './App.css';
function App() {
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState({});
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets);
        setUserData(
          data.users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})
        );
        setLoading(false);
      });
  }, []);

  const groupedData = groupTickets(sortTickets(tickets, ordering), grouping);

  return (
    <div className="App">
      <HeaderAndLoader
        grouping={grouping}
        setGrouping={setGrouping}
        ordering={ordering}
        setOrdering={setOrdering}
        loading={loading}
      />
      {!loading && (
        <MainBoard
          groupedData={groupedData}
          grouping={grouping}
          userData={userData}
        />
      )}
    </div>
  );
}

export default App;
