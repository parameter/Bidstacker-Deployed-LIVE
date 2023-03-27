import { useEffect, useState, useCallback } from 'react';
import _ from 'underscore';
import axios from 'axios';
import FormInput from '@/components/Form/FormInput';
import FormRadioBox from '@/components/Form/FormRadioBox';
import {
  PlusCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import RequestItem from './Item';
import inventory from 'products-json/inventory';
import RequestSuccess from './RequestSuccess';
import InventoryModal from './InventoryModal';

const NewRequest = ({ restData, amountDeviationValue }) => {
  const [files, setFiles] = useState(null);
  const [requests, setRequests] = useState([]);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [activePart, setActivePart] = useState(true);

  // console.log('requestsFromOffer', restData);

  const getProduct = useCallback((id) => {
    let foundItem = null;
    let current_category = null;
    inventory.categories.forEach((category) => {
      if (category.items) {
        category.items.forEach((item2) => {
          if (item2.id === id) {
            current_category = category.category;
            foundItem = item2;
          }
        });
      } else {
        if (category.id === id) {
          current_category = category.category;
          foundItem = category;
        }
      }
    });
    return { foundItem: foundItem, category: current_category };
  }, []);

  // 👇️ Generate a random string
  const generateRandomString = useCallback(
    (length = 8, charset = 'abcdefghijklmnopqrstuvwxyz0123456789') => {
      const result = [];
      for (let i = 0; i < 8; i++) {
        result.push(charset.charAt(Math.floor(Math.random() * charset.length)));
      }
      return result.join('');
    },
    []
  );

  // Add a new request for each item from offert with corresponding data
  const addRestItems = useCallback(() => {
    let _restItems = restData.items.map((item, i) => {
      const newId = generateRandomString(8);
      let _product = getProduct(item.itemId);

      return {
        id: newId,
        category: _product.category,
        itemId: item.itemId,
        fields: item.fields,
        product: _product.foundItem,
        amountDeviationValue: amountDeviationValue[i],
      };
    });
    setRequests(_restItems);
  }, [restData, generateRandomString, getProduct, amountDeviationValue]);

  useEffect(() => {
    if (restData) {
      console.log('Running useEffect');
      addRestItems();
    }
  }, [restData, addRestItems]);

  const [deliveryMetaInfo, setDeliveryMetaInfo] = useState({
    type: '',
    earliest: '',
    latest: '',
    vehicle: '',
    projectNumber: '',
    marking: '',
    requestDescription: '',
  });
  const [deliveryPersonalInfo, setDeliveryPersonalInfo] = useState({
    contactName: '',
    contactNumber: '',
    street: '',
    extraAddress: '',
    postalCode: '',
    city: '',
  });

  const updateRequestProduct = (itemId) => {
    let _requests = requests;
    _requests.forEach((item, i) => {
      if (_requests[i].id === currentRequestId) {
        let _product = getProduct(itemId);
        _requests[i].itemId = itemId;
        _requests[i].category = _product.category;
        _requests[i].product = _product.foundItem;
      }
    });
    setRequests(_requests);
  };

  const addRequest = (id) => {
    setInventoryOpen(false);
    updateRequestProduct(id);
  };

  const updateValue = (data) => {
    console.log('updateValue', data);
    // Create a new array of requests, with updated fields if necessary
    const updatedRequests = requests.map((item) => {
      if (item.id === data.id) {
        // Create a new array of fields, with updated values if necessary
        const updatedFields = item.fields.map((field) => {
          if (field.name === data.name) {
            // Update the value of the matching field
            return { ...field, value: data.value };
          }
          // Keep the field as is if it doesn't match the name
          return field;
        });
        // Check if the field with the given name already exists
        if (!updatedFields.find((field) => field.name === data.name)) {
          // If it doesn't, add a new field with the given name and value
          updatedFields.push({ name: data.name, value: data.value });
        }
        // Return the updated item with the updated fields
        return { ...item, fields: updatedFields };
      }
      // Keep the item as is if it doesn't match the id
      return item;
    });
    // Update the state with the updated requests
    setRequests(updatedRequests);
  };

  const removeRequestItem = (requestItemId) => {
    var foundIndex = null;
    requests.forEach((item, i) => {
      if (item.id === requestItemId) {
        foundIndex = i;
      }
    });
    if (foundIndex !== null) {
      requests.splice(foundIndex, 1);
      setRequests(requests.slice(0));
    }
  };

  const addRequestItem = () => {
    // 👇️ set a random string as newId
    const newId = generateRandomString(8);

    // 👇️ push object to end of state array
    setRequests((current) => [
      ...current,
      { id: newId, fields: [], images: [] },
    ]);
    // 👇️ set CurrentRequestId
    setCurrentRequestId(newId);
    // 👇️ open Modal ProductSelector component
    setInventoryOpen(true);
  };

  const cleanPayload = (reqs) => {
    return reqs.map((item) => {
      delete item.product;
      return item;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var images = [];
    requests.forEach((item) => {
      if (item.images) {
        item.images.forEach((image) => {
          images.push(image.images);
        });
      }
    });

    /*
    if (!images) {
    } else {
      const formData = new FormData();
      images.forEach((file) => formData.append('media', file));
      axios.post('/api/upload', formData);
    }
    */

    if (requests.length === 0) {
      alert('Lägg till artiklar!');
    } else {
      // var formData = new FormData();

      var formData = {
        request_metadata: {
          projectNumber: deliveryMetaInfo.projectNumber,
          marking: deliveryMetaInfo.marking,
          requestDescription: deliveryMetaInfo.requestDescription,
        },
        delivery: {
          deliveryType: deliveryMetaInfo.type,
          deliveryEarliest: deliveryMetaInfo.earliest,
          deliveryLatest: deliveryMetaInfo.latest,
          vehicleType: deliveryMetaInfo.vehicle,
        },
        deliveryPersonalInfo: deliveryPersonalInfo,
        requests: cleanPayload(requests),
      };
    }

    axios
      .post('/api/request/new', formData)
      .then(() => {
        setRequests([]);
        setActivePart(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {activePart ? (
        <div className="max-w-[800px] bg-white rounded-xl mt-20 pt-10 mr-auto ml-auto">
          {inventoryOpen && (
            <InventoryModal
              addRequest={addRequest}
              inventory={inventory}
              inventoryOpen={inventoryOpen}
            />
          )}
          <div className="px-10">
            <div className="flex justify-between">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                Skapa en förfrågan
              </h2>
              <div className="relative flex flex-col items-center group">
                <InformationCircleIcon className="w-8 tablet:w-12" />
                <div className="absolute -top-[50px] right-0 flex-col items-center hidden group-hover:flex">
                  <span className="relative w-[300px] z-10 p-4 text-xs text-white bg-black shadow-lg rounded">
                    - Lägg till artiklar för att skapa din förfrågan.
                  </span>
                  <div className="hidden desktop:block w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-xl font-small mb-8">
              Lägg till artiklar till din förfrågan *
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* If there are any requests display them down below */}
            {requests.length > 0 &&
              requests.map((item, i) => (
                <div key={'request_item_' + i} className="px-10">
                  <RequestItem
                    requests={requests}
                    setRequests={setRequests}
                    files={files}
                    setFiles={setFiles}
                    index={i}
                    item={item}
                    id={item.id}
                    updateValue={updateValue}
                    addRequestItem={addRequestItem}
                    removeRequestItem={removeRequestItem}
                    generateRandomString={generateRandomString}
                  />
                </div>
              ))}
            <div className="px-10">
              <div
                onClick={addRequestItem}
                className="h-[100px] w-full text-gray-500 border-dashed border-2 border-gray-300 hover:border-green-300 hover:text-green-500 flex justify-center items-center gap-1 mb-10"
              >
                <PlusCircleIcon className="w-[50px]" />
                <p className="text-xl">Lägg till Artikel *</p>
              </div>

              <div className="border-b mb-10" />
              <p className="text-gray-600 text-xl font-small mb-6">
                Mellan vilka datum önskas dina artiklar? *
              </p>
              <div className="flex gap-5 mb-10">
                <div className="flex items-center">
                  <FormInput
                    label="Tidigast *"
                    errorMessage="Välj ett korrekt datum"
                    onChange={(event) => {
                      setDeliveryMetaInfo({
                        ...deliveryMetaInfo,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    name="earliest"
                    type="date"
                    pattern="^[0-9-]{3,16}$"
                    min={new Date().toISOString().split('T')[0]}
                    required={true}
                  />
                </div>
                <div className="flex items-center">
                  <FormInput
                    label="Senast *"
                    errorMessage="Välj ett korrekt datum"
                    value={deliveryMetaInfo.latest}
                    onChange={(event) =>
                      setDeliveryMetaInfo({
                        ...deliveryMetaInfo,
                        [event.target.name]: event.target.value,
                      })
                    }
                    name="latest"
                    type="date"
                    pattern="^[0-9-]{3,16}$"
                    min={
                      deliveryMetaInfo.earliest ||
                      new Date().toISOString().split('T')[0]
                    }
                    required={true}
                  />
                </div>
              </div>
              <div className="border-b mb-10" />

              <p className="text-gray-600 text-xl font-small mb-6">
                Vill du få dina artiklar levererade? *
              </p>

              <div className="grid gap-6 tablet:grid-cols-2 mb-10">
                <div className="flex-grow rounded-lg border border-gray-300 flex items-center pl-4 h-[60px]">
                  <FormRadioBox
                    id="service"
                    name="type"
                    onChange={(event) =>
                      setDeliveryMetaInfo({
                        ...deliveryMetaInfo,
                        [event.target.name]: event.target.value,
                      })
                    }
                    value="service"
                    className="w-4 h-4 bg-gray-100 accent-gray-500 border-gray-300"
                    label="Ja"
                    required={true}
                  />
                </div>
                <div className="flex-grow rounded-lg border border-gray-300 flex items-center pl-4 h-[60px]">
                  <FormRadioBox
                    id="self"
                    onChange={(event) =>
                      setDeliveryMetaInfo({
                        ...deliveryMetaInfo,
                        [event.target.name]: event.target.value,
                      })
                    }
                    value="self"
                    name="type"
                    label="Nej"
                  />
                </div>
              </div>

              {deliveryMetaInfo.type && deliveryMetaInfo.type === 'service' && (
                <>
                  <div className="border-b mb-10" />
                  <p className="text-gray-600 text-lg mb-6">
                    Behövs det levereras med kranbil? *
                  </p>
                  <div className="grid gap-6 tablet:grid-cols-2 mb-10">
                    <div className="rounded-lg border border-gray-300 flex items-center pl-4 h-[60px]">
                      <FormRadioBox
                        id="kran"
                        onChange={(event) =>
                          setDeliveryMetaInfo({
                            ...deliveryMetaInfo,
                            [event.target.name]: event.target.value,
                          })
                        }
                        value="kran"
                        name="vehicle"
                        label="Ja"
                      />
                    </div>
                    <div className="rounded-lg border border-gray-300 flex items-center pl-4 h-[60px]">
                      <FormRadioBox
                        id="lastbil"
                        onChange={(event) =>
                          setDeliveryMetaInfo({
                            ...deliveryMetaInfo,
                            [event.target.name]: event.target.value,
                          })
                        }
                        value="lastbil"
                        name="vehicle"
                        label="Nej"
                        required={
                          deliveryMetaInfo.type === 'service' ? true : false
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="border-b border-gray-400 mb-10" />
            <div className="px-10">
              <div className="flex justify-between">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                  Övrig information
                </h2>
                <div className="relative flex flex-col items-center group">
                  <InformationCircleIcon className="w-8 tablet:w-12" />
                  <div className="absolute -top-[75px] right-0 flex-col items-center hidden mb-6 group-hover:flex">
                    <div className="relative w-[330px] z-10 p-4 text-xs text-white bg-black shadow-lg rounded">
                      <p className="mb-2">
                        - Glöm inte eventuellt projektnummer och märkning.{' '}
                      </p>
                      <p> - Beskriv gärna din förfrågan ytterligare.</p>
                    </div>
                    <div className="hidden desktop:block w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 mb-7 tablet:grid-cols-2">
                <FormInput
                  label="Projektnummer"
                  onChange={(event) =>
                    setDeliveryMetaInfo({
                      ...deliveryMetaInfo,
                      [event.target.name]: event.target.value,
                    })
                  }
                  name="projectNumber"
                  type="text"
                />
                <FormInput
                  label="Märkning"
                  onChange={(event) =>
                    setDeliveryMetaInfo({
                      ...deliveryMetaInfo,
                      [event.target.name]: event.target.value,
                    })
                  }
                  name="marking"
                  type="text"
                />
              </div>
              <div className="border-b mb-10" />

              <p className="text-gray-600 text-xl font-small mb-8">
                Beskrivning / Fritext
              </p>
              <textarea
                name="requestDescription"
                className="rounded-lg border border-gray-300 w-full p-4 focus:outline-none focus:ring-0 focus:border-[#F9B300]"
                placeholder="Tips: Frivillig information till återförsäljarna."
                rows="5"
                onChange={(event) =>
                  setDeliveryMetaInfo({
                    ...deliveryMetaInfo,
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="border-b border-gray-400 my-10" />
            <div className="px-10">
              <div className="flex justify-between">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8">
                  {deliveryMetaInfo.type && deliveryMetaInfo.type === 'service'
                    ? 'Leveransuppgifter'
                    : 'Kontaktuppgifter'}
                </h2>
                {/* <div className="relative flex flex-col items-center group">
      <InformationCircleIcon className="w-8 tablet:w-12" />
      <div className="absolute -top-[70px] right-0 flex-col items-center hidden mb-6 group-hover:flex">
        <div className="relative w-[320px] z-10 p-4 text-xs text-white bg-black shadow-lg rounded">
          <p className="mb-1">
            Glöm inte eventuellt projektnummer & märkning.{' '}
          </p>
          <p>Beskriv gärna din förfrågan ytterligare</p>
        </div>
        <div className="hidden desktop:block w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
    </div> */}
              </div>
              <div className="grid gap-6 mb-7 tablet:grid-cols-2">
                <FormInput
                  label="Kontaktperson *"
                  errorMessage="Ange korrekt namn."
                  defaultValue={
                    restData
                      ? restData.delivery[0].contactName
                      : deliveryPersonalInfo['contactName']
                  }
                  name="contactName"
                  type="text"
                  pattern="^[A-ZÜÄÖÅa-züäöå ]{2,40}$"
                  required={true}
                  onChange={(e) =>
                    setDeliveryPersonalInfo({
                      ...deliveryPersonalInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Telefonnummer *"
                  errorMessage="Dubbelkolla att du skrivit rätt mobilnummer."
                  defaultValue={
                    restData
                      ? restData.delivery[0].contactNumber
                      : deliveryPersonalInfo['contactNumber']
                  }
                  name="contactNumber"
                  type="text"
                  pattern="^[0-9+-]{6,20}$"
                  required={true}
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
                  label="Gatuadress / Box *"
                  errorMessage="Dubbelkolla att du skrivit rätt adress."
                  defaultValue={
                    restData
                      ? restData.delivery[0].street
                      : deliveryPersonalInfo['street']
                  }
                  name="street"
                  type="text"
                  placeholder="Gatuadress / box"
                  pattern="^[A-ZÜÄÖÅa-züäöå0-9 ]{3,50}$"
                  required={true}
                  onChange={(e) =>
                    setDeliveryPersonalInfo({
                      ...deliveryPersonalInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Adresstillägg"
                  defaultValue={
                    restData
                      ? restData.delivery[0].extraAddress
                      : deliveryPersonalInfo['extraAddress']
                  }
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
                  label="Postnummer *"
                  errorMessage="Skriv postnumret med 5 siffror."
                  defaultValue={
                    restData
                      ? restData.delivery[0].postalCode
                      : deliveryPersonalInfo['postalCode']
                  }
                  name="postalCode"
                  type="text"
                  placeholder="Postnummer"
                  pattern="^[0-9]{5,5}$"
                  required={true}
                  onChange={(e) =>
                    setDeliveryPersonalInfo({
                      ...deliveryPersonalInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
                <FormInput
                  label="Stad *"
                  errorMessage="Dubbelkolla att du skrivit rätt stad."
                  defaultValue={
                    restData
                      ? restData.delivery[0].city
                      : deliveryPersonalInfo['city']
                  }
                  name="city"
                  type="text"
                  placeholder="Stad"
                  pattern="^[A-ZÜÄÖÅa-züäöå ]{2,20}$"
                  required={true}
                  onChange={(e) =>
                    setDeliveryPersonalInfo({
                      ...deliveryPersonalInfo,
                      [e.target.id]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-[60px] bg-orange rounded-b-lg mt-10 text-white text-lg font-bold uppercase"
            >
              Skicka förfrågan
            </button>
          </form>
        </div>
      ) : (
        <RequestSuccess />
      )}
    </>
  );
};

export default NewRequest;
