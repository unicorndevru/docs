import './styles.css'
import React from 'react'
import R from 'ramda'
import { TestField, Paper } from 'material-ui'
import { Link } from 'react-router'

export default (props) => {

  let groups = R.map((group) => {
    let links = R.map((doc) => {
      return (
        <li key={ doc.name }>
          <Link to={ `/docs/${ group.name }/${ doc.name }` }>
            { doc.label }
          </Link>
        </li>
      )
    }, group.children)

    return (
      <div key={ group.name }>
        <span>
          { group.label }
        </span>
        <ul>
          { links }
        </ul>
      </div>
    )
  }, props.documents)

  return (
    <Paper className="Navigation" zDepth={ 0 }>
      { groups }
    </Paper>
  )
}
