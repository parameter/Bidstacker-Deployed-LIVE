'use client';

import { useState } from 'react';
import _ from 'underscore';
import InventoryModal from './InventoryModal';
import RequestItem from './Item';
import inventory from 'products-json/inventory';
import { PlusIcon } from '@heroicons/react/24/solid';

const ItemsPart = ({ requests, setRequests, setActivePart }) => {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);

  const updateValue = (data) => {
    let _requests = requests;
    _requests.forEach((item, i) => {
      if (item.id === data.id) {
        let found = false;
        _requests[i].fields.forEach((item2, ii) => {
          if (_requests[i].fields[ii].name == data.name) {
            found = true;
            _requests[i].fields[ii].value = data.value;
          }
        });
        if (found === false) {
          _requests[i].fields.push({ name: data.name, value: data.value });
        }
      }
    });
    setRequests(_requests);
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

  // 👇️ Generate a random string
  const generateRandomString = (
    length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyz0123456789'
  ) => {
    const result = [];
    for (let i = 0; i < 8; i++) {
      result.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    return result.join('');
  };

  /* 
  const openInventory = (requestItemId) => {
    setCurrentRequestId(requestItemId);
    setInventoryOpen(!inventoryOpen);
  };
  */ 

  const openInventory = () => {
    // 👇️ set a random string as newId
    const newId = generateRandomString(8);
    // 👇️ push object to end of state array
    setRequests((current) => [...current, { id: newId, fields: [] }]);
    // 👇️ set CurrentRequestId
    setCurrentRequestId(newId);
    // 👇️ open Modal ProductSelector component
    setInventoryOpen(true);
  };

  const getProduct = (id) => {
    var foundItem = null;
    var current_category = null;
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
  };

  const updateRequestProduct = (id) => {
    let _requests = requests;
    _requests.forEach((item, i) => {
      if (_requests[i].id === currentRequestId) {
        let _product = getProduct(id);
        _requests[i].itemIndex = id;
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

  const handleSubmitForProduct = (e) => {
    e.preventDefault();
    setActivePart(1);
  }

  return (
    <>
      {/* If inventoryOpen is true open modal */}
      {inventoryOpen && (
        <InventoryModal
          shown={inventoryOpen}
          addRequest={addRequest}
          inventory={inventory}
        />
      )}

      <div className="container">
        <h1 className="text-2xl mb-10">Skapa förfrågan</h1>

        <form onSubmit={handleSubmitForProduct}>
          {/* If there are any requests display them down below */}
          {requests.length > 0 && 
            requests.map((item, i) => (
              <RequestItem
                index={i}
                key={'request_item_' + i}
                item={item}
                id={item.id}
                updateValue={updateValue}
                openInventory={openInventory}
                removeRequestItem={removeRequestItem}
              />
            ))
          }

          <div className="flex flex-col justify-center items-center">
            <a
              onClick={openInventory}
              className="flex items-center uppercase text-gray-500 font-bold text-lg mt-10 cursor-pointer"
            >
              <PlusIcon className="w-[25px] text-gray-500" />
              nytt fält
            </a>
          </div>

          {requests.length > 0 && (
            <div className="flex flex-col justify-center items-center">
              <button
                type="submit"
                className="mt-[70px] transition duration-300 ease-in-out bg-gray-300 hover:bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl"
              >
                Nästa
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ItemsPart;
