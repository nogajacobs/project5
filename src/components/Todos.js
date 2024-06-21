import React, { useEffect, useState } from 'react';

const Todos = ({ userId }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then(response => response.json())
      .then(data => setTodos(data));
  }, [userId]);

  return (
    <div>
      <h2>Todos for User {userId}</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
