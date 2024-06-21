const axios = require('axios');
const fs = require('fs');

const fetchData = async () => {
  try {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const comments = await axios.get('https://jsonplaceholder.typicode.com/comments');
    const albums = await axios.get('https://jsonplaceholder.typicode.com/albums');
    const photos = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
    const users = await axios.get('https://jsonplaceholder.typicode.com/users');

    const data = {
      posts: posts.data,
      comments: comments.data,
      albums: albums.data,
      photos: photos.data,
      todos: todos.data,
      users: users.data,
    };

    fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
    console.log('Data saved to db.json');
  } catch (err) {
    console.error('Error fetching data', err);
  }
};

fetchData();
