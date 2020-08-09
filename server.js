const express = require('express');

const app = express();

// Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User API Routes
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
