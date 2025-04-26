import { getTagColor } from '@/lib/utils';

interface TagBadgeProps {
  tag: string;
  size?: 'sm' | 'md';
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, size = 'sm' }) => {
  const { bg, text } = getTagColor(tag);
  
  return (
    <span 
      className={`
        inline-block ${bg} ${text} rounded
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
      `}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
