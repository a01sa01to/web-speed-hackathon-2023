import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';
import type { ScrollPosition } from 'react-lazy-load-image-component';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';

import styles from './Image.module.css';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
  scrollPosition?: ScrollPosition;
};

const img = ({ fill, scrollPosition, ...rest }: Props) => {
  return (
    <LazyLoadImage
      className={classNames(styles.container, {
        [styles.container__fill]: fill === true,
      })}
      scrollPosition={scrollPosition}
      {...(rest as any)}
    />
  );
};

export const Image = trackWindowScroll(img) as FC<Props>;
