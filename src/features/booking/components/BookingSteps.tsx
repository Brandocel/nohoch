"use client";

interface BookingStepsProps {
  locale: "es" | "en";
  currentStep?: 1 | 2 | 3 | 4;
  onStepClick?: (step: 1 | 2 | 3 | 4) => void;
}

function getLabels(locale: "es" | "en") {
  return locale === "es"
    ? ["Reserva", "Contacto", "Pago", "Confirmación"]
    : ["Booking", "Contact", "Payment", "Confirmation"];
}

export default function BookingSteps({
  locale,
  currentStep = 1,
  onStepClick,
}: BookingStepsProps) {
  const labels = getLabels(locale);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-y-1 font-['Be_Vietnam_Pro',Arial,sans-serif] text-[12px] font-semibold leading-none md:text-[13px]">
      {labels.map((label, index) => {
        const step = (index + 1) as 1 | 2 | 3 | 4;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        const isUpcoming = step > currentStep;

        return (
          <div key={label} className="flex items-center">
            {isCompleted ? (
              <button
                type="button"
                onClick={() => onStepClick?.(step)}
                className="cursor-pointer text-[#00B3AD] transition-colors duration-200 hover:text-[#00586F]"
              >
                {step}. {label}
              </button>
            ) : (
              <span
                className={`transition-colors duration-200 ${
                  isActive
                    ? "font-black text-[#00586F]"
                    : isUpcoming
                    ? "text-[#7AACB5]"
                    : ""
                }`}
              >
                {step}. {label}
              </span>
            )}

            {step < labels.length ? (
              <span className="px-1.5 text-[#7AACB5]">&gt;</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}