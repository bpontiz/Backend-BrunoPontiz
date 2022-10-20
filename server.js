const container = require('./container.js');

const express = require('express');

const app = express();

const PORT = 8080;

app.listen(PORT, () =>
    console.log(
        `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
    )
);

// solo traer productos cuando los pedimos

app.get('/productos', (req, res) => {
    
});