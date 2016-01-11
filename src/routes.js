import React from 'react'
import R from 'ramda'

import DocsLayout from 'components/DocsLayout'
import DocView from 'components/DocView'
import documents from '../documents'


const routeFromDoc = (document) => {
  return {
    path: `${ document.name }`,
    component: (props) => DocView(R.merge(props, { document }))
  }
}

export default {
  component: (props) => DocsLayout(R.merge(props, { documents })),
  path: '/docs',

  childRoutes: R.map((documentsRoot) => {
    return {
      component: (props) => <div>{ props.children }</div>,
      path: documentsRoot.name,
      childRoutes: R.map(routeFromDoc, documentsRoot.children)
    }
  }, documents)
}
