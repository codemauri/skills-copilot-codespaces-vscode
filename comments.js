// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const { parse } = require('querystring');

const server = http.createServer((req, res) => {
    const path = url.parse(req.url).pathname;
    const params = url.parse(req.url, true).query;
    if (path === '/add-comment') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const comment = parse(body).comment;
            fs.appendFile('comments.txt', comment + '\n', err => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error: ' + err);
                    return;
                }
                res.writeHead(200);
                res.end('Comment added');
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="/add-comment" method="post">');
        res.write('<textarea name="comment"></textarea><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});