import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { useState } from 'react';

type StepProps = {
  index: number; // index prop을 추가
  label: string;
  isActive: boolean;
  isCompleted: boolean;
};

function Step({ index, label, isActive, isCompleted }: StepProps) {
  return (
    <div className="flex items-center space-x-4">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
          isActive ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-300'
        } ${isCompleted ? 'bg-blue-500 text-white' : ''}`}
      >
        {isCompleted ? '✓' : index + 1}
      </div>
      <div className={`text-sm ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>{label}</div>
    </div>
  );
}

type StepperProps = {
  capsule_id: string | undefined;
  onCreateClose: () => void;
};

function Stepper({ capsule_id, onCreateClose }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['스토리 선택하기', '비디오로 생성 중', '비디오 생성 완료'];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div>
      <div className="flex justify-center space-x-12">
        {steps.map((step, index) => (
          <Step
            key={index}
            index={index}
            label={step}
            isActive={index === currentStep}
            isCompleted={index < currentStep}
          />
        ))}
      </div>

      {currentStep === 0 && <StepOne capsule_id={capsule_id} setCurrentStep={setCurrentStep} />}
      {currentStep === 1 && <StepTwo />}
      {currentStep === 2 && <StepThree />}

      <div className="absolute space-x-4 bottom-4 right-4">
        {isLastStep ? (
          <button
            className="px-4 py-1 text-white bg-blue-500 rounded"
            onClick={() => {
              onCreateClose();
              setCurrentStep(0);
            }}
          >
            Close
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Stepper;
