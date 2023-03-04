import classNames from 'classnames';
import type { FC } from 'react';
import type { IconType } from 'react-icons';

import * as styles from './Icon.styles';

type Props = {
  IconType: IconType;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, IconType, width }) => {
  return (
    <span className={classNames(styles.container({ color, height, width }))}>
      <IconType />
    </span>
  );
};
