'use client';

import MyOffersList from '@/components/Supplier/my-offers/my-offers-list';
import OfferDetails from '@/components/Supplier/my-offers/offer-details';
import { useRouter } from 'next/router';

const MyOffers = () => {
  const router = useRouter();

  return (
    <div className="w-full bg-gray-100 px-4 py-40">
      {!router.query.params && <MyOffersList />}
      {router.query.params && router.query.params[0] && (
        <OfferDetails
          params={router.query.params[0]}
          groupId={router.query.params[0]}
        />
      )}
    </div>
  );
};

export default MyOffers;
