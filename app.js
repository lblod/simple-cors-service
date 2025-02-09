import bodyParser from 'body-parser';
import { app, errorHandler } from 'mu';
import fetch from 'node-fetch';

app.use(
  bodyParser.json({
    limit: '50mb',
    type: function (req) {
      return /^application\/json/.test(req.get('content-type'));
    },
  })
);


app.all("/", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing url query parameter');
  }

  try {
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers, host: new URL(targetUrl).host },
      body: ['GET', 'HEAD'].includes(req.method) ? null : JSON.stringify(req.body)
    };

    const response = await fetch(targetUrl, fetchOptions);

    res.setHeader('content-type', response.headers.get('content-type'));
    const responseBody = await response.text();

    res.status(response.status).send(responseBody);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.use(errorHandler);
