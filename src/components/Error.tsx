import React, { FunctionComponent, ReactElement } from 'react';

interface Props {
  meta: any;
}

export const Error: FunctionComponent<Props> = (
  props: Props
): ReactElement<'span'> => {
  const {
    meta: { touched, error },
  } = props;

  return touched && error ? <span>{error}</span> : <span />;
};
