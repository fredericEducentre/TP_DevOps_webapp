import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json())
      .then(json => setUsers(json))
  }, []);

  const createUser = () => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: id,
      name: name,
      email: email
    };

    const userList = [...users, newUser];

    fetch(`http://${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: `${name}`, email: `${email}` }),
    })
    console.log("User create successfully")
    setName('')
    setEmail('')
    setUsers(userList)
  }

  const deleteUser = (id) => {
    fetch(`http://${process.env.REACT_APP_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const userList = users.filter(item => item.id !== id);
    setUsers(userList)
    console.log("User delete successfully")
  }

  return (
    <div className="App container mt-5">
    <div className="row">
      <div className="col-md-4">
        <h1>Create User</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mb-3" onClick={createUser}>Create</button>
      </div>
      <div className="col-md-8">
        <h1>Users</h1>
        <ul className="list-group">
          {users.map((user, index) =>
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                ID: {user.id} | Username: {user.name} | Email: {user.email}
              </span>
              <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
  );
}

export default App;
