import { useState, useEffect } from 'react';
import { X, Bookmark, Share, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { shareContent } from '@/lib/utils';

interface PoemModalProps {
  poem: any; // Can be Divan poem or Masnavi poem
  isOpen: boolean;
  onClose: () => void;
}

const PoemModal: React.FC<PoemModalProps> = ({ poem, isOpen, onClose }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Initialize audio element if poem has audio
    if (poem?.audioUrl) {
      const audioElement = new Audio(poem.audioUrl);
      setAudio(audioElement);
      
      // Set up event listeners
      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      
      return () => {
        audioElement.pause();
        audioElement.remove();
      };
    }
  }, [poem]);
  
  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    setBookmarked(!bookmarked);
    // In a real app, you would save this to user's preferences
  };
  
  // Handle share
  const handleShare = () => {
    if (poem) {
      const title = poem.title;
      const text = poem.content;
      shareContent(title, text);
    }
  };
  
  // Handle audio play/pause
  const handlePlayAudio = () => {
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Clean up audio on modal close
  useEffect(() => {
    if (!isOpen && audio && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isOpen, audio, isPlaying]);
  
  if (!poem) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">{poem.title}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <div className="poetry-text text-lg text-gray-800 dark:text-gray-200 mb-6 border-r-4 border-primary-500 pr-4">
          {poem.content}
        </div>
        
        {poem.explanation && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2">Шарҳ ва тафсир</h4>
            <p className="text-gray-600 dark:text-gray-300">{poem.explanation}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleBookmarkToggle}
              className="inline-flex items-center"
            >
              <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
              Нигоҳ доштан
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="inline-flex items-center"
            >
              <Share className="h-4 w-4 mr-2" />
              Мубодила
            </Button>
          </div>
          
          {poem.audioUrl && (
            <Button 
              variant="default" 
              onClick={handlePlayAudio}
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              Қироат
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PoemModal;
