"use client"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
const OfferChecklist = ({ deliveryDate, uncompleted, priceDeviation, amountDeviation }) => {
  return (
    <ul className="flex flex-col text-sm ml-8 mt-4 items-base tablet:text-lg text-left">
        <li className="flex items-center">
            <CheckCircleIcon className="text-green h-6 w-6" />
            <p className="ml-2">Leveranskrav</p>
        </li>
        <li className="flex items-center">
            {deliveryDate === true ? (
            <CheckCircleIcon className="text-green h-6 w-6" />
            ) : (
            <ExclamationTriangleIcon className="text-red font-bold h-6 w-6" />
            )}
            <p className={`" text-left ml-2 ${
                deliveryDate === true ? 'font-base' : 'font-bold'
            } "`}
            >
            Leveransdatum
            </p>
        </li>
        <li className="flex items-center">
            {priceDeviation === false ? (
            <CheckCircleIcon className="text-green h-6 w-6" />
            ) : (
            <ExclamationTriangleIcon className="text-red font-bold h-6 w-6" />
            )}{' '}
            {priceDeviation === false ? (
            <p className="ml-2">Förfrågade priser</p>
            ) : (
            <p className="font-bold ml-2">Förhandlade priser</p>
            )}
        </li>
        <li className="flex items-center mb-4">
            {amountDeviation === false ? (
            <CheckCircleIcon className="text-green h-6 w-6" />
            ) : (
            <ExclamationTriangleIcon className="text-red font-bold h-6 w-6" />
            )}{' '}
            {amountDeviation === false ? (
            <p className="ml-2">Offert komplett</p>
            ) : (
            <p className="font-bold ml-2">
                Offerten saknar artiklar
            </p>
            )}
        </li>
    </ul>
  )
}

export default OfferChecklist