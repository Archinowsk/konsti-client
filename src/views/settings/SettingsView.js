import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const SettingsView = props => {
  const {} = props

  return (
    <div>
      <p>SettingsView</p>
    </div>
  )
}

SettingsView.propTypes = {}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
