const server = require('./api/index');

const PORT = process.env.PORT || 9000;

server.get('/', (req, res) => {
  res.status(200).json('Server is alive!');
});

server.listen(PORT, () => {
  console.log(
    `*** Server listening on port: ${PORT} in ${server.settings.env} mode ***`
  );
});
