import { useAppContext } from 'context/app-context';

const Notices = () => {
  const { notices, removeNote } = useAppContext();

  return (
    <div className="absolute left-[50%]">
        <ul className="flex flex-col">
        {notices.map((note, index) => {
            return <li key={index} className="flex flex-row"><div className="m-[11px] cursor-pointer leading-1" onClick={() => removeNote(index)}>X</div><p className="m-[11px] leading-1">{note}</p></li>
        })}
        </ul>
    </div>
  );
};

export default Notices;