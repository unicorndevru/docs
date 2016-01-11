import './styles.css'
import React from 'react'
import Navigation from '../Navigation'
import { Paper } from 'material-ui'

export default (props) => {
  return (
    <div className="docView">
      <Navigation documents={ props.documents }/>
      <Paper className="docView-container" zDepth={ 2 }>
        { props.children }
      </Paper>
    </div>
  )
}
