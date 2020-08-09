const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const users = require('../../Users');

// Gets all users
router.get('/', (req, res) => {
  try {
    // throw new Error();
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: 'The users information could not be retrieved.' });
  }
});

// Get single member
router.get('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  try {
    if (found) {
      res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
      res.status(404).json({
        message: `The user with the specified ID ${req.params.id} does not exist.`
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved.' });
  }
});

// Create user
router.post('/', (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    bio: req.body.bio
  };

  try {
    if (!newUser.name || !newUser.bio) {
      return res
        .status(400)
        .json({ errorMessage: 'Please provide name and bio for the user.' });
    }

    users.push(newUser);
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database.'
    });
  }
});

// Update user
router.put('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  try {
    if (found) {
      const updatedUser = req.body;
      users.forEach(user => {
        if (user.id === parseInt(req.params.id)) {
          user.name = updatedUser.name ? updatedUser.name : user.name;
          user.bio = updatedUser.bio ? updatedUser.bio : user.bio;

          res.json({ message: 'The user has been updated.', user });
        }
      });
    } else {
      res
        .status(404)
        .json({
          message: `The user with the specified ID ${req.params.id} does not exist.`
        });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The user information could not be modified.'
    });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  const found = users.some(user => user.id === parseInt(req.params.id));

  try {
    if (found) {
      res.json({
        message: `User ${req.params.id} has been deleted.`,
        users: users.filter(user => user.id !== parseInt(req.params.id))
      });
    } else {
      res.status(404).json({
        message: `The user with the specified ID ${req.params.id} does not exist.`
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The user could not be removed'
    });
  }
});

module.exports = router;
