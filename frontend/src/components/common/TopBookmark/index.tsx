type TopProps = {
  title: string;
  color: string;
  activeState: boolean;
  setActiveState: () => void;
};

function TopBookmark({ title, color, activeState, setActiveState }: TopProps) {
  const handleClick = () => {
    setActiveState();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        style={{ backgroundColor: color }}
        className={
          'flex items-center justify-center h-8 text-xl text-white rounded-t-3xl w-40 font-Omu hover:cursor-pointer'
        }
        onClick={handleClick}
      >
        <span>{title}</span>
      </div>
      <div className={`w-40 h-8 bg-transparent border-[#CFD0D0] ${activeState ? 'border' : ''}`} />
    </div>
  );
}

export default TopBookmark;
