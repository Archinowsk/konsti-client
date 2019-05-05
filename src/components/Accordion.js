/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  text: string,
  title: string,
}

type State = {
  open: boolean,
}

const Accordian = (props: Props, state: State) => {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()

  const onClick = () => {
    setOpen(!open)
  }

  return (
    <div className='accordian'>
      {open && (
        <React.Fragment>
          <button onClick={() => onClick()}>
            <FontAwesomeIcon className='accordian-icon' icon='angle-up' />
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
            <FontAwesomeIcon className='accordian-icon' icon='angle-down' />
            <span>
              {t('show')} {t(`${props.title}`)}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default Accordian
