import { React, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { SignUp } from '@/page-components/Auth';
import { useCurrentUser } from '@/lib/user';
import _ from 'underscore';
import SupplierRequestComponent from './supplierRequestComponent';

export default function SupplierComponent() {
  const [categories, setCategories] = useState([]);
  const [requests, setRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [myNegotiations, setMyNegotiations] = useState([]);
  const [position, setPosition] = useState(null);
  const [activePageTab, setActivePageTab] = useState(0);
  const catsForm = useRef();
  const { data: { user } = {} } = useCurrentUser();

  useEffect(() => {
    if (!user) { return; }
    getMyOffers();
  },[user])

  useEffect(() => {
    getLocation();
  },[]);

  const getLocation = () => {
    
    if (!process.browser) { return }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({lat: pos.coords.latitude, lon: pos.coords.longitude});
      });
    }
  }

  const getMyOffers = async () => {
    var _negotiations = await axios.get('/api/supplior/myRequests');
    
    setMyRequests(_.groupBy(_negotiations.data.requests, 'groupId'));
    setMyNegotiations(_negotiations.data.negotiations);
  }

  const getRequests = async () => {
    const formData = {
      // _csrf: await NextAuth.csrfToken(),
      categories: categories
    }
    
    const res = await axios.get('/api/supplior/requests', {params: formData});

    setRequests( _.groupBy(res.data.requests, 'groupId') );
  }

  const getCategories = () => {
    var checked = catsForm.current.querySelectorAll('input:checked');
    var cats = [];
    checked.forEach((item) => {
      cats.push(item.value);
    });
    setCategories(cats);
  }

  /*
  const setRequestOffered = (requestId) => {
    var _my_requests = myRequests;
    _my_requests.forEach((item, i) => {
      if (item.id == requestId) {
        _my_requests[i].offered = true;
      }
    });
    setMyRequests(_my_requests.slice(0));
  }
  */
   
  const getRequestNegotiation = (groupId) => {
    var _negotiation = null;
    myNegotiations.forEach((item) => {
       if (item.groupId === groupId) {
        _negotiation = item;
       }
    });
    return _negotiation;
  }
 
  const printRequests = () => {
     
    return <>
      {Object.keys(requests).map((key) => {
         var negotiation = getRequestNegotiation(key);
         return <SupplierRequestComponent key={key} getMyOffers={getMyOffers} position={position} groupId={key} negotiation={negotiation} request={requests[key]} />
      })}
    </>
  }

  const sendsignAsSupplied = async (groupId) => {

    const formData = {
      groupId: groupId
    }
     
    axios.post('/api/supplior/signAsSupplied', formData).then(() => {
      getMyOffers();
    }).catch((error) => {
       console.log(error);
    });

  }
 
  const printNegotiations = () => {

    return <>
      {Object.keys(myRequests).map((key) => {

        var sum = 0;

        var deliveryStatusHtml = '';
        if (!myRequests[key][0].delivery.signedBySupplior) {
          deliveryStatusHtml = <button onClick={() => sendsignAsSupplied(key)} type="button">Signera utlämnad till kunden</button>;
        }
        if (myRequests[key][0].delivery.signedBySupplior) {
          deliveryStatusHtml = <div className="supplier__request-signed">You signed it</div>;
        }

        return <div key={key} className="supplier__request-group">
          {myRequests[key].map((item) => {

            sum = parseInt(sum) + parseInt(item.budget);
          
            return <div key={item.id} className="delivery__request-item">
                    <div className="delivery__request-item-row-one">
                      <p>{item.product.name}</p>
                    </div>
                    <div className="sdelivery__request-item-row-two">
                      {item.fields.map((item3, ii) => {
                        if (item3.name !== 'budget') {
                          return <p key={ii}>{item3.name}: <span>{item3.value}</span></p>
                        }
                      })}
                    </div>
                  </div>
          })}
          <p>Mitt erbjudande:<span>{sum}</span></p>
          {deliveryStatusHtml}
        </div>

      })}
    </>
  }
 
  const switchTab = (index) => {
    setActivePageTab(index);
  }

  const printPageTabs = () => {
    const tabs = [
      'Mina offerteringar',
      'Hitta förfrågningar'
    ];
    return tabs.map((item, i) => {
      if (i === activePageTab) {
        return <div key={i} className="bidstacker__page-nav-item _active_">
          <h3 onClick={() => switchTab(i)} className="bidstacker__page-nav-item-title">{item}</h3>
        </div>
      } else {
        return <div key={i} className="bidstacker__page-nav-item">
          <h3 onClick={() => switchTab(i)} className="bidstacker__page-nav-item-title">{item}</h3>
        </div>
      }
    });
  }

  return (<>
    {!user && 
      <SignUp role="supplior" />
    }
    {user && 
    <>
      <div className="bidstacker__page-nav">
        {printPageTabs()}
      </div>
      {activePageTab === 0 && 
        <div className="supplier__my-offers">
          <ul className="supplier__my-offers">
            {printNegotiations()}
          </ul>
        </div>
      }
      {activePageTab === 1 && 
        <div className="supplier__requests">

          <form onChange={() => getCategories()} ref={catsForm} className="supplier__categories">
            <label>
              <input name="category" value="cat0000" type="checkbox" />
              <span>Byggnadsvaror</span>
            </label>
            <label>
              <input name="category" value="cat0001" type="checkbox" />
              <span>Kontorsvaror</span>
            </label>
            <button className="supplier__get-requests-button" onClick={() => getRequests()} type="button">Find requests</button>
          </form>

          <div className="supplier__requests-panel">
            {printRequests()}
          </div>
        </div>
      }
      </>
    }
    </>
  )
}
