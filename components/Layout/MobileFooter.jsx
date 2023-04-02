import LinkIcon from 'public/assets/svg/LinkIcon';

const MobileFooter = () => {

  return (
    <div className="w-full bg-white shadow dark:bg-gray-light-dark text-gray-light-dark dark:text-gray-100 fixed bottom-0 right-0 py-2 px-10 z-30 fixed--help-right flex justify-between">
      <div className="flex flex-col">
        <LinkIcon className="h-6" />
        <p className="font-bold text-sm">Anslut</p>
      </div>
      <div className="flex flex-col ">
        
      </div>
    </div>
  );
};

export default MobileFooter;
