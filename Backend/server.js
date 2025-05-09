const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port =  process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const server =  http.createServer(app);

initializeSocket(server);
server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});