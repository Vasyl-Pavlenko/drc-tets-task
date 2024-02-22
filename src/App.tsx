import React from 'react';
import { fetchApiUsers, User } from './api/api-readonly-file.ts';
import { Table, Loader } from './components';
import { Column } from './helpers';
import './styles.css';

const userColumns: Column[] = [
  { id: 'id', title: 'ID', render: ({ id }) => id },
  { id: 'firstname', title: 'First name', render: ({ firstname }) => firstname },
  { id: 'lastname', title: 'Last name', render: ({ lastname }) => lastname },
  { id: 'country', title: 'Country', render: ({ country }) => country },
];

function App() {
  const [users, setUsers] = React.useState<User[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);

    fetchApiUsers()
      .then(setUsers)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="app">
      {isLoading && <Loader isLoading={isLoading} />}

      {isError && <div className="error">Something went wrong...</div>}

      {users && users.length === 0 && <div className="error">No users found.</div>}

      <div className="tableContainer">
        <Table data={users ?? []} defaultLimit={10} columns={userColumns} />
      </div>
    </div>
  );
}

export default App;
