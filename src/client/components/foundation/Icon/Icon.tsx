import type { FC } from 'react';
import type { IconType } from 'react-icons';

type Props = {
  IconType: IconType;
  width: number;
  height: number;
  color: string;
};

export const Icon: FC<Props> = ({ color, height, IconType, width }) => {
  return (
    <span style={{ color, height: `${height}px`, width: `${width}px` }}>
      <IconType />
    </span>
  );
};
