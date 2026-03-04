import React, { useState, useRef, useEffect, useContext } from 'react';
import { SongContext } from '../song.context';
import '../styles/player.scss';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const Player = () => {
    const { song } = useContext(SongContext);

    // Refs
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showSpeed, setShowSpeed] = useState(false);

    useEffect(() => {
        if (audioRef.current && song?.songUrl) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentTime(0);
            setIsPlaying(false);

            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.log("Autoplay blocked by browser. User interaction required.", error);
                        setIsPlaying(false);
                    });
            }
        }
    }, [song?.songUrl]); 

    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
        }
    }, [speed]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skip = (secs) => {
        if (audioRef.current) {
            const newTime = audioRef.current.currentTime + secs;
            audioRef.current.currentTime = Math.min(Math.max(newTime, 0), duration);
        }
    };

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        if (audioRef.current) audioRef.current.volume = val;
        setIsMuted(val === 0);
    };

    const toggleMute = () => {
        if (isMuted) {
            if (audioRef.current) audioRef.current.volume = volume || 0.5;
            setIsMuted(false);
        } else {
            if (audioRef.current) audioRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const handleSpeedChange = (s) => {
        setSpeed(s);
        setShowSpeed(false);
    };

    const handleProgressClick = (e) => {
        const bar = progressRef.current;
        const rect = bar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const newTime = ratio * duration;
        if (audioRef.current) audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSongEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    if (!song) return null;

    return (
        <div className="player">
            <audio
                ref={audioRef}
                src={song.songUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />

            <div className="player__info">
                <img
                    className="player__poster"
                    src={song.posterUrl}
                    alt={song.title}
                />
                <div className="player__meta">
                    <p className="player__title">{song.title}</p>
                    <span className="player__mood">{song.mood}</span>
                </div>
            </div>

            <div className="player__progress-wrap">
                <span className="player__time">{formatTime(currentTime)}</span>
                <div
                    className="player__progress"
                    ref={progressRef}
                    onClick={handleProgressClick}
                >
                    <div className="player__progress-fill" style={{ width: `${progress}%` }} />
                    <div className="player__progress-thumb" style={{ left: `${progress}%` }} />
                </div>
                <span className="player__time">{formatTime(duration)}</span>
            </div>

            <div className="player__controls">
                <div className="player__speed-wrap">
                    <button
                        className="player__btn player__btn--speed"
                        onClick={() => setShowSpeed(!showSpeed)}
                        title="Playback speed"
                    >
                        {speed}×
                    </button>
                    {showSpeed && (
                        <div className="player__speed-menu">
                            {SPEED_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    className={`player__speed-option ${s === speed ? 'active' : ''}`}
                                    onClick={() => handleSpeedChange(s)}
                                >
                                    {s}×
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className="player__btn player__btn--skip" onClick={() => skip(-5)} title="Back 5s">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M1 4v6h6" />
                        <path d="M3.51 15a9 9 0 1 0 .49-3.6" />
                    </svg>
                    <span>5s</span>
                </button>

                <button className="player__btn player__btn--play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                            <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                    )}
                </button>

                <button className="player__btn player__btn--skip" onClick={() => skip(5)} title="Forward 5s">
                    <span>5s</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M23 4v6h-6" />
                        <path d="M20.49 15a9 9 0 1 1-.49-3.6" />
                    </svg>
                </button>

                <div className="player__volume">
                    <button className="player__btn player__btn--vol" onClick={toggleMute} title="Mute">
                        {isMuted || volume === 0 ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.87 8.87 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                            </svg>
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolume}
                        className="player__volume-slider"
                        // DYNAMIC VOLUME FILL STYLE
                        style={{
                            background: `linear-gradient(to right, #dd4200 ${volume * 100}%, #3a3a3a ${volume * 100}%)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;