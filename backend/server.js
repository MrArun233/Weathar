const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake database (in-memory)
let wishes = [];
console.log(wishes)
// POST route - receive wish
app.post('/wishes', (req, res) => {
  const wish = { id: Date.now(), ...req.body };
  wishes.unshift(wish);
  res.status(201).json({ message: 'Wish saved!', wish });
});

// GET route - send all wishes
app.get('/wishes', (req, res) => {
  res.json(wishes);
});
app.patch("/wishes/:id", (req, res) => {
  const id = Number(req.params.id);
  const { inputValue } = req.body;

  if (!inputValue) {
    return res.status(400).json({ message: "inputValue is required" });
  }

  const task = wishes.find((item) => item.id === id);

  if (task) {
    task.inputValue = inputValue;
    res.status(200).json({ message: "Task updated successfully", task });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// DELETE route - delete a wish by ID
app.delete('/wishes/:id', (req, res) => {
  const id = Number(req.params.id); // Get ID from URL

  const index = wishes.findIndex(wish => wish.id === id);

  if (index !== -1) {
    const deleted = wishes.splice(index, 1); // Remove from array
    res.status(200).json({
      message: 'Wish deleted successfully',
      deletedWish: deleted[0]
    });
  } else {
    res.status(404).json({ message: 'Wish not found' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
