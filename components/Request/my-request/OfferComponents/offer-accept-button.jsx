'use client';

const OfferAcceptButton = ({ status, acceptOffer }) => {
  console.log('status', status);
  return (
    <>
      {status === 'accepted' ? (
        <button className="flex flex-row rounded-md border-b bg-orange font-bold justify-center items-center w-full p-2 text-white text-lg">
          <div>Accepterad!</div>
        </button>
      ) : status === 'new' ? (
        <>
          <button
            className="flex flex-row rounded-md border-b font-bold bg-green-faded hover:bg-green-dark justify-center items-center w-full p-2 text-white text-lg transition ease-in-out"
            onClick={() => {
              acceptOffer();
            }}
          >
            <div>Acceptera?</div>
          </button>
          <button className="flex flex-row justify-center items-center font-bold bg-gray-200 hover:bg-gray-400 w-full sm:-[400] p-2 border rounded-md border-gray-300 text-lg my-4 transition ease-in-out">
            <div>Tacka Nej</div>
          </button>
        </>
      ) : null}
    </>
  );
};

export default OfferAcceptButton;
