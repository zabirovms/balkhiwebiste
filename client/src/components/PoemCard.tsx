import { Button } from '@/components/ui/button';
import { Bookmark, Share } from 'lucide-react';
import { Link } from 'wouter';
import TagBadge from '@/components/TagBadge';
import { shareContent } from '@/lib/utils';

interface PoemCardProps {
  poem: any; // Can be DivanPoem or MasnaviPoem
  highlightText?: string;
}

const PoemCard: React.FC<PoemCardProps> = ({ poem, highlightText }) => {
  // Determine if it's a Divan Poem or Masnavi Poem
  const isDivanPoem = 'ghazalNumber' in poem;
  
  // Format content for display with highlighting
  const formatContent = (content: string) => {
    if (!highlightText || highlightText.trim() === '') {
      return content.split('\n').slice(0, 2).join('\n');
    }
    
    // Highlight matching text
    const regex = new RegExp(`(${highlightText.trim()})`, 'gi');
    const lines = content.split('\n').slice(0, 2);
    
    return lines.map(line => {
      return line.replace(regex, '<span class="highlight">$1</span>');
    }).join('\n');
  };
  
  // Handle share button click
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    shareContent(poem.title, poem.content);
  };
  
  return (
    <div className="poem-card p-4 border-b border-gray-100 dark:border-gray-700 hover:shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">
          {isDivanPoem ? (
            <Link href={`/divan/${poem.ghazalNumber}`}>
              <a className="hover:text-primary-700 dark:hover:text-primary-400 transition">{poem.title}</a>
            </Link>
          ) : (
            <Link href={`/masnavi/${poem.bookId}`}>
              <a className="hover:text-primary-700 dark:hover:text-primary-400 transition">{poem.title}</a>
            </Link>
          )}
        </h3>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition h-8 w-8"
            aria-label="Bookmark poem"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare}
            className="text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 transition h-8 w-8"
            aria-label="Share poem"
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        className="poetry-text text-gray-700 dark:text-gray-300 line-clamp-2 mb-2"
        dangerouslySetInnerHTML={{ __html: formatContent(poem.content) }}
      ></div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-3">{poem.baytCount} байт</span>
          {poem.tags && poem.tags.length > 0 && (
            <div className="flex space-x-1">
              {poem.tags.slice(0, 2).map((tag: string) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {isDivanPoem ? 'Девони Шамс' : 'Маснавӣ'}
        </span>
      </div>
    </div>
  );
};

export default PoemCard;
