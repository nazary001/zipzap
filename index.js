import express from 'express';
import bodyParser from 'body-parser';
import { customAlphabet } from 'nanoid';

const server = express();
const PORT = 5000; //env variable
const HOST_URL = 'http://localhost:5000'; //env variable

server.use(bodyParser.json());

const generateId = customAlphabet('0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', 7);

// Here we will keep the correspondence between shortened and original URLs
// In a real project, a database will be connected here
const urlDatabase = {};


// Short URL generation
server.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const id = generateId();
  urlDatabase[id] = originalUrl;
  return res.json({shortUrl: `${HOST_URL}/${id}`});
});

// Expanding a shortened URL
server.get('/:id', (req, res) => {
  const id = req.params.id;
  const originalUrl = urlDatabase[id];
  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    return res.status(404).send('URL not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});