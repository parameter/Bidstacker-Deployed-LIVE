import Image from 'next/image';
import karta from '../../public/images/karta.jpg';
import Link from 'next/link';
import { calcSumFromBudget } from '@/lib/calc-sum-from-budget';

export default function RequestItem(props) {
  if (!props.request) {
    return;
  }

  return (
    <>
      <Link
        href={`/management/supplier/supplier-requests/${props.groupId}`}
        shallow
      >
        <div className="bg-orange rounded-2xl w-fit h-full p-5 shadow-lg shadow-gray-200 border-2 border-gray-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
          <h2 className="text-xl font-bold flex justify-center">
            {props.request.request_metadata?.marking}
          </h2>
          <div className="bg-white w-40 h-20 my-3 flex justify-center rounded-lg">
            <Image src={karta} alt="Map"></Image>
          </div>
          <p className="text-sm">
            <span className="font-semibold">
              {props.request.request_items.length}
            </span>{' '}
            {props.request.request_items.length > 1 ? 'Artiklar' : 'Artikel'}
          </p>
          <p className="text-sm">
            Ordervärde: {calcSumFromBudget(props.request.request_items)} SEK
          </p>
          <div className="mt-5">
            <u className="no-underline text-xs text-zinc-700">
              <li>{props.request.delivery[0].city}</li>
              <li>{props.request.delivery[0].deliveryType}</li>
              <li>EF 1-5 anställda</li>
            </u>
          </div>
        </div>
      </Link>
    </>
  );
}
