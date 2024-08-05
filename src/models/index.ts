import { Sequelize } from 'sequelize';
import { initializeUser } from './UserModel';
import { initializeBook } from './BookModel';
import { initializeTransactionManagement } from './TransactionManagementModel';

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

//DB seçeneği eklenebilir.

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

const User = initializeUser(sequelize);
const Book = initializeBook(sequelize);
const TransactionManagement = initializeTransactionManagement(sequelize);

// Associations
Book.hasMany(TransactionManagement, {foreignKey: 'bookId'});
User.hasMany(TransactionManagement, {foreignKey: 'userId'});
TransactionManagement.belongsTo(Book, {foreignKey: 'bookId'});
TransactionManagement.hasMany(User, {foreignKey: 'userId'});

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: User,
    Book: Book,
    TransactionManagement: TransactionManagement
}

export default db;