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
      <h1 className="text-2xl sm:text-3xl text-white font-bold mb-6 sm:mb-8 ml-12 sm:ml-16 lg:ml-0">
        Artists
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.length === 0 && !error && (
            <div className="col-span-full flex flex-col items-center justify-center w-full">
              <img
                src="/user.png"
                alt="No artists"
                className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mb-4 border border-[#383838]"
              />
              <span className="text-[#bdbdbd] text-base sm:text-lg">
                No artists found.
              </span>
            </div>
          )}

          {artists.map((artist) => (
            <article
              key={artist.id}
              className="group relative w-full max-w-[360px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#171718] to-[#242426] border border-[#2d2d2f] shadow-lg shadow-black/40 transform transition-all hover:scale-[1.03]"
            >
              {/* Image header (use <img> for reliable rendering) */}
              <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden bg-[#111]">
                <img
                  src={"/user1.jpg"}
                  alt={artist.creator_name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/user.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-3 flex flex-col items-center text-center px-4">
                  <div className="text-white">
                    <h2 className="text-lg sm:text-xl font-bold leading-tight truncate">
                      {artist.creator_name}
                    </h2>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                      {artist.tags &&
                        artist.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[12px] px-2 py-0.5 rounded-full bg-white/6 text-white/85"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                {/* quick status pill */}
                <div className="absolute right-3 top-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${artist.status === "active" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-200"}`}
                  >
                    {artist.status ?? "unknown"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 flex flex-col gap-3">
                <p className="text-[13px] sm:text-sm text-[#d6d6d6] leading-relaxed max-h-[84px] overflow-y-auto custom-scrollbar">
                  {artist.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#bdbdbd]">DNA</span>
                    <strong className="text-sm text-white">
                      {artist.dna_visibility ?? "—"}
                    </strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#bdbdbd]">Price</span>
                    <strong className="text-sm text-white">
                      {artist.price ? `$${artist.price}` : "Free"}
                    </strong>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] text-[#bdbdbd]">License</span>
                    <strong className="text-sm text-white">
                      {artist.license_type ?? "—"}
                    </strong>
                  </div>
                </div>

                {/* Audio preview + actions */}
                <div className="flex flex-col gap-2">
                  {artist.audio_preview_url ? (
                    <audio
                      controls
                      src={artist.audio_preview_url}
                      className="w-full rounded-md bg-black/40"
                    />
                  ) : (
                    <div className="text-[12px] text-[#8b8b8b]">
                      No preview available
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-1">
                    <button className="flex-1 py-2 px-3 rounded-lg bg-[#6A35EE] hover:bg-[#5a2bdc] text-white text-sm font-semibold transition">
                      Follow
                    </button>
                    <button className="py-2 px-3 rounded-lg bg-white/6 hover:bg-white/10 text-white text-sm">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Add custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #383838;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
