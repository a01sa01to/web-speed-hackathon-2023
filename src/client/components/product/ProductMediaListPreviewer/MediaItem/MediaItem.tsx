import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';

import type { MediaFileFragmentResponse } from '../../../../graphql/fragments';
import { getMediaType } from '../../../../utils/get_media_type';
import { Icon } from '../../../foundation/Icon';
import { Image } from '../../../foundation/Image';

import * as styles from './MediaItem.styles';

type Props = {
  file: MediaFileFragmentResponse;
};

export const MediaItem: FC<Props> = ({ file }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const mediaType = getMediaType(file.filename);

  useEffect(() => {
    if (mediaType === 'image') {
      return setImageSrc(file.filename.replace(/\.jpg$/, '_thumb.jpg'));
    } else {
      return setImageSrc(file.filename.replace(/\.mp4$/, '_thumb.png'));
    }
  }, [file.filename, mediaType]);

  if (imageSrc === undefined) {
    return null;
  }

  return (
    <div className={styles.container()}>
      <Image fill src={imageSrc} />
      {mediaType === 'video' && (
        <div className={styles.playIcon()}>
          <Icon IconType={FaPlay} color="#ffffff" height={16} width={16} />
        </div>
      )}
    </div>
  );
};
