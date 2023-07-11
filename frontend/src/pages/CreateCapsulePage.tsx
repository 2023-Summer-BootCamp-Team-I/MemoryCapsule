import React from 'react';
import CreateCapsuleNote from '../components/CreateCapsuleNote';

export default function CreateCapsulePage() {
  return (
    <div className="flex items-center justify-center h-[42rem] w-[75rem] border">
      <div className="flex items-center justify-center">
        <div className="h-[25rem] w-[35rem] mt-8 border"></div>
        <div>
          <CreateCapsuleNote />
        </div>
      </div>
    </div>
  );
}
