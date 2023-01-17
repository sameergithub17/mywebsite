const http = require('http');
const fs = require('fs');
const ejs=require('ejs')

const server = http.createServer((req, res) => {
    if (req.url === '/style.css') {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        const stream = fs.createReadStream(__dirname + '/css/style.css');
        stream.pipe(res);

}else if (req.url === '/') {
    res.write('Hello World!');
    res.end();

  }else if(req.url === '/index'){
fs.readFile(__dirname+'/html/index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
})
    }else if(req.url === '/contact'){
    fs.readFile(__dirname+'/html/contact.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });

    }else if(req.url === '/date'){
	fs.readFile(__dirname+'/html/date.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const date = new Date();
    const html = data.toString().replace('{{date}}', date);
    res.end(html);
  });
    }else if(req.url === '/template'){
ejs.renderFile(__dirname+'/ejs/template.ejs', function (err, data) {
    if (err) {
      return console.log(err);
    }else{
	    res.write(data)
	    res.end()
    }

    
});

}else{
	res.write('Invalid Request!');
    res.end();
  }
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

