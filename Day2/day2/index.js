const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const {method, url} = req;
  if (method === 'GET') {
    if (url === '/todos') {
      debugger
      const todos = fs.readFileSync('./todos.json', 'utf-8');
      res.writeHead(200, {
        'content-type': 'application/json'
      });
      res.write(todos);
      res.end();
    }
  }
});

server.listen(5005, () => {
  console.log('Up and running: http://127.0.0.1:5005')
})