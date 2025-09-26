import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Topbar() {
    const [open, setOpen] = useState(false);
    const userRef = useRef<HTMLDivElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    return (
        <header className="relative w-full h-[160px] sm:h-[180px] md:h-[300px] lg:h-[200px] xl:h-[232px] flex flex-col py-4 mb-4 bg-[#0E0E0F] border-b border-[#383838] overflow-hidden">
            {/* Gradient Overlay Effect */}
            <div className="absolute w-full h-full top-0 left-0">
                <div className="absolute w-full h-full top-0 left-0">
                    <div className="relative w-full h-full">
                        {/* Blue Blur Element - Creates the gradient effect */}
                        <div className="absolute w-[280px] sm:w-[320px] md:w-[480px] lg:w-[640px] h-[45px] sm:h-[55px] md:h-[80px] lg:h-[110px] top-[60px] sm:top-[70px] md:top-[79px] left-[-20px] sm:left-[-25px] md:left-[-40px] lg:left-[-50px] bg-[#65aaff] rounded-[140px/22.5px] sm:rounded-[160px/27.5px] md:rounded-[240px/40px] lg:rounded-[320px/55px] blur-[40px] sm:blur-[48px] md:blur-[72px] lg:blur-[96.3px] opacity-[0.46]" />
                        
                        {/* Semi-transparent Overlay */}
                        <div className="absolute w-full h-full top-0 bg-[#d9d9d90a]" />
                    </div>
                </div>
            </div>

            {/* Content - needs relative positioning to appear above overlay */}
            <div className="relative z-10 flex justify-between items-center w-full mt-2 lg:mt-[2px] sm:mt-4 px-4 sm:px-6 lg:px-8">
                {/* Left spacer for mobile when sidebar is hidden */}
                <div className="w-0 xl:w-0"></div>
                
                {/* Profile Icon - Always visible on right */}
                <div className="w-10 h-10 sm:w-11 sm:h-11  rounded-full overflow-hidden cursor-pointer group relative ml-auto" ref={userRef}>
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
            
            {/* Header Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-[96px] lg:mt-[8px] sm:mt-3 flex-1 flex flex-col ">
                <h1 className="font-[450] text-white text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[24px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] tracking-wide font-grotesk">
                    BUILD <span className="font-bold">DNA</span>
                </h1>
                <p className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[16px] sm:leading-[18px] md:leading-[20px] lg:leading-[23px] text-[#868687] font-sans mt-1 sm:mt-2 max-w-full sm:max-w-[90%] lg:max-w-[80%]">
                    Build a DNA on Soundverse and earn passive income as your DNA is used by other creators.{" "}
                    <span className="text-white underline opacity-90 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] leading-[16px] sm:leading-[18px] md:leading-[20px] lg:leading-[23px] font-sans">
                        <a href="#" className="hover:opacity-80 transition-opacity">Learn more</a>
                    </span>
                </p>
            </div>
        </header>
    );
}