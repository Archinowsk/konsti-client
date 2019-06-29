/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { StatelessFunctionalComponent } from 'react'

export type Props = {|
  text: string,
  title: string,
|}

export const Accordion: StatelessFunctionalComponent<Props> = (
  props: Props
) => {
  const [open, setOpen] = React.useState(false)
  ;(open: boolean)

  const { t } = useTranslation()

  const onClick = () => {
    setOpen(!open)
  }

  return (
    <div className='accordion'>
      {open && (
        <React.Fragment>
          <button onClick={() => onClick()}>
            <FontAwesomeIcon className='accordion-icon' icon='angle-up' />
            <span>
              {t('hide')} {t(`${props.title}`)}
            </span>
          </button>
          <h3>{t(`${props.title}`)}</h3>
          <p>{t(`${props.text}`)}</p>
        </React.Fragment>
      )}
      {!open && (
        <div>
          <button onClick={() => onClick()}>
            <FontAwesomeIcon className='accordion-icon' icon='angle-down' />
            <span>
              {t('show')} {t(`${props.title}`)}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
