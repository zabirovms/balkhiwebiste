import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { usePoem } from '@/hooks/use-poem';
import { Play, Pause, Repeat, Share, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime, shareContent } from '@/lib/utils';

const DailyVerse = () => {
  const { openPoemModal } = usePoem();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Fetch daily verse data
  const { data: verse, isLoading, isError, refetch } = useQuery({
    queryKey: ['/api/daily-verse'],
    refetchOnWindowFocus: false,
  });
  
  // Fetch a random verse
  const getRandomVerse = async () => {
    try {
      const response = await fetch('/api/random-verse');
      if (response.ok) {
        refetch();
      }
    } catch (error) {
      console.error('Error fetching random verse:', error);
    }
  };
  
  // Show full poem modal
  const showFullPoem = () => {
    if (verse) {
      openPoemModal(verse);
    }
  };
  
  // Toggle audio playback
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Handle bookmarking verse
  const bookmarkVerse = () => {
    // Implementation for saving to local storage or user account would go here
    alert('Мисраи рӯз ба ҳофизаи шумо илова карда шуд.');
  };
  
  // Handle sharing verse
  const shareVerse = () => {
    if (verse) {
      shareContent('Мисраи рӯз аз Мавлоно Ҷалолуддини Балхӣ', `${verse.text}\n\n${verse.source}`);
    }
  };
  
  // Update audio progress
  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };
    
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    };
    
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioRef.current]);
  
  // Reset audio when verse changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [verse]);
  
  return (
    <section className="mb-16 fade-in-section">
      <motion.div 
        className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <i className="fas fa-quote-right text-2xl mr-3 text-accent-300"></i>
            <h2 className="text-2xl font-bold">Мисраи рӯз</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={shareVerse} 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full"
              aria-label="Share verse"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={bookmarkVerse} 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full"
              aria-label="Bookmark verse"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
          {isLoading ? (
            <div className="text-center py-6">
              <div className="animate-pulse bg-white bg-opacity-20 h-6 w-3/4 mx-auto rounded mb-2"></div>
              <div className="animate-pulse bg-white bg-opacity-20 h-6 w-1/2 mx-auto rounded"></div>
            </div>
          ) : isError ? (
            <div className="text-center py-6">
              <p className="text-xl mb-4">Хатогии боргирӣ рух дод.</p>
              <Button onClick={() => refetch()}>Бори дигар кӯшиш кунед</Button>
            </div>
          ) : (
            <>
              <p className="poetry-text text-xl mb-4" id="daily-verse">
                {verse?.text}
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm opacity-80">
                  <span id="verse-source">{verse?.source}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={getRandomVerse}
                    className="inline-flex items-center bg-white text-secondary-800 hover:bg-gray-100"
                  >
                    <Repeat className="h-4 w-4 mr-2" />
                    Мисраи дигар
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={showFullPoem}
                    className="inline-flex items-center bg-secondary-900 hover:bg-secondary-950 text-white"
                  >
                    <i className="fas fa-book-open mr-2"></i>
                    Шеъри пурра
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Audio player */}
        {verse?.audioUrl && (
          <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4 audio-player">
            <audio ref={audioRef} src={verse.audioUrl} preload="metadata" />
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleAudio} 
                className="text-white mr-3 focus:outline-none"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <div className="w-full mx-3">
                <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-accent-400 rounded-full" 
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-white whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default DailyVerse;
