import app from './index.js';

const port = 8081;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});