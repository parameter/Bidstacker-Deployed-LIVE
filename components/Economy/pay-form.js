import { React, useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '@/components/Form/FormInput';

const FormOfPay = ({_case}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('USD');
    const [description, setDescription] = useState('Payment for your service');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
    
        try {
            const { data } = await axios.post('/api/pay', {
                amount,
                currency,
                description,
            });
            /*
            const stripe = Stripe(data.stripe_pk);
            const { error } = await stripe.redirectToCheckout({
                sessionId: data.session_id,
            });
            */
            if (error) {
                setError(error.message);
            }
        } catch (error) {
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const calcAmount = (items) => {
        return Object.values(items).reduce((t, {offeredPrice}) => parseInt(t) + parseInt(offeredPrice), 0)
    }

    return <form onSubmit={handleSubmit}>
            <div className="form-group">

                <p>Amount: {calcAmount(_case.items)}</p>

                <FormInput 
                    placeholder="Valid Card Number"
                    label="Kortnummer"
                    errorMessage="Fyll i ett korrekt Kortnummer"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    name="cardNumber"
                    type="tel"
                    required={true}
                    autocomplete="cc-number"
                />

                <FormInput 
                    id="amount"
                    placeholder="Amount"
                    label="Currency"
                    errorMessage="Välj ett korrekt datum"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    name="latest"
                    type="number"
                    required={true}
                />
            
            </div>

            <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <input
                    type="text"
                    className="form-control"
                    id="currency"
                    placeholder="Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            
            <button type="button" class="mt-[70px] transition duration-300 ease-in-out bg-orange text-black font-bold uppercase py-3 px-10 rounded-xl hover:rounded-full">
                {loading ? 'Loading...' : 'Pay'}
            </button>

            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </form>
};

export default FormOfPay;