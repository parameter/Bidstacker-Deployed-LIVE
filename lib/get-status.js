export const getStatus = (status, negotiations) => {
  // If any status of request.negotiation is "accepted" then the other ones should be set to "rejected"
   
  negotiations.forEach((negotiation) => {
    if (negotiation.status === 'accepted') {
      negotiations.forEach((negotiation) => {
        if (negotiation.status !== 'accepted') {
          negotiation.status = 'rejected';
        }
      });
    }
    if (negotiation.status === 'new') {
      negotiation.status = 'new';
    }
  });
   
  if (status === 'accepted') {
    return (
      <div className="p-2 rounded-full bg-orange shadow">
        <span className="font-bold text-white px-3 pt-0.5 pb-0.5 rounded-sm">
          {'Accepterad'}
        </span>
      </div>
    );
  }
  if (status === 'new') {
    return (
      <div className="p-2 rounded-full bg-orange shadow">
        <span className="font-bold text-white px-3 pt-0.5 pb-0.5 rounded-sm">
          {'Ny!'}
        </span>
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <span className="font-bold text-orange px-3 pt-0.5 pb-0.5 rounded-sm">
        {'Avböjd'}
      </span>
    );
  }
};
