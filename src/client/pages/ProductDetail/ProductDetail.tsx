import type { FC } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { WidthRestriction } from '../../components/foundation/WidthRestriction';
import { ProductMediaListPreviewer } from '../../components/product/ProductMediaListPreviewer';
import { ProductOverview } from '../../components/product/ProductOverview';
import { ProductPurchaseSection } from '../../components/product/ProductPurchaseSeciton';
import { ReviewSection } from '../../components/review/ReviewSection';
import { useActiveOffer } from '../../hooks/useActiveOffer';
import { useAmountInCart } from '../../hooks/useAmountInCart';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useProduct } from '../../hooks/useProduct';
import { useReviews } from '../../hooks/useReviews';
import { useSendReview } from '../../hooks/useSendReview';
import { useUpdateCartItem } from '../../hooks/useUpdateCartItems';
import { modalContext } from '../../store/modal';
import { normalizeCartItemCount } from '../../utils/normalize_cart_item';

import styles from './ProductDetail.module.css';

export const ProductDetail: FC = () => {
  const { productId } = useParams();
  const ctx = useContext(modalContext);

  const { product } = useProduct(Number(productId));
  const { reloadReview, reviews } = useReviews(product?.id);
  const { isAuthUser, reloadQuery: reloadUser } = useAuthUser();
  const { sendReview } = useSendReview();
  const { updateCartItem } = useUpdateCartItem();
  const handleOpenModal = () => ctx.setModalState('SIGN_IN');
  const { amountInCart } = useAmountInCart(Number(productId));
  const { activeOffer } = useActiveOffer(product);

  const handleSubmitReview = ({ comment }: { comment: string }) => {
    sendReview({
      comment,
      productId: Number(productId),
    }).then(() => reloadReview({ requestPolicy: 'network-only' }));
  };

  const handleUpdateItem = (productId: number, amount: number) => {
    updateCartItem({ amount: normalizeCartItemCount(amount), productId }).then(() =>
      reloadUser({ requestPolicy: 'network-only' }),
    );
  };

  return (
    <>
      {product && (
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
      )}
      <Layout>
        <WidthRestriction>
          <div className={styles.container}>
            <section className={styles.details}>
              <ProductMediaListPreviewer product={product} />
              <div className={styles.overview}>
                <ProductOverview activeOffer={activeOffer} product={product} />
              </div>
              <div className={styles.purchase}>
                <ProductPurchaseSection
                  amountInCart={amountInCart}
                  isAuthUser={isAuthUser}
                  onOpenSignInModal={handleOpenModal}
                  onUpdateCartItem={handleUpdateItem}
                  product={product}
                />
              </div>
            </section>

            <section className={styles.reviews}>
              <h2 className={styles.reviewsHeading}>レビュー</h2>
              <ReviewSection hasSignedIn={isAuthUser} onSubmitReview={handleSubmitReview} reviews={reviews} />
            </section>
          </div>
        </WidthRestriction>
      </Layout>
    </>
  );
};
