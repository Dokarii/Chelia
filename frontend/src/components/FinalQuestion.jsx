import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FinalQuestion() {
  const [attempts, setAttempts] = useState(0);
  
  // States for button positions
  const [posYes, setPosYes] = useState({ x: 0, y: 0 });
  const [posNo, setPosNo] = useState({ x: 0, y: 0 });

  const handleHover = (buttonType) => {
    if (attempts >= 7) return;
    
    setAttempts(prev => prev + 1);
    
    // Generar un salto aleatorio que aleje el botón del cursor
    const jumpX = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150);
    const jumpY = (Math.random() > 0.5 ? 1 : -1) * (100 + Math.random() * 150);
    
    if (buttonType === 'yes') {
      setPosYes({ x: jumpX, y: jumpY });
    } else {
      setPosNo({ x: jumpX, y: jumpY });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-28 pb-32 px-4 flex flex-col items-center justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border-4 border-black p-8 md:p-16 shadow-[12px_12px_0_0_rgba(67,33,76,1)] rounded-3xl text-center w-full"
      >
        <h2 className="text-3xl md:text-5xl font-pixel text-black mb-16 leading-relaxed">
          ¿Me vas a corresponder o nelson?
        </h2>
        
        {attempts < 7 ? (
          <div className="flex justify-center gap-12 relative h-32 items-center">
            <motion.button
              animate={{ x: posYes.x, y: posYes.y }}
              onMouseEnter={() => handleHover('yes')}
              onClick={() => handleHover('yes')}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="bg-[#4CC9F0] text-black border-4 border-black px-10 py-4 text-2xl md:text-3xl font-pixel rounded-xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] z-30 touch-none"
              style={{ position: 'relative' }}
            >
              Seh
            </motion.button>
            
            <motion.button
              animate={{ x: posNo.x, y: posNo.y }}
              onMouseEnter={() => handleHover('no')}
              onClick={() => handleHover('no')}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="bg-[#F02A4A] text-white border-4 border-black px-10 py-4 text-2xl md:text-3xl font-pixel rounded-xl shadow-[6px_6px_0_0_rgba(0,0,0,1)] z-30 touch-none"
              style={{ position: 'relative' }}
            >
              Nel
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="text-2xl md:text-4xl text-[#F02A4A] font-pixel mt-8 p-4 border-4 border-dashed border-[#F02A4A] inline-block bg-red-50 rounded-lg"
          >
            Perdón, no sé programar formularios xd
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
