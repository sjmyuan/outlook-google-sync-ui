import Helmet from 'react-helmet';


export default function (reactRenderedBody, configuration, apiData, qualtricsConfig) {
  const head = Helmet.rewind();

  const stringifyApiData = JSON.stringify(apiData);

  const pageData = `
    window.Email = window.Email || {};
    window.Email.configurationFromNode = ${JSON.stringify(configuration)};
    window.Email.pageData = ${stringifyApiData};
  `;

  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${head.title}
        ${head.meta}
        ${head.link}

        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <link rel="stylesheet"
              href=/email/assets/${configuration.assetsMappings["css/main.css"]} />
      </head>
      <body>
        <div id="main">${reactRenderedBody}</div>
        <script type="text/javascript"
                src=${`/email/assets/${configuration.assetsMappings["js/vendor.js"]}`}></script>
        <script type="text/javascript">${pageData}</script>
        <script type="text/javascript"
                src=/email/assets/${configuration.assetsMappings["js/main.js"]}></script>
      </body>
    </html>
    `);
}
