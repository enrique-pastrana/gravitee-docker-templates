// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simulated in-memory database
let products = [
  { id: 1, name: "Laptop", price: 1200, stock: 10 },
  { id: 2, name: "Mouse", price: 25, stock: 50 }
];

let albums = [
  { id: 1, artist: "Pink Floyd", title: "The Dark Side of the Moon", format: "Vinyl" },
  { id: 2, artist: "Radiohead", title: "OK Computer", format: "CD" }
];

// ROOT route - Message when visiting localhost:3000
app.get('/', (req, res) => {
  res.send('Welcome to the API! Use /products or /albums to interact with the data.');
});

/* ---------------------- PRODUCTS ---------------------- */

// CREATE - Add a new product
app.post('/products', (req, res) => {
  const { name, price, stock } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: "Name must be a non-empty string" });
  }
  if (typeof price !== 'number' || isNaN(price)) {
    return res.status(400).json({ error: "Price must be a number" });
  }
  if (!Number.isInteger(stock)) {
    return res.status(400).json({ error: "Stock must be an integer" });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name: name.trim(),
    price,
    stock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// READ - Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// READ - Get a product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// UPDATE - Update a product by ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, stock } = req.body;
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: "Name must be a non-empty string" });
    }
    products[productIndex].name = name.trim();
  }
  if (price !== undefined) {
    if (typeof price !== 'number' || isNaN(price)) {
      return res.status(400).json({ error: "Price must be a number" });
    }
    products[productIndex].price = price;
  }
  if (stock !== undefined) {
    if (!Number.isInteger(stock)) {
      return res.status(400).json({ error: "Stock must be an integer" });
    }
    products[productIndex].stock = stock;
  }

  res.json(products[productIndex]);
});

// DELETE - Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});

/* ---------------------- ALBUMS ---------------------- */

// CREATE - Add a new album
app.post('/albums', (req, res) => {
  const { artist, title, format } = req.body;

  if (typeof artist !== 'string' || artist.trim() === '') {
    return res.status(400).json({ error: "Artist must be a non-empty string" });
  }
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: "Title must be a non-empty string" });
  }
  if (typeof format !== 'string' || format.trim() === '') {
    return res.status(400).json({ error: "Format must be a non-empty string" });
  }

  const newAlbum = {
    id: albums.length ? albums[albums.length - 1].id + 1 : 1,
    artist: artist.trim(),
    title: title.trim(),
    format: format.trim()
  };

  albums.push(newAlbum);
  res.status(201).json(newAlbum);
});

// READ - Get all albums
app.get('/albums', (req, res) => {
  res.json(albums);
});

// READ - Get an album by ID
app.get('/albums/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const album = albums.find(a => a.id === id);

  if (!album) {
    return res.status(404).json({ error: "Album not found" });
  }

  res.json(album);
});

// UPDATE - Update an album by ID
app.put('/albums/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { artist, title, format } = req.body;
  const albumIndex = albums.findIndex(a => a.id === id);

  if (albumIndex === -1) {
    return res.status(404).json({ error: "Album not found" });
  }

  if (artist !== undefined) {
    if (typeof artist !== 'string' || artist.trim() === '') {
      return res.status(400).json({ error: "Artist must be a non-empty string" });
    }
    albums[albumIndex].artist = artist.trim();
  }
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: "Title must be a non-empty string" });
    }
    albums[albumIndex].title = title.trim();
  }
  if (format !== undefined) {
    if (typeof format !== 'string' || format.trim() === '') {
      return res.status(400).json({ error: "Format must be a non-empty string" });
    }
    albums[albumIndex].format = format.trim();
  }

  res.json(albums[albumIndex]);
});

// DELETE - Delete an album by ID
app.delete('/albums/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const albumIndex = albums.findIndex(a => a.id === id);

  if (albumIndex === -1) {
    return res.status(404).json({ error: "Album not found" });
  }

  const deletedAlbum = albums.splice(albumIndex, 1);
  res.json(deletedAlbum[0]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
