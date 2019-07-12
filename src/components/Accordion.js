/* @flow */
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { StatelessFunctionalComponent, Element } from 'react'

export type Props = {|
  text: string,
  title: string,
  buttonText: string,
|}

export const Accordion: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { text, title, buttonText } = props

  const [open, setOpen] = React.useState(false)
  ;(open: boolean)

  const { t } = useTranslation()

  const onClick = () => {
    setOpen(!open)
  }

  return (
    <div className='accordion'>
      {open && (
        <Fragment>
          <button className='accordion-toggle' onClick={() => onClick()}>
            <FontAwesomeIcon className='accordion-icon' icon='angle-up' />
            {t(`${buttonText}`)}
          </button>
          <div className='accordion-content'>
            <h3>{t(`${title}`)}</h3>
            <p>{t(`${text}`)}</p>
          </div>
        </Fragment>
      )}
      {!open && (
        <Fragment>
          <button className='accordion-toggle' onClick={() => onClick()}>
            <FontAwesomeIcon className='accordion-icon' icon='angle-down' />
            <span>{t(`${buttonText}`)}</span>
          </button>
        </Fragment>
      )}
    </div>
  )
}
