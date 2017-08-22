"use strict";

import React from 'react';
import TapEventPlugin from 'react/lib/TapEventPlugin';
import EventPluginHub from 'react/lib/EventPluginHub';
import {render} from 'react-dom';
import {Router, match, RouterContext, browserHistory} from 'react-router';
import routes from './routes';

EventPluginHub.injection.injectEventPluginsByName({'TapEventPlugin': TapEventPlugin});

const history = browserHistory;

const configuration = window.Email.configurationFromNode;

const serverHost = configuration.appHost

function matchLocation(location) {

  match({routes, location, history}, (error, redirectLocation, renderProps) => {

    const pageData = window.Email.pageData;
    delete window.Email.pageData;
    if (pageData && !_.isEmpty(pageData)) {
      let component;
      renderProps.params.configuration = configuration;
      renderProps.params.apiData = renderPageData;
      component = <RouterContext {...renderProps} history={history}/>;
      render(component, document.getElementById('main'));
    } else {
      fetchApiData(renderProps, serverHost)
        .then(apiData => {
            apiData.status = 200;
            renderProps.params.configuration = configuration;
            renderProps.params.apiData = apiData;
            let component = <RouterContext {...renderProps} history={history}/>;
            render(component, document.getElementById('main'));
          }
        ).catch(err => {
        renderProps.params.apiData = {};
        if (err.status >= 500) {
          renderProps.params.apiData.status = 500;
        } else {
          renderProps.params.apiData.status = 404;
        }
        renderProps.params.configuration = configuration;
        let component = <RouterContext {...renderProps} />;
        render(component, document.getElementById('main'));
      });
    }

  });
}

history.listen(matchLocation);
