import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaTrash } from "react-icons/fa";
import { Howl } from "howler";

interface AudioItem {
  file: File;
  url: string;
  duration?: string;
}

interface Props {
  files: File[];
  playingIndex: number | null;
  onPlay: (file: File, index: number) => void;
  onStop: () => void;
  onRemove: (index: number) => void;
}

function formatDuration(seconds: number) {
  if (!isFinite(seconds) || Number.isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function AudioList({
  files,
  playingIndex,
  onPlay,
  onStop,
  onRemove,
}: Props) {
  const [items, setItems] = useState<AudioItem[]>([]);

  useEffect(() => {
    // Map files to blob URLs and attempt to read duration via an Audio element
    const mapped: AudioItem[] = files.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
    setItems(mapped);

    // Try to load duration for each (non-blocking)
    mapped.forEach((it, idx) => {
      const audio = new Audio(it.url);
      const onLoaded = () => {
        setItems((prev) =>
          prev.map((p, i) =>
            i === idx
              ? {
                  file: p.file,
                  url: p.url,
                  duration: formatDuration(audio.duration),
                }
              : p
          )
        );
        audio.removeEventListener("loadedmetadata", onLoaded);
      };
      audio.addEventListener("loadedmetadata", onLoaded);
      // cleanup in case
      setTimeout(() => audio.pause(), 5000);
    });

    return () => {
      // revoke urls
      mapped.forEach((it) => URL.revokeObjectURL(it.url));
    };
  }, [files]);

  return (
    <div className="w-full border border-[#2b2b2b] rounded-lg p-3 bg-gradient-to-b from-[#0f1112] to-[#0b0b0c] shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white text-sm font-semibold">Your Tracks</h4>
        <span className="text-[12px] text-[#9a9a9a]">{files.length} files</span>
      </div>

      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
        {items.length === 0 && (
          <div className="text-center text-[#8b8b8b] py-8">
            No uploaded tracks yet
          </div>
        )}

        {items.map((it, idx) => (
          <div
            key={`${it.file.name}-${idx}`}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-[#121214] transition"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#1f1f1f] to-[#121212] rounded flex items-center justify-center text-[#cfcfcf] font-mono text-xs">
              {it.file.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div
                  className="text-white text-sm truncate"
                  title={it.file.name}
                >
                  {it.file.name}
                </div>
                <div className="text-[#9b9b9b] text-xs ml-2">
                  {it.duration ?? "..."}
                </div>
              </div>
              <div className="text-[#8f8f8f] text-xs truncate">
                {(it.file.size / (1024 * 1024)).toFixed(2)} MB
              </div>
            </div>

            <div className="flex items-center gap-2">
              {playingIndex === idx ? (
                <button
                  onClick={onStop}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                >
                  <FaPause />
                </button>
              ) : (
                <button
                  onClick={() => onPlay(it.file, idx)}
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                >
                  <FaPlay />
                </button>
              )}

              <button
                onClick={() => onRemove(idx)}
                title="Remove"
                className="text-[#bdbdbd] hover:text-red-400 p-2 rounded-full"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
