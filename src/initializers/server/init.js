import React from 'react'
import R from 'ramda'
import ReactDOMServer from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import Routes from 'routes'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import { routerDidChange } from 'redux/modules/router/actions'
import { prepareData } from 'utils'

export const matchRoute = function(path){
  const history = createMemoryHistory()
  const location = history.createLocation(path)

  return new Promise(function(resolve, reject){
    match({
      routes: Routes,
      location: location
    }, function(error, redirectLocation, renderProps){
      if(renderProps){

        const render = () => ReactDOMServer.renderToString(
          <Provider>
            <RoutingContext { ...renderProps }/>
          </Provider>
        )
        resolve({ error, redirectLocation, render })
      } else {
        resolve({ error, redirectLocation, render: null, data: null })
      }
    })
  })
}
