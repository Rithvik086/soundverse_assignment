"use client";
import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const steps = [
  { id: "step1", label: "Step 1: Upload Audio" },
  { id: "step2", label: "Step 2: DNA Sensitivity" },
  { id: "step3", label: "Step 3: Profile Creation" },
  { id: "step4", label: "Step 4: Tagging and Categorization" },
  { id: "step5", label: "Publish" },
];

export default function TopBarUploadAudio() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // IntersectionObserver for step highlight
  useEffect(() => {
    const stepElements: HTMLElement[] = steps
      .map((step) => document.getElementById(step.id))
      .filter(Boolean) as HTMLElement[];
    if (stepElements.length === 0) return;

    // Responsive root margin based on screen size
    const getResponsiveRootMargin = () => {
      if (window.innerWidth >= 1280) return "-120px 0px 0px 0px"; // xl
      if (window.innerWidth >= 1024) return "-200px 0px 0px 0px"; // lg
      if (window.innerWidth >= 768) return "-280px 0px 0px 0px"; // md
      if (window.innerWidth >= 640) return "-240px 0px 0px 0px"; // sm
      return "-200px 0px 0px 0px"; // mobile
    };

    const observer = new window.IntersectionObserver(
      (entries) => {
        // Find the first entry that is visible (lower threshold for mobile)
        const visible = entries
          .filter((entry) => entry.intersectionRatio >= 0.2)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length === 0) return;
          const idx = steps.findIndex(
            (s) => s.id === (visible[0]!.target as HTMLElement).id
          );
          setActiveStep(idx);
      },
      {
        root: null,
        rootMargin: getResponsiveRootMargin(),
        threshold: 0.8, // Multiple thresholds for better detection
      }
    );

    stepElements.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  // Dropdown position for portal
  useEffect(() => {
    if (open && userRef.current) {
      const rect = userRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 80,
        zIndex: 9999,
        minWidth: 120,
      });
    }
  }, [open]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Step click: scroll to section
  const handleStepClick = (idx: number) => {
    const step = steps[idx];
    if (!step) return;
    const el = document.getElementById(step.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="relative w-full min-h-[80px] sm:min-h-[120px] md:min-h-[160px] lg:min-h-[200px] xl:min-h-[232px] flex flex-col py-2 sm:py-3 md:py-4 bg-[#0E0E0F] border-b border-[#383838] overflow-hidden">
      {/* gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="relative inset-0 w-full h-full">
            <div
              className="
                absolute
                w-[80px] sm:w-[160px] md:w-[240px] lg:w-[480px]
                h-[20px] sm:h-[30px] md:h-[40px] lg:h-[80px]
                top-[20px] sm:top-[30px] md:top-[40px] lg:top-[79px]
                left-[-5px] sm:left-[-10px] md:left-[-15px] lg:left-[-40px]
                bg-[#65aaff]
                rounded-[40px/8px] sm:rounded-[80px/15px] md:rounded-[120px/20px] lg:rounded-[240px/40px]
                blur-[12px] sm:blur-[24px] md:blur-[32px] lg:blur-[72px]
                opacity-[0.46]
              "
            />
            <div className="absolute inset-0 bg-[#d9d9d90a]" />
          </div>
        </div>
      </div>

      {/* topbar */}
      <div className="relative z-10 flex justify-between items-center w-full mt-0 sm:mt-1 md:mt-2 lg:mt-[2px] xl:mt-[2px] px-2 sm:px-3 md:px-6 lg:px-8  xl:px-[26px]">
        {/* Left spacer for mobile when sidebar is hidden */}
        <div className="w-0 xl:w-0"></div>
        {/* Profile Icon - Fixed positioning for tablet view */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden cursor-pointer group relative ml-auto mr-6 sm:mr-6 md:mr-6 lg:mr-6 xl:mr-1.5" ref={userRef}>
          <img src="/user.png" alt="Profile" className="w-full h-full object-cover" onClick={() => setOpen(!open)} />
        </div>
        {open && ReactDOM.createPortal(
          <div style={dropdownStyle} className="bg-[#232323] rounded-lg shadow-lg border border-[#383838] flex flex-col">
            <button className="px-2 py-1 text-white text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Profile</button>
            <button className="px-2 py-1 text-white text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Settings</button>
            <button className="px-2 py-1 text-red-400 text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Logout</button>
          </div>,
          document.body
        )}
      </div>

      {/* text and stepper */}
      <div className="relative z-10 px-2 sm:px-3 md:px-6 lg:px-8 xl:px-[96px] mt-6  lg:mt-0 flex-1">
        <h1 className="font-[450] text-white text-[15px] sm:text-[18px] md:text-[22px] lg:text-[28px] xl:text-[32px] leading-[18px] sm:leading-[22px] md:leading-[28px] lg:leading-[32px] xl:leading-[40px] tracking-wide font-grotesk ">
          Build DNA by Uploading Audio Tracks
        </h1>
        <p className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] leading-[12px] sm:leading-[16px] md:leading-[18px] lg:leading-[20px] xl:leading-[23px] text-[#868687] font-sans mt-1 sm:mt-2">
          You can upload your music, and build your DNA.
        </p>
        
        {/* Responsive Step Navigation */}
        <div className="relative z-10 mt-2 sm:mt-3 md:mt-4 pb-2 sm:pb-3">
          {/* Desktop: Horizontal Steps (xl and above) */}
          <div className="hidden xl:flex flex-row gap-4 h-[56px]">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(idx)}
                className={`
                  px-3 py-3 rounded-full text-[16px] font-sans border border-[#383838]
                  transition-colors transition-shadow duration-500 ease-in-out focus:outline-none
                  ${
                    activeStep === idx
                      ? "bg-[#007d49] text-white shadow-lg"
                      : "bg-[#232323] text-[#9f9f9f] hover:bg-[#383838]"
                  }
                `}
                style={{ minWidth: 180 }}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Tablet: Horizontal Steps with better sizing (lg to xl) */}
          <div className="hidden lg:flex xl:hidden flex-row flex-wrap gap-2 max-w-full">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(idx)}
                className={`
                  px-3 py-2 rounded-full text-[13px] font-sans border border-[#383838]
                  transition-colors transition-shadow duration-500 ease-in-out focus:outline-none
                  flex-shrink-0
                  ${
                    activeStep === idx
                      ? "bg-[#007d49] text-white shadow-lg"
                      : "bg-[#232323] text-[#9f9f9f] hover:bg-[#383838]"
                  }
                `}
                style={{ minWidth: 140 }}
              >
                {step.label}
              </button>
            ))}
          </div>

          {/* Mobile/Small Tablet: Horizontal Scrollable Steps (below lg) */}
          <div className="lg:hidden flex flex-row gap-1 sm:gap-2 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#383838] scrollbar-track-transparent pb-2">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(idx)}
                className={`min-w-[90px] sm:min-w-[110px] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[12px] md:text-[13px] font-sans border border-[#383838] transition-colors transition-shadow duration-500 ease-in-out focus:outline-none flex-shrink-0 ${activeStep === idx ? "bg-[#007d49] text-white shadow-lg" : "bg-[#232323] text-[#9f9f9f] hover:bg-[#383838]"}`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
