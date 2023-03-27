export const getOfferStatus = (status, index, requestIsAccepted) => {
  if (status === 'accepted' && index === 0) {
    return 'accepted';
  }

  if (requestIsAccepted === 'accepted' && index !== 0) {
    return 'rejected';
  }

  if (requestIsAccepted === 'new') {
    return 'new';
  }
};
