import { useState } from 'react';
import FormInput from '../../Form/FormInput';
import FormRadioBox from '../../Form/FormRadioBox';

const DeliveryPart = ({ deliveryMetaInfo, setDeliveryMetaInfo, deliveryPersonalInfo, setDeliveryPersonalInfo, submitRequest }) => {

  const updateDeliveryData = (target) => {
    
  }

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={submitRequest}>
        <h1 className="text-3xl font-bold mb-10">Leveransinformation</h1>

        {/* PROJEKTNUMMER AND MÄRKNING */}
        {/* -------------------------- */}

        <div className="grid gap-6 mb-7 tablet:grid-cols-2">
          <FormInput
            label="Projektnummer"
            onChange={(event) => setDeliveryMetaInfo({
              ...deliveryMetaInfo,
              [event.target.name]: event.target.value,
            })}
            name="projectNumber"
            type="text"
          />
          <FormInput
            label="Märkning"
            onChange={(event) => setDeliveryMetaInfo({
              ...deliveryMetaInfo,
              [event.target.name]: event.target.value,
            })}
            name="marking"
            type="text"
          />
        </div>

        {/* --- */}
        {/* END */}

        {/* LEVERANSALTERNATIV */}
        {/* -------------------------- */}

        <h2 className="font-bold text-xl mb-5">Leveransalternativ</h2>

        <div className="flex items-center mb-4">
          <FormRadioBox
            id="self"
            onChange={(event) => setDeliveryMetaInfo({
              ...deliveryMetaInfo,
              [event.target.name]: event.target.value,
            })}
            value="self"
            name="type"
            className="w-4 h-4 bg-gray-100 accent-gray-500 border-gray-300"
            label="Hämtas av beställare"
            required={true}
          />
        </div>

        <div className="flex items-center">
          <FormRadioBox
            id="service"
            onChange={(event) => setDeliveryMetaInfo({
              ...deliveryMetaInfo,
              [event.target.name]: event.target.value,
            })}
            value="service"
            name="type"
            label="Leveras till beställare"
          />
        </div>

        {/* VEHICLETYPE */}
        {/* ----------- */}
        {deliveryMetaInfo.type && deliveryMetaInfo.type === 'service' && (
          <>
            <h3 className="font-bold mt-5 mb-4">Välj fordon</h3>
            <div className="flex items-center mb-4">
              <FormRadioBox
                id="lastbil"
                onChange={(event) => setDeliveryMetaInfo({
                  ...deliveryMetaInfo,
                  [event.target.name]: event.target.value,
                })}
                value="lastbil"
                name="vehicle"
                label="Lastbil"
                required={deliveryMetaInfo.type === 'service' ? true : false}
              />
            </div>
            <div className="flex items-center mb-4">
              <FormRadioBox
                id="kran"
                onChange={(event) => setDeliveryMetaInfo({
                  ...deliveryMetaInfo,
                  [event.target.name]: event.target.value,
                })}
                value="kran"
                name="vehicle"
                label="Kran"
              />
            </div>
          </>
        )}

        {/* --- */}
        {/* END */}

        {/* LEVERENSDATUM */}
        {/* ------------- */}

        {deliveryMetaInfo.type !== false && (
          <div className="grid gap-6 mb-7 tablet:grid-cols-2 mt-8">
            <div>
              <h3 className="font-bold mb-4">
                {deliveryMetaInfo.type === 'self'
                  ? 'Hämtas tidigast'
                  : 'Levereras tidigast'}
              </h3>

              <FormInput
                label="Tidigast"
                errorMessage="Välj ett korrekt datum"
                onChange={(event) => setDeliveryMetaInfo({
                  ...deliveryMetaInfo,
                  [event.target.name]: event.target.value,
                })}
                name="earliest"
                type="date"
                pattern="^[0-9-]{3,16}$"
                required={true}
              />
            </div>
            <div>
              <h3 className="font-bold mb-4">
                {deliveryMetaInfo.type === 'self' ? 'Hämtas senast' : 'Levereras senast'}
              </h3>
              <FormInput
                label="Senast"
                errorMessage="Välj ett korrekt datum"
                onChange={(event) => setDeliveryMetaInfo({
                  ...deliveryMetaInfo,
                  [event.target.name]: event.target.value,
                })}
                name="latest"
                type="date"
                pattern="^[0-9-]{3,16}$"
                required={true}
              />
            </div>
          </div>
        )}

        {/* --- */}
        {/* END */}

        {/* LEVERANSADRESS */}
        {/* -------------- */}

        {deliveryMetaInfo.type === 'service' && (
          <div>
            <h2 className="font-bold text-xl mb-5">Leveransadress</h2>

            <div className="grid gap-6 mb-7 tablet:grid-cols-2">
              <FormInput
                label="Kontaktperson"
                errorMessage="Ange korrekt namn."
                value={deliveryPersonalInfo['contactName']}
                name="contactName"
                type="text"
                pattern="^[A-ZÜÄÖÅa-züäöå ]{2,40}$"
                required={deliveryMetaInfo.type === 'service' ? true : false}
                onChange={(e) =>
                  setDeliveryPersonalInfo({
                    ...deliveryPersonalInfo,
                    [e.target.id]: e.target.value,
                  })
                }
              />
              <FormInput
                label="Telefonnummer"
                errorMessage="Dubbelkolla att du skrivit rätt mobilnummer."
                value={deliveryPersonalInfo['contactNumber']}
                name="contactNumber"
                type="text"
                pattern="^[0-9+-]{6,20}$"
                required={deliveryMetaInfo.type === 'service' ? true : false}
                onChange={(e) =>
                  setDeliveryPersonalInfo({
                    ...deliveryPersonalInfo,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-6 mb-7 tablet:grid-cols-2">
              <FormInput
                label="Gatuadress/box"
                errorMessage="Dubbelkolla att du skrivit rätt adress."
                value={deliveryPersonalInfo['street']}
                name="street"
                type="text"
                placeholder="Gatuadress / box"
                pattern="^[A-ZÜÄÖÅa-züäöå0-9 ]{3,50}$"
                required={deliveryMetaInfo.type === 'service' ? true : false}
                onChange={(e) =>
                  setDeliveryPersonalInfo({
                    ...deliveryPersonalInfo,
                    [e.target.id]: e.target.value,
                  })
                }
              />
              <FormInput
                label="Adresstillägg"
                value={deliveryPersonalInfo['extraAddress']}
                name="extraAddress"
                type="text"
                placeholder="Adresstillägg (valfritt)"
                pattern="^[A-ZÜÄÖÅa-züäöå0-9 ]{3,50}$"
                onChange={(e) =>
                  setDeliveryPersonalInfo({
                    ...deliveryPersonalInfo,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-6 mb-7 tablet:grid-cols-2">
              <FormInput
                label="Postnummer"
                errorMessage="Skriv postnumret med 5 siffror."
                value={deliveryPersonalInfo['postalCode']}
                name="postalCode"
                type="text"
                placeholder="Postnummer"
                pattern="^[0-9]{5,5}$"
                required={deliveryMetaInfo.type === 'service' ? true : false}
                onChange={(e) =>
                  setDeliveryPersonalInfo({
                    ...deliveryPersonalInfo,
                    [e.target.id]: e.target.value,
                  })
                }
              />
              <FormInput
                label="Stad"
                errorMessage="Dubbelkolla att du skrivit rätt stad."
                value={deliveryPersonalInfo['city']}
                name="city"
                type="text"
                placeholder="Stad"
                pattern="^[A-ZÜÄÖÅa-züäöå ]{2,20}$"
                required={deliveryMetaInfo.type === 'service' ? true : false}
                onChange={(e) =>
                  setDeliveryPersonalInfo({
                    ...deliveryPersonalInfo,
                    [e.target.id]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        {/* --- */}
        {/* END */}

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-[50px] mb-5 transition duration-300 ease-in-out bg-gray-300 hover:bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl"
          >
            Skicka
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryPart;
