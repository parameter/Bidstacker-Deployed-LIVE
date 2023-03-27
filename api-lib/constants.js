export const ValidateProps = {
  user: {
    companyname: { type: 'string', minLength: 3, maxLength: 50 },
    contactperson: { type: 'string', minLength: 3, maxLength: 50 },
    telephonenumber: { type: 'string', minLength: 3, maxLength: 50 },
    deliveryaddress: { type: 'string', minLength: 3, maxLength: 50 },
    postcode: { type: 'string', minLength: 3, maxLength: 50 },
    town: { type: 'string', minLength: 3, maxLength: 50 },
    billingaddress: { type: 'string', minLength: 3, maxLength: 50 },
    billingpostcode: { type: 'string', minLength: 3, maxLength: 50 },
    billingtown: { type: 'string', minLength: 3, maxLength: 50 },
    organisationnumber: { type: 'string', minLength: 3, maxLength: 50 },
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
    role: { type: 'string', minLength: 0, maxLength: 30 },
    subaccount: { type: 'string', minLength: 0, maxLength: 6 }
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
};
