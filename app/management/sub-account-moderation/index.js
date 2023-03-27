import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useCurrentUser } from '@/lib/user';
import _ from 'underscore';

export default function SubAccountsComponent() {
    const { data: { user } = {} } = useCurrentUser();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!user) { return; }
        getRequestsInNeedOfModeration();
    },[user])

    const getRequestsInNeedOfModeration = async () => {
        var _requests = await axios.get('/api/requestor/requests-for-moderation');
        setRequests(_.groupBy(_requests.data.requests, 'groupId'));
    }

    const printRequests = () => {

        return <>
            {Object.keys(requests).map((key) => {

                var sum = 0;

                return <div key={key} className="supplier__request-group">
                    {requests[key].map((item) => {

                    sum = parseInt(sum) + parseInt(item.budget);
                    
                    return <div key={item.id} className="delivery__request-item">
                            <div className="delivery__request-item-row-one">
                            <p>{item.product.name}</p>
                            </div>
                            <div className="sdelivery__request-item-row-two">
                            {item.fields.map((item3, ii) => {
                                if (item3.name !== 'budget')  {
                                return <p key={ii}>{item3.name}: <span>{item3.value}</span></p>
                                }
                            })}
                            </div>
                        </div>
                })}
                <p>Mitt erbjudande:<span>{sum}</span></p>
                </div>

            })}
        </>
    }

    return <>
        <h3>Moderera dina underkonton</h3>
        <div className="requests__my-requests">
            {printRequests()}
        </div>
    </>
}
