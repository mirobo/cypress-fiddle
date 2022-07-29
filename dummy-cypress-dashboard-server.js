var http = require('http');
http
  .createServer(function (req, res) {
    console.log(`------dummy-cypress-dashboard-server------`);
    console.log(`url: ${req.url}`);
    console.log(`method: ${req.method}`);
    for (var property in req.headers) {
      if (req.headers.hasOwnProperty(property)) {
        console.log(property + ': ' + req.headers[property]);
      }
    }
    let body = [];
    req
      .on('error', (err) => {
        console.error(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        console.log('------body:start------');
        console.log(JSON.stringify(body, null, 2));
        console.log('------body:end------');
        console.log(`server response status code: ${body.tags[0]}`);
        res.writeHead(Number(body.tags[0]));
        res.end();
      });
  })
  .listen(1234);
