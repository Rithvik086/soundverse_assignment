import { useRef, useState } from "react";

interface Step3ProfileProps {
  onDone: () => void;
  artistData: any;
  setArtistData: (data: any) => void;
}

export default function Step3Profile({ artistData, setArtistData, onDone }: Step3ProfileProps) {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImg(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom select wrapper
  const CustomSelect = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="relative">
      <select
        {...props}
        className={
          "appearance-none h-[28px] sm:h-[30px] md:h-[32px] lg:h-[36px] xl:h-[38px] bg-[#181818] border border-[#383838] rounded-full px-2 sm:px-3 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 text-white font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] pr-6 sm:pr-7 md:pr-8 lg:pr-10 focus:outline-none w-full " +
          (props.className ? props.className : "")
        }
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-1.5 sm:right-2 md:right-2 lg:right-3 top-1/2 -translate-y-1/2">
        <img src="/dropDown.svg" alt="dropdown" width={10} height={8} className="sm:w-[11px] sm:h-[8px] md:w-[12px] md:h-[9px] lg:w-[14px] lg:h-[10px] xl:w-[15px] xl:h-[11px]" />
      </span>
    </div>
  );

  return (
    <section className="w-full max-w-full mx-auto">
      <div className="mb-1 sm:mb-1">
        <span className="text-[#9f9f9f] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-sans">Step 3</span>
      </div>
      <h2 className="text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-grotesk font-[450] mb-2 sm:mb-2">Profile Creation</h2>
      
      <div className="w-full border border-[#383838] rounded-[12px] sm:rounded-[14px] md:rounded-[16px] bg-[#0B0B0B] px-3 sm:px-4 md:px-5 lg:px-6 pt-3 sm:pt-4 pb-2 sm:pb-2">
        <div className="flex flex-col xl:flex-row gap-4 sm:gap-5 md:gap-6">
          {/* Left: Form fields */}
          <div className="flex-1 space-y-2 sm:space-y-2.5 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">Creator Name</label>
              <div className="w-full sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] xl:max-w-[280px]">
                <input 
                  className="w-full h-[28px] sm:h-[30px] md:h-[32px] lg:h-[36px] xl:h-[38px] bg-[#1b1b1b] border border-[#383838] rounded-full px-2 sm:px-3 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 text-white font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]" 
                  placeholder="Name such as Skrillex, Coldplay"
                  value={artistData.creator_name}
                  onChange={e => setArtistData({ ...artistData, creator_name: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">Description</label>
              <div className="w-full sm:max-w-[260px] md:max-w-[300px] lg:max-w-[320px] xl:max-w-[400px]">
                <input 
                  className="w-full h-[28px] sm:h-[30px] md:h-[32px] lg:h-[36px] xl:h-[38px] bg-[#181818] border border-[#383838] rounded-full px-2 sm:px-3 md:px-3 lg:px-4 py-1 sm:py-1.5 md:py-2 text-white font-sans text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px]" 
                  placeholder="Up to 300 characters"
                  value={artistData.description}
                  onChange={e => setArtistData({ ...artistData, description: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">Tags</label>
              <button>
                <img src="/picAdd.svg" alt="Add tag" className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px] xl:w-[48px] xl:h-[48px]" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">DNA Visibility</label>
              <div className="w-full sm:max-w-[110px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[160px]">
                <CustomSelect value={artistData.dna_visibility} onChange={e => setArtistData({ ...artistData, dna_visibility: e.target.value })}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="draft">Draft</option>
                </CustomSelect>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">Price</label>
              <div className="w-full sm:max-w-[90px] md:max-w-[100px] lg:max-w-[115px] xl:max-w-[132px]">
                <CustomSelect value={artistData.price} onChange={e => setArtistData({ ...artistData, price: e.target.value })}>
                  <option value={9.99}>$9.99</option>
                  <option value={19.99}>$19.99</option>
                  <option value={0}>Free</option>
                </CustomSelect>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">License</label>
              <div className="w-full sm:max-w-[130px] md:max-w-[150px] lg:max-w-[160px] xl:max-w-[187px]">
                <CustomSelect value={artistData.license_type} onChange={e => setArtistData({ ...artistData, license_type: e.target.value })}>
                  <option value="Distribution">Distribution</option>
                  <option value="Royalty Free">Royalty Free</option>
                  <option value="Sample">Sample</option>
                  <option value="Sync">Sync</option>
                  <option value="Full Ownership">Full Ownership</option>
                </CustomSelect>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">Tracks</label>
              <div className="w-full sm:max-w-[110px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[160px]">
                <CustomSelect value={artistData.tracks_visibility} onChange={e => setArtistData({ ...artistData, tracks_visibility: e.target.value })}>
                  <option value="visible">Visible</option>
                  <option value="invisible">Invisible</option>
                </CustomSelect>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4">
              <label className="text-[#fff] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans min-w-[80px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">Become Partner</label>
              <div className="w-full sm:max-w-[90px] md:max-w-[100px] lg:max-w-[110px] xl:max-w-[125px]">
                <CustomSelect value={artistData.become_partner ? "yes" : "no"} onChange={e => setArtistData({ ...artistData, become_partner: e.target.value === "yes" })}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </CustomSelect>
              </div>
            </div>
          </div>
          
          {/* Right: Profile picture upload */}
          <div className="flex flex-col items-center flex-shrink-0 w-full xl:w-[280px]">
            <div
              className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[214px] h-[120px] sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[214px] rounded-full border border-[#383838] flex items-center justify-center bg-[#181818] mb-3 sm:mb-4 relative cursor-pointer overflow-hidden"
              onClick={handleImageClick}
              title="Click to upload profile picture"
            >
              {profileImg ? (
                <img src={profileImg} alt="Profile preview" className="object-cover w-full h-full rounded-full" />
              ) : (
                <img src="/picAdd.svg" alt="Add profile" className="w-[36px] sm:w-[42px] md:w-[48px] lg:w-[56px] xl:w-[64px] h-[36px] sm:h-[42px] md:h-[48px] lg:h-[56px] xl:h-[64px]" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <button
              className="bg-[#232323] text-white w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] xl:w-[140px] h-[32px] sm:h-[34px] md:h-[36px] lg:h-[38px] xl:h-[40px] rounded-full text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] font-sans font-semibold hover:bg-[#383838] transition"
              onClick={handleImageClick}
              type="button"
            >
              Upload Picture
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-3 sm:mt-4">
          <button 
            className="bg-[#007D49] text-white w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] xl:w-[140px] h-[36px] sm:h-[38px] md:h-[40px] lg:h-[42px] xl:h-[44px] rounded-full text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] font-sans font-semibold hover:bg-[#0e9e57] transition" 
            onClick={onDone}
          >
            Done
          </button>
        </div>
      </div>
    </section>
  );
}