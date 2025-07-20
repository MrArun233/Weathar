const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // ✅ fixed

app.use(cors());
app.use(express.json());

// In-memory database
let wishes = [];
console.log(wishes);

// POST
app.post('/wishes', (req, res) => {
  const wish = { id: Date.now(), ...req.body };
  wishes.unshift(wish);
  res.status(201).json({ message: 'Wish saved!', wish });
});

// GET
app.get('/wishes', (req, res) => {
  res.json(wishes);
});

// PATCH
app.patch('/wishes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { inputValue } = req.body;

  if (!inputValue) {
    return res.status(400).json({ message: 'inputValue is required' });
  }

  const task = wishes.find(item => item.id === id);

  if (task) {
    task.inputValue = inputValue;
    res.status(200).json({ message: 'Task updated successfully', task });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// DELETE
app.delete('/wishes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = wishes.findIndex(wish => wish.id === id);

  if (index !== -1) {
    const deleted = wishes.splice(index, 1);
    res.status(200).json({ message: 'Wish deleted successfully', deletedWish: deleted[0] });
  } else {
    res.status(404).json({ message: 'Wish not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
