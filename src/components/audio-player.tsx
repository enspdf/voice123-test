"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Slider,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

export interface AudioPlayerProps {
  src: string;
  title?: string;
  /** Compact mode: single row, minimal height */
  compact?: boolean;
}

export const AudioPlayer = ({
  src,
  title,
  compact = true,
}: AudioPlayerProps) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleLoadStart = () => setIsLoading(true);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (_event: Event, newValue: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const seekTime = newValue as number;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  if (compact) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          py: 0.5,
          px: 0.75,
          borderRadius: 1,
          bgcolor: alpha(primary, 0.06),
          border: "1px solid",
          borderColor: alpha(primary, 0.15),
        }}
      >
        <audio ref={audioRef} src={src} preload="metadata" />
        <IconButton
          size="small"
          onClick={togglePlayPause}
          disabled={isLoading}
          sx={{
            width: 28,
            height: 28,
            color: primary,
            bgcolor: alpha(primary, 0.12),
            "&:hover": { bgcolor: alpha(primary, 0.2) },
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <PauseIcon sx={{ fontSize: 16 }} />
          ) : (
            <PlayArrowIcon sx={{ fontSize: 16 }} />
          )}
        </IconButton>
        <Slider
          size="small"
          value={duration ? currentTime : 0}
          max={duration || 1}
          onChange={handleSeek}
          sx={{
            minWidth: 60,
            color: primary,
            height: 4,
            padding: 0,
            "& .MuiSlider-thumb": {
              width: 10,
              height: 10,
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0 0 0 4px ${alpha(primary, 0.16)}`,
              },
            },
            "& .MuiSlider-track": { border: "none" },
            "& .MuiSlider-rail": { opacity: 0.4 },
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        bgcolor: alpha(primary, 0.08),
        border: "1px solid",
        borderColor: alpha(primary, 0.2),
        position: "relative",
        overflow: "hidden",
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />
      {title && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Typography
            variant="body2"
            fontWeight={700}
            color="text.primary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        </Box>
      )}
      <Box sx={{ mb: 1 }}>
        <Slider
          value={duration ? currentTime : 0}
          max={duration || 100}
          onChange={handleSeek}
          sx={{
            color: primary,
            height: 6,
            padding: "8px 0",
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              boxShadow: `0 2px 8px ${alpha(primary, 0.4)}`,
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0 0 0 6px ${alpha(primary, 0.16)}`,
              },
            },
            "& .MuiSlider-track": { border: "none" },
            "& .MuiSlider-rail": { opacity: 0.4 },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {formatTime(currentTime)}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          onClick={togglePlayPause}
          disabled={isLoading}
          sx={{
            width: 48,
            height: 48,
            bgcolor: primary,
            color: "white",
            "&:hover": { bgcolor: theme.palette.primary.dark },
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

const formatTime = (time: number): string => {
  if (Number.isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
