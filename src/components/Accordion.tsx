import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface Props {
  text: string;
  title: string;
  buttonText: string;
}

export const Accordion: FC<Props> = (props: Props): ReactElement => {
  const { text, title, buttonText } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  const { t } = useTranslation();

  const onClick = () => {
    setOpen(!open);
  };

  const splitTextRows = (text: string) => {
    const rows = t(text).split('\n');
    return rows.map(row => <p key={row}>{row}</p>);
  };

  return (
    <div className='accordion'>
      {open && (
        <>
          <button className='accordion-toggle' onClick={() => onClick()}>
            <FontAwesomeIcon className='accordion-icon' icon='angle-up' />
            {t(`${buttonText}`)}
          </button>
          <div className='accordion-content'>
            <h3>{t(`${title}`)}</h3>
            <div>{splitTextRows(text)}</div>
          </div>
        </>
      )}
      {!open && (
        <>
          <button className='accordion-toggle' onClick={() => onClick()}>
            <FontAwesomeIcon className='accordion-icon' icon='angle-down' />
            <span>{t(`${buttonText}`)}</span>
          </button>
        </>
      )}
    </div>
  );
};
