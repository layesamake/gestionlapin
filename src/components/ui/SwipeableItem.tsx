import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface SwipeableItemProps {
  children: React.ReactNode;
  onDelete: () => void;
  deleteThreshold?: number;
}

export const SwipeableItem: React.FC<SwipeableItemProps> = ({ 
  children, 
  onDelete,
  deleteThreshold = -100 
}) => {
  const controls = useAnimation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDragEnd = async (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < deleteThreshold) {
      setIsDeleting(true);
      await controls.start({ x: -window.innerWidth, opacity: 0 });
      onDelete();
    } else {
      controls.start({ x: 0 });
    }
  };

  if (isDeleting) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-danger">
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end px-6 text-white w-full">
        <Trash2 className="w-6 h-6 animate-pulse" />
      </div>
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: -window.innerWidth, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{ scale: 0.98, cursor: 'grabbing' }}
        className="relative z-10 w-full cursor-grab active:cursor-grabbing bg-background touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  );
};
