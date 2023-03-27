import { React, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SupplierRequestComponent(props) {
    const [promisedDeliveryDate, setPromisedDeliveryDate] = useState(null);
    const [negotiatedFields, setNegotiatedFields] = useState([]);

    var sum = 0;

    var itemClassName = 'supplier__request-group supplier__requests-request';
    var iNegotiatedThis = false;
    if (props.negotiation) {
        itemClassName = 'supplier__request-group supplier__requests-request _offered_';
        iNegotiatedThis = true;
    }

    var deliveryEarliest;
    var deliveryLatest;

    const offertera = (event) => {
        event.preventDefault();

        var offerAmount = event.target.parentNode.offer.value;
    
        if (!offerAmount) {
            event.target.parentNode.offer.classList.add('_not_validated_');
            return;
        }
        
        axios.post('/api/offertera', {
            groupId: props.groupId,
            offer: offerAmount,
            negotiatedFields: negotiatedFields,
            position: props.position,
            promisedDeliveryDate: promisedDeliveryDate
        }).then(() => {
            // setRequestOffered(groupId);
            props.getMyOffers();
        }).catch((error) => {
            console.log(error);
        });
    }

    const changeField = (event) => {
        var id = event.target.getAttribute('data-request_item_id');
        var name = event.target.name;
        var fields = negotiatedFields;
        var found = false;
        fields.map((item) => {
            if (item.id === id) {
                item.value = event.target.value;
                found = true;
            }
        });
        if (found == false) {
            fields.push({
                id: id,
                name: name,
                value: event.target.value
            });
        }
        setNegotiatedFields(fields);
    }

    if (!props.request) {
      return;
    }

    return <div className={itemClassName}>
          {props.request.map((item, index) => {

            sum = parseInt(sum) + parseInt(item.budget);
            var budget = null;

            if (index === 0) {
              deliveryEarliest = item.delivery.deliveryEarliest;
              deliveryLatest = item.delivery.deliveryLatest;
            }
            
            return <div key={item.id} className="supplier__request-item">
                {index === 0 &&
                  <Link href={'/buyer/' + item.requestor}>
                    Customer profile
                  </Link>
                }
                <div className="supplier__request-item-column-one">
                  <div className="supplier__request-item-id"><p>{item?.product?.name}</p></div>
                </div>
                <div className="supplier__request-item-column-two">
                  <form onChange={(event) => changeField(event)}>
                    {item.fields.map((item3, ii) => {
                        if (item3.name === 'budget')  {
                            budget = item3.value;
                        } else if (item3.name === 'amount') {
                            return <p key={ii}>{item3.name}:<span>{item3.value}<input data-request_item_id={item.id} type="text" defaultValue={item3.value} name={item3.name} /></span></p>
                        } else {
                            return <p key={ii}>{item3.name}:<span>{item3.value}</span></p>
                        }
                    })}
                  </form>
                </div>
                <p className="supplier__request-item-budget">BUDGET: {budget}</p>
              </div>
          })}
          {iNegotiatedThis === false && 
            <form className="bottom">
              <label>Kundens budget:
                 <input name="offer" type="text" placeholder="" defaultValue={sum} />
              </label>
              <div>
                <h3>Leverans:</h3>
                <p>Kunden vill ha leverans mellan</p>
                <p>{deliveryEarliest} - {deliveryLatest}</p>
              </div>
              <label>Jag kan leverera 
                <input onChange={(event) => setPromisedDeliveryDate(event.target.value)} type="date" name="promiseddeliverydate" min={deliveryEarliest} max={deliveryLatest} />
              </label>
              <button onClick={(event) => offertera(event)} type="button">Offertera</button>
            </form>
          }
        </div>
}