import express from 'express';
import {Sequelize} from 'sequelize';
import db from './src/models';
import userRoutes from './src/routes/userRoutes';
import bookRoutes from './src/routes/bookRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Sync All Models with DB
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created.');
});

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

const startServer = async () => {
  try {
    
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
      try {
        await (db.sequelize as Sequelize).authenticate();
        console.log('Database connected');
      } catch (err) {
        console.log('Error connecting to database:', err);
      }
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();