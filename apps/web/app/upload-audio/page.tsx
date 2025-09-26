"use client"
import { useRef, useState } from "react";
import TopBarUploadAudio from "@/components/topBarUploadAudio";
import Step1Upload from "@/components/uploadAudio/Step1Upload";
import Step2Sensitivity from "../../components/uploadAudio/Step2Sensitivity";
import Step3Profile from "@/components/uploadAudio/Step3Profile";
import Step4Publish from "@/components/uploadAudio/Step4Publish";

export default function UploadAudioPage() {
  const step1Ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const step2Ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const step3Ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const step4Ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  // Centralized state for artist data
  const [artistData, setArtistData] = useState({
    creator_name: "",
    description: "",
    dna_visibility: "public",
    price: 0,
    license_type: "",
    tracks_visibility: "visible",
    become_partner: false,
    sensitivity: 6,
    status: "pending",
    profile_image_url: "https://dummyimage.com/200x200",
    audio_preview_url: "https://dummyaudio.com/audio.mp3",
    tags: ["seed", "test"]
  });

  // Add shouldSubmit state
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const scrollToStep = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex h-full w-full bg-[#0e0e0f] overflow-hidden">
      <div className="flex flex-col flex-1 h-full w-full">
        <TopBarUploadAudio />
        <div className="flex-1 overflow-y-auto">
          <main className="flex flex-col px-2 sm:px-3 md:px-6 lg:px-8 xl:px-[96px] py-2 sm:py-3 gap-2 sm:gap-3 font-sans">
            <div id="step1" ref={step1Ref} className="scroll-mt-[90px] sm:scroll-mt-[120px] md:scroll-mt-[160px] lg:scroll-mt-[200px] xl:scroll-mt-[180px]">
              <Step1Upload onUploadSuccess={() => scrollToStep(step2Ref)} />
            </div>
            <div id="step2" ref={step2Ref} className="scroll-mt-[10px] sm:scroll-mt-[120px] md:scroll-mt-[10px] lg:scroll-mt-[10px] xl:scroll-mt-[20px]">
              <Step2Sensitivity artistData={artistData} setArtistData={setArtistData} onNext={() => scrollToStep(step3Ref)} />
            </div>
            <div id="step3" ref={step3Ref} className="scroll-mt-[10px] sm:scroll-mt-[120px] md:scroll-mt-[10px] lg:scroll-mt-[10px] xl:scroll-mt-[1px]">
              <Step3Profile artistData={artistData} setArtistData={setArtistData} onDone={() => { scrollToStep(step4Ref); setShouldSubmit(true); }} />
            </div>
            <div id="step4" ref={step4Ref} className="scroll-mt-[-280px] sm:scroll-mt-[120px] md:scroll-mt-[10px] lg:scroll-mt-[10px] xl:scroll-mt-[10px]">
              <Step4Publish artistData={artistData} setArtistData={setArtistData} shouldSubmit={shouldSubmit} setShouldSubmit={setShouldSubmit} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
