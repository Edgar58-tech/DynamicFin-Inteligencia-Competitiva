const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,  // Habilita WebSocket
      changeOrigin: true,
      onError: (err, req, res) => {
        console.log('Proxy WebSocket error:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('WebSocket proxy error');
      },
    })
  );
};