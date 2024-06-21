import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createPost = async () => {
    try {
      const response = await axios.post('http://localhost:3001/posts', {
        title: 'New Post',
        body: 'This is the body of the new post',
      });
      setData([response.data, ...data]);
    } catch (err) {
      setError(err);
    }
  };

  const updatePost = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/posts/${id}`, {
        title: 'Updated Post',
        body: 'This is the updated body of the post',
      });
      setData(data.map(post => (post.id === id ? response.data : post)));
    } catch (err) {
      setError(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      setData(data.filter(post => post.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={createPost}>Create Post</button>
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => updatePost(post.id)}>Update</button>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
