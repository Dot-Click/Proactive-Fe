import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface TripWizardProgressProps {
  step: number;
  totalStep: number;
  steps: string[];
  validatedSections: Set<number>;
  onStepClick: (targetStep: number) => void;
  isEditMode?: boolean;
}

const TripWizardProgress = ({
  step,
  totalStep,
  steps,
  validatedSections,
  onStepClick,
  // isEditMode = false,
}: TripWizardProgressProps) => {
  return (
    <div className="bg-white">
      <div className="px-8 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#221E33]">
              Step {step} of {totalStep}
            </span>
            <span className="text-xs text-[#0DAC87] font-semibold">
              {validatedSections.size} of {totalStep} sections validated
            </span>
          </div>
          <Progress value={(step / totalStep) * 100} className="h-1.5" />

          {/* Clickable Section Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-8">
            {steps.map((label, index) => {
              const sectionNum = index + 1;
              const isCurrentStep = step === sectionNum;
              const isValidated = validatedSections.has(sectionNum);
              // In Edit mode, allow jumping anywhere. In Add mode, follow user's request:
              // "allow also go front if something missing then no green color and thats all"
              // const canNavigate = true; // Always true based on user request

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onStepClick(sectionNum)}
                  className={`relative flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                    isCurrentStep
                      ? "bg-[#0DAC87]/10 border border-[#0DAC87]"
                      : isValidated
                      ? "bg-[#35FF62]/5 border border-[#0DAC87]/30 cursor-pointer hover:bg-[#35FF62]/10"
                      : "bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 w-full justify-center">
                    {isValidated && (
                      <CheckCircle className="w-4 h-4 text-[#0DAC87] flex-shrink-0" />
                    )}
                    <span
                      className={`text-[11px] font-semibold text-center transition-colors ${
                        isCurrentStep
                          ? "text-[#0DAC87]"
                          : isValidated
                          ? "text-[#0DAC87]"
                          : "text-[#999]"
                      }`}
                    >
                      {label}
                    </span>
                  </div>

                  {isCurrentStep && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0DAC87] rounded-b-lg transition-all duration-300" />
                  )}
                  {isValidated && !isCurrentStep && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0DAC87]/40 rounded-b-lg" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripWizardProgress;
