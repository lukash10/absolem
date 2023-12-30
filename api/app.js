const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./config/routes');

const authMiddleware = require('./config/authMiddleware');
var history = require('connect-history-api-fallback');

require('dotenv').config();

const PORT = process.env.PORT;
const path = require('path');

var corsOptions = {
  origin: `http://localhost:${PORT}`,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// app.use(authMiddleware);
app.use('/api', routes());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(
  history({
    verbose: true,
  })
);

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../public')));

const { db } = require('./config/sequelize.js');
db.sync();

// db
// .query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true})
// .then(function(results) {
//     db.sync({force: true});
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
