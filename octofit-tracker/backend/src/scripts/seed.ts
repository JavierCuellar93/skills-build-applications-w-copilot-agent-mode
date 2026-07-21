import { connectDatabase } from '../config/database.js';

await connectDatabase();
console.log('Database connected');
