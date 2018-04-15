import React from 'react'
import { connect } from 'react-redux'

const SettingsView = props => {
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
