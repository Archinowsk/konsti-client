/* @flow */
import React, { Fragment } from 'react'
import { ResultsList } from 'views/admin/components/ResultsList'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {}

export const HelperView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  return (
    <div className='admin-view'>
      <Fragment>
        <ResultsList />
      </Fragment>
    </div>
  )
}
