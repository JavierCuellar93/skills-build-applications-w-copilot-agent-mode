import express from 'express';
import mongoose from 'mongoose';
import { apiRoutes } from './routes/apiRoutes.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', apiUrl: apiBaseUrl });
});
app.use('/api', apiRoutes);
const startServer = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
};
startServer().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});
