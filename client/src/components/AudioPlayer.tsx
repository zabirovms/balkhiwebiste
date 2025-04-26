import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { formatTime } from '@/lib/utils';

interface AudioPlayerProps {
  audioUrl: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);
    
    // Set volume
    audio.volume = volume;
    
    // Auto play if specified
    if (autoPlay) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Error playing audio:', error));
    }
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationRef.current!);
      audio.pause();
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl, autoPlay]);
  
  // Handlers for audio events
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
    cancelAnimationFrame(animationRef.current!);
  };
  
  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    console.error('Error loading audio file');
  };
  
  // Animation for smooth progress update
  const startProgressAnimation = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(startProgressAnimation);
    }
  };
  
  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      audioRef.current.play()
        .then(() => {
          animationRef.current = requestAnimationFrame(startProgressAnimation);
        })
        .catch(error => console.error('Error playing audio:', error));
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle seeking
  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };
  
  // Skip backward 10 seconds
  const skipBackward = () => {
    if (!audioRef.current) return;
    
    const newTime = Math.max(0, currentTime - 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Skip forward 10 seconds
  const skipForward = () => {
    if (!audioRef.current) return;
    
    const newTime = Math.min(duration, currentTime + 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={skipBackward}
              disabled={currentTime <= 0}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={togglePlayPause}
              className="mx-1 bg-primary-100 hover:bg-primary-200 text-primary-700 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 rounded-full h-10 w-10"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={skipForward}
              disabled={currentTime >= duration}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 mx-4">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleMute}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="w-20 hidden sm:block">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
