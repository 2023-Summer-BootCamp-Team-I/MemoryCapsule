type TopProps = {
  title: string;
  color: string;
  activeState: boolean;
  // eslint-disable-next-line no-unused-vars
  setActiveState: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  setInactiveState: (value: boolean) => void;
};

function TopBookmark({ title, color, activeState, setActiveState, setInactiveState }: TopProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`flex items-center justify-center h-8 text-xl text-white bg-[${color}] rounded-t-3xl w-40 font-Omu hover:cursor-pointer`}
        onClick={() => {
          setActiveState(true);
          setInactiveState(false);
        }}
      >
        <span>{title}</span>
      </div>
      <div className={`w-40 h-8 bg-transparent  border-[#CFD0D0] ${activeState ? 'border' : ''}`} />
    </div>
  );
}

export default TopBookmark;
