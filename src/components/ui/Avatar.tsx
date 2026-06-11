import React from 'react';

interface AvatarProps {
  name: string;
  image?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Generate a consistent color from a name string
const getColorFromName = (name: string): string => {
  const colors = [
    'bg-primary/15 text-primary',
    'bg-secondary/15 text-secondary',
    'bg-warning/15 text-warning',
    'bg-emerald-500/15 text-emerald-600',
    'bg-violet-500/15 text-violet-600',
    'bg-rose-500/15 text-rose-600',
    'bg-sky-500/15 text-sky-600',
    'bg-amber-500/15 text-amber-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: string): string => {
  // Handle codes like "F-012", "M-004"
  if (/^[A-Z]-\d+$/.test(name)) {
    return name.substring(0, 3);
  }
  // Handle normal names
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const sizeClasses = {
  sm: 'w-10 h-10 text-xs',
  md: 'w-14 h-14 text-sm',
  lg: 'w-20 h-20 text-lg',
};

export const Avatar: React.FC<AvatarProps> = ({ name, image, size = 'md', className = '' }) => {
  if (image) {
    return (
      <div className={`${sizeClasses[size]} rounded-xl overflow-hidden flex-shrink-0 border border-border/50 ${className}`}>
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  const initials = getInitials(name);
  const colorClass = getColorFromName(name);

  return (
    <div className={`${sizeClasses[size]} rounded-xl flex-shrink-0 flex items-center justify-center font-bold font-mono ${colorClass} ${className}`}>
      {initials}
    </div>
  );
};
