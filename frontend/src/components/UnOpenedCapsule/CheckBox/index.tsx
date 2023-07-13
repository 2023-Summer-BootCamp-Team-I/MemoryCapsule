import React from 'react';

interface CheckboxProps {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChecked: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChecked }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChecked(event.target.checked);
  };

  return (
    <label className="flex items-center p-1 space-x-2 border">
      <input type="checkbox" className="hidden" checked={checked} onChange={handleCheckboxChange} />
      <span
        className={`w-5 h-5 inline-block border-2 rounded ${
          checked ? 'bg-[#FA947A] border-[#FA947A]' : 'border-gray-400'
        }`}
      ></span>

      <span className={`${checked ? 'text-[#FA947A]' : ''}`}>내 스토리만 보기</span>
    </label>
  );
};

export default Checkbox;
