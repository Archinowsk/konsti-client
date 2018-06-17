/* @flow */
import React from 'react'
import { connect } from 'react-redux'

type Props = {}

const SettingsView = (props: Props) => {
  return (
    <div>
      <p>SettingsView</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView)
