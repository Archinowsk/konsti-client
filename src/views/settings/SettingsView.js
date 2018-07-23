/* @flow */
import React from 'react'
import { connect } from 'react-redux'

type Props = {}

const SettingsView = (props: Props) => {
  return (
    <div className="settings-view">
      <p>SettingsView</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch: Function) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsView)
