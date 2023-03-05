import type { FC } from 'react';
import { memo, useState } from 'react';

import type { ReviewFragmentResponse } from '../../../graphql/fragments';
import isEqual from '../../../utils/is_equal';
import { PrimaryButton } from '../../foundation/PrimaryButton';
import { TextArea } from '../../foundation/TextArea';
import { ReviewList } from '../ReviewList';

import styles from './ReviewSection.module.css';

const LESS_THAN_64_LENGTH_REGEX = /^([\s\S\n]{0,8}){0,8}$/u;

type Props = {
  reviews: ReviewFragmentResponse[] | undefined;
  hasSignedIn: boolean;
  onSubmitReview: (reviewForm: ReviewForm) => void;
};

type ReviewForm = {
  comment: string;
};

export const ReviewSection: FC<Props> = memo(({ hasSignedIn, onSubmitReview, reviews }) => {
  const [form, setForm] = useState<ReviewForm>({ comment: '' });
  const [error, setError] = useState<ReviewForm>({ comment: '' });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    onSubmitReview(form);
    setForm({ comment: '' });
  };
  const validate = (target: string, value: string) => {
    if (target === 'comment') setError({ comment: '' });
    if (target === 'comment' && value != '' && !LESS_THAN_64_LENGTH_REGEX.test(value)) {
      setError({ comment: '64 文字以内でコメントしてください' });
    }
  };

  return (
    <div>
      {reviews != null ? <ReviewList reviews={reviews} /> : null}
      {hasSignedIn && (
        <form action="#" className={styles.form} data-testid="form-review" onSubmit={onSubmit}>
          <div className={styles.commentTextAreaWrapper}>
            <TextArea
              required
              id="comment"
              label="レビューを送信する"
              onChange={(e) => {
                validate('comment', e.target.value);
                setForm({ comment: e.target.value });
              }}
              placeholder="こちらの野菜はいかがでしたか？"
              rows={6}
              value={form.comment}
            />
            <p className={styles.error}>{error.comment}</p>
          </div>
          <div className={styles.submitButton}>
            <PrimaryButton size="base" type="submit">
              送信
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
}, isEqual);

ReviewSection.displayName = 'ReviewSection';
