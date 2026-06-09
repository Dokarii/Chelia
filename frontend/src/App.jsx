import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Login from './components/Login';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';
import FinalQuestion from './components/FinalQuestion';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cursor parallax for snow layers
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 40, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 40, damping: 20 });

  // Each snow layer moves at different intensity for depth effect
  const snow1X = useTransform(springX, [-1, 1], ['-15px', '15px']);
  const snow1Y = useTransform(springY, [-1, 1], ['-10px', '10px']);
  const snow2X = useTransform(springX, [-1, 1], ['-30px', '30px']);
  const snow2Y = useTransform(springY, [-1, 1], ['-20px', '20px']);
  const snow3X = useTransform(springX, [-1, 1], ['-50px', '50px']);
  const snow3Y = useTransform(springY, [-1, 1], ['-35px', '35px']);

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    cursorX.set(x);
    cursorY.set(y);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden selection:bg-purple-500/30"
      onMouseMove={handleMouseMove}
    >
      {/* Noise overlay */}
      <div className="noise-overlay"></div>

      {/* Celeste Inspired Background */}
      <div className="premium-bg">
        <div className="celeste-mountain"></div>
        {/* Snow layers with cursor parallax */}
        <motion.div className="snow-3" style={{ x: snow3X, y: snow3Y }}></motion.div>
        <motion.div className="snow-2" style={{ x: snow2X, y: snow2Y }}></motion.div>
        <motion.div className="snow-1" style={{ x: snow1X, y: snow1Y }}></motion.div>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col">
        {!isAuthenticated ? (
          <Login onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <MusicPlayer />
            
            <header className="min-h-screen flex flex-col items-center justify-center text-center px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              >
                <img
                  src="/sheila.png"
                  alt="Sheila"
                  className="w-64 md:w-80 lg:w-96 mx-auto drop-shadow-[0_0_40px_rgba(168,85,247,0.6)]"
                  style={{ imageRendering: 'pixelated' }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="text-gray-400 font-sans tracking-[0.5em] uppercase text-sm animate-pulse mt-12"
              >
                Desliza hacia abajo
              </motion.p>
            </header>

            <Letter />
            
            <FinalQuestion />

            <footer className="text-center py-12 text-gray-400 font-pixel text-sm mt-[10vh] relative z-20">
              <p>END OF TRANSMISSION</p>
            </footer>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
