import React, { FC, ReactElement } from 'react';

interface Props {
  meta: { touched: boolean; error: string };
}

export const Error: FC<Props> = (props: Props): ReactElement => {
  const {
    // eslint-disable-next-line react/prop-types
    meta: { touched, error },
  } = props;

  return touched && error ? <span>{error}</span> : <span />;
};
