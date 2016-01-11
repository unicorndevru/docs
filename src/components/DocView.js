import R from 'ramda'
import React from 'react'

export default (props) => {

  let docView = null

  if(R.is(String, props.document.doc)){
    docView = (
      <section
        className='recipe md-whiteframe-3dp'
        dangerouslySetInnerHTML={{ __html: props.document.doc }}>
      </section>
    )
  } else {
    docView = props.document.doc
  }

  return (
      <section state={ props.document.name }>
      <h3>
        { props.document.label }
      </h3>
      <div>
        { docView }
      </div>
    </section>
  )
}
