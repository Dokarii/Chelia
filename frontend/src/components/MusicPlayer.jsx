import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Hide notification after 10 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/Music/I N  T H E  S E A.mp3" loop />
      
      {/* Floating Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-brand-800/80 backdrop-blur-md border border-purple-500/30 px-6 py-4 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center gap-4">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <Music className="w-5 h-5 text-purple-300" />
              </div>
              <p className="text-purple-100 font-medium">
                Puedes poner la música para que pruebes tus nuevos audífonos ✨
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player Control */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={togglePlay}
          className="bg-brand-800/80 backdrop-blur-md border border-purple-500/30 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:scale-110 transition-transform hover:bg-brand-700/80 group"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-purple-300 group-hover:text-purple-200" />
          ) : (
            <Play className="w-6 h-6 text-purple-300 group-hover:text-purple-200 translate-x-0.5" />
          )}
        </button>
      </div>
    </>
  );
}
