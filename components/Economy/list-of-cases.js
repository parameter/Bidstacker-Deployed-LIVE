import Link from 'next/link';

const ListOfCases = ({ cases }) => {

  return <ul>
        {Object.keys(cases || {}).map((groupId) => {
            return <li key={groupId}>
                <Link
                  href={`/management/economy/${groupId}`}
                  shallow >
                    <div className="grid grid-cols-5 bg-green-100 rounded-md my-2 cursor-pointer">
                        <div className="rounded-md p-2 col-span-2">
                            <span className="font-sans font-light bg-black pt-1 pb-1 px-2 mr-2 text-xs rounded-xl text-white font-bold">
                                Faktura
                            </span>
                            <span>
                                {cases[groupId].marking}
                            </span>
                        </div>
                        <div className="flex col-span-2 pl-4">
                            <input className="peer w-fit border-solid border-2 border-slate-300 bg-green-100 rounded-md px-1 my-2" type="number" min="1" max="1" name="quantity" value="1" />
                        </div>
                        <div className="pl-4">
                            &nbsp;
                        </div>
                    </div>
                </Link>
            </li>
        })}
    </ul>
};

export default ListOfCases;