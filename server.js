const http = require('http');
const { text, buffer } = require('stream/consumers');

const todos = [
  { id: 1, text: 'todos one' },
  { id: 2, text: 'todos two' },
  { id: 1, text: 'todos three' },
];
const server = http.createServer((req, res) => {

  const { method, url } = req;
  let body = [];
  req.on('data', chunk => {
    body.push(chunk);
  })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      let status = 404;
      const response = {
        success: false,
        data: null,
      }

      if (method === 'GET' && url === '/todos') {
        status = 200,
          response.success = true,
          response.data = todos;
      }
      else if (method === 'POST' && url === '/todos') {
        const { id, text } = JSON.parse(body);
        todos.push(id, text);
        status = 201;
        response.success = true,
          response.data = todos;

      }

      res.writeHead(status, {
        'Content-type': 'application/json',
        'X-powered-by': 'node.js'
      });
      res.end(JSON.stringify({ response }));
    })


});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server runing on port  ${PORT}`));  