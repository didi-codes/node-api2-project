const server = require('./api/server');

const port = 9000;

server.listen(port, () => {
  console.log(
    `Can You Hear It On Port ${port}? Listen the server lives on port ${port}`
  );
});
