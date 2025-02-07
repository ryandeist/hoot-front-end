import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';


const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page for signed in users
      </p>
    </main>
  );
};

export default Dashboard;
