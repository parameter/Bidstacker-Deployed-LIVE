"use client"

const OfferBudget = ({getOfferBudget, getTotalOfferBudget}) => {
  return (
    <section className="w-11/12 mobile:w-full">
        <article className="grid grid-cols-2 text-base mt-2 text-left items-baseline">
        <div>Orderkostnad</div>
        <div className="text-base tracking-tight">
            {getOfferBudget()}
            <span className="text-xs font-light tracking-tight">
            {' '}
            kr (ex. moms)
            </span>
        </div>
        </article>
        <article className="grid grid-cols-2 text-base border-b text-left items-baseline">
        <div>Leveranskostnad</div>
        <div className="text-base tracking-tight">
            200
            <span className="text-xs font-light tracking-tight">
            {' '}
            kr (ex. moms)
            </span>
        </div>
        </article>
        <article className="grid grid-cols-2 grid-rows-2 text-lg mt-2 mb-4 text-left items-baseline">
        <div>Total kostnad</div>
        <div className="font-semibold text-2xl tracking-tight">
            {getTotalOfferBudget()}
            <span className="text-xs font-light tracking-tight">
            {' '}
            kr (ex. moms)
            </span>
        </div>
        <div></div>
        <span className="text-xs">
            {getTotalOfferBudget() * 1.25} kr (inkl. 25% moms)
        </span>
        </article>
    </section>
  )
}

export default OfferBudget