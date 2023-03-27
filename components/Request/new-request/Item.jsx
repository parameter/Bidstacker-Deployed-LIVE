'use client';

import FormInput from '@/components/Form/FormInput';
import FileUpload from '@/components/Form/FormInputFiles/FileUpload';

const RequestItem = (props) => {
  const getCurrentValue = (fieldName) => {
    let value = null;
    props.item.fields.forEach((field) => {
      if (field.name === fieldName) {
        value = field.value;
      }
    });
    return value;
  };

  const getAmountDeviationValue = (fieldName) => {
    let value = props.item.amountDeviationValue;
    props.item.fields.forEach((field) => {
      if (field.name === fieldName) {
        field.value = value;
      }
    });
    return value;
  };

  const updateValue = (event) => {
    props.updateValue({
      id: props.id,
      name: event.target.name,
      value: event.target.value,
    });
  };

  console.log('props.item', props.item);

  return (
    <>
      {props.item.itemId ? (
        <>
          <div className="border-b pb-10" />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-red-600"
              onClick={() => props.removeRequestItem(props.id)}
            >
              Ta bort artikel
            </button>
          </div>

          <div className="flex flex-row justify-center items-start gap-3 flex-wrap mt-4 mb-4">
            <div className="w-full">
              <select
                name="itemIndex"
                defaultValue={getCurrentValue('itemIndex')}
                onChange={(event) => {
                  updateValue(event);
                }}
                className="w-full h-[60px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-[#F9B300] block px-4"
                required
              >
                <option value="">Välj {props.item.product.name} *</option>
                {props.item.product.products.map((option, i) => {
                  return (
                    <option key={i} value={i}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
            {props?.item?.product?.unit === 'nr' && (
              <div className="w-full tablet:w-auto">
                <FormInput
                  label="Antal *"
                  defaultValue={
                    props.item.amountDeviationValue
                      ? getAmountDeviationValue('quantity')
                      : getCurrentValue('quantity')
                  }
                  onChange={(event) => {
                    updateValue(event);
                  }}
                  name="quantity"
                  type="number"
                  pattern="^[0-9]{1,1000000000000000}$"
                  required={true}
                />
              </div>
            )}
            <div className="w-full tablet:w-auto">
              <FormInput
                label="Budget"
                errorMessage="Välj antal"
                defaultValue={getCurrentValue('budget')}
                onChange={(event) => {
                  updateValue(event);
                }}
                name="budget"
                type="text"
              />
            </div>
            <div className="w-full tablet:w-auto">
              <FormInput
                label="Fritext"
                defaultValue={getCurrentValue('itemDescription')}
                onChange={(event) => {
                  updateValue(event);
                }}
                name="itemDescription"
                type="text"
              />
            </div>
            <div className="w-full tablet:w-auto">
              <FileUpload
                id={props.id}
                setRequests={props.setRequests}
                requests={props?.requests}
                files={props?.files}
                setFiles={props?.setFiles}
                generateRandomString={props.generateRandomString}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RequestItem;
