"use client";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  creator_name: string;
  description: string;
  profile_image_url?: string;
  tags?: string[];
  dna_visibility?: string;
  price?: number;
  license_type?: string;
  tracks_visibility?: string;
  become_partner?: boolean;
  audio_preview_url?: string;
  sensitivity?: number;
  status?: string;
  created_at?: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
        if (!backendUri) throw new Error("Backend URI not set");
        const res = await fetch(`${backendUri}/artists`);
        if (!res.ok) throw new Error("Failed to fetch artists");
        const data = await res.json();
        setArtists(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0f] p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl text-white font-bold mb-6 sm:mb-8 ml-12 sm:ml-16 lg:ml-0">Artists</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {artists.length === 0 && !error && (
            <div className="col-span-full flex flex-col items-center justify-center w-full">
              <img src="/user.png" alt="No artists" className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mb-4 border border-[#383838]" />
              <span className="text-[#bdbdbd] text-base sm:text-lg">No artists found.</span>
            </div>
          )}
          {artists.map((artist) => (
            <div key={artist.id} className="rounded-2xl shadow-lg shadow-black/30 border border-[#383838] flex flex-col justify-between items-stretch min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] max-h-[380px] sm:max-h-[420px] lg:max-h-[440px] h-[380px] sm:h-[420px] lg:h-[440px] p-0 transition-transform hover:scale-[1.02] sm:hover:scale-[1.035] w-full max-w-[340px] mx-auto" style={{ background: 'linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)' }}>
              {/* Card Header */}
              <div className="flex flex-col items-center p-4 sm:p-5 lg:p-6 pb-2 sm:pb-3">
                <img
                  src={"/user.png"}
                  alt={artist.creator_name}
                  className="w-16 sm:w-18 lg:w-20 h-16 sm:h-18 lg:h-20 rounded-full object-cover mb-2 sm:mb-3 border-2 border-[#383838] shadow-lg"
                />
                <h2 className="text-2xl sm:text-2xl lg:text-3xl text-white font-extrabold mb-1 text-center w-full truncate">{artist.creator_name}</h2>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 justify-center w-full">
                  {artist.tags && artist.tags.map((tag) => (
                    <span key={tag} className="bg-[#232326] text-[#bdbdbd] text-xs px-2 sm:px-3 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>
              {/* Description with scroll */}
              <div className="px-4 sm:px-5 lg:px-6 mb-2">
                <div className="rounded-lg p-2 sm:p-3 min-h-[48px] sm:min-h-[56px] max-h-[64px] sm:max-h-[72px] overflow-y-auto text-[#e0e0e0] text-[14px] sm:text-[15px] lg:text-[16px] font-[600] text-center custom-scrollbar" style={{ background: 'transparent' }}>
                  {artist.description}
                </div>
              </div>
              {/* Card Attributes */}
              <div className="px-4 sm:px-5 lg:px-6 flex flex-col gap-1 mb-2">
                <div className="text-white text-xs sm:text-sm">DNA Visibility: <span className="font-semibold">{artist.dna_visibility}</span></div>
                <div className="text-white text-xs sm:text-sm">Price: <span className="font-semibold">{artist.price ? `$${artist.price}` : "Free"}</span></div>
                <div className="text-white text-xs sm:text-sm">License: <span className="font-semibold">{artist.license_type}</span></div>
                <div className="text-white text-xs sm:text-sm">Status: <span className="font-semibold">{artist.status}</span></div>
              </div>
              {/* Card Footer */}
              <div className="w-full flex items-center justify-center px-4 sm:px-5 lg:px-6 pb-3 sm:pb-4 mt-auto">
                {artist.audio_preview_url && (
                  <a href={artist.audio_preview_url} target="_blank" rel="noopener noreferrer" className="text-[#6A35EE] text-xs sm:text-sm underline break-all w-full text-center truncate">
                    {artist.audio_preview_url}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px sm:width-6px;
          background: #232326;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #383838;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
} 