interface Step2SensitivityProps {
  onNext: () => void;
  artistData: any;
  setArtistData: (data: any) => void;
}

export default function Step2Sensitivity({ artistData, setArtistData, onNext }: Step2SensitivityProps) {
  return (
    <section className="max-w-[965px] w-full h-[600px] sm:h-[420px] md:h-[450px] lg:h-[480px] xl:h-[500px] ">
      <div className="mb-2 sm:mb-[10px]">
        <span className="text-[#9f9f9f] text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-sans">Step 2</span>
      </div>
      <h2 className="text-white text-[20px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[32px] font-grotesk font-[450] mb-4 sm:mb-5 md:mb-6 lg:mb-[20px] xl:mb-[30px]">DNA Sensitivity</h2>
      <div className="w-full border border-[#383838] rounded-[12px] sm:rounded-[16px] md:rounded-[18px] lg:rounded-[20px] bg-[#0B0B0B] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-[48px] pt-4 sm:pt-5 md:pt-6 lg:pt-8 xl:pt-[48px] pb-4 sm:pb-5 md:pb-6 lg:pb-8 xl:pb-[48px] flex flex-col items-center h-[400px] sm:h-[320px] md:h-[350px] lg:h-[380px] xl:h-[400px] justify-evenly sm:justify-start">
        <div className="w-full mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-[40px] ">
          <div className="text-white text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-grotesk font-[450] mb-1">Set the level of sensitivity for the DNA creation</div>
          <div className="text-[#9f9f9f] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] font-sans">Less sensitivity will result in less number of DNAs, higher sensitivity will result in many niche DNAs.</div>
        </div>
        <div className="w-full max-w-[730px] flex flex-col mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-[40px] mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-[30px]">
          <input
            type="range"
            min="1"
            max="11"
            value={artistData.sensitivity}
            onChange={e => setArtistData({ ...artistData, sensitivity: Number(e.target.value) })}
            className="w-full h-[3px] bg-[#232323] rounded-full appearance-none accent-[#fff]"
            style={{ accentColor: '#fff' }}
          />
          <div className="flex w-full justify-between mt-3 sm:mt-4 text-[#9f9f9f] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[15px] font-sans px-1 sm:px-2">
            <div className="flex flex-col items-start max-w-[30%]">
              <span className="text-center">Least Sensitive</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] text-center">(Generic Genre DNAs)</span>
            </div>
            <div className="flex flex-col items-center max-w-[30%]">
              <span className="text-center">Recommended</span>
            </div>
            <div className="flex flex-col items-end max-w-[30%]">
              <span className="text-center">Highly Sensitive</span>
              <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[13px] text-center">(Niche Genre DNAs)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-2 w-full sm:w-auto">
          <button className="bg-[#007D49] text-white w-full sm:w-[160px] md:w-[180px] lg:w-[197px] h-[48px] sm:h-[52px] md:h-[56px] lg:h-[60px] xl:h-[64px] rounded-full text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-sans font-semibold hover:bg-[#0e9e57] transition" onClick={onNext}>Set Sensitivity</button>
          <button className="text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] font-sans font-semibold hover:underline transition" onClick={onNext}>Skip</button>
        </div>
      </div>
    </section>
  );
} 