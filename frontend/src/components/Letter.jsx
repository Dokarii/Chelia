import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card3D from './Card3D';
import TextCard3D from './TextCard3D';

// Definimos diferentes posiciones y alineaciones para dar dinamismo
const alignments = [
  "self-start text-justify pl-4 md:pl-8 pr-4 md:pr-24 w-[95%] md:w-[85%]",
  "self-center text-justify px-4 md:px-12 w-[98%] md:w-[90%]",
  "self-end text-justify pr-4 md:pr-8 pl-4 md:pl-24 w-[95%] md:w-[85%]",
  "self-start text-justify pl-6 md:pl-12 pr-6 md:pr-32 w-[96%] md:w-[88%]",
  "self-end text-justify pr-6 md:pr-12 pl-6 md:pl-32 w-[96%] md:w-[88%]",
];

export default function Letter() {
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    fetch('/Carta.md')
      .then(res => res.text())
      .then(text => {
        // Separamos por saltos de línea dobles
        const blocks = text.split(/\n\s*\n/).filter(p => p.trim() !== '');
        setParagraphs(blocks);
      })
      .catch(err => console.error("Could not load Carta.md", err));
  }, []);

  // Determine where to place the photo (e.g. roughly halfway through the letter)
  const photoIndex = Math.floor(paragraphs.length / 2);

  const stickers = ['🍓', '✨', '💖', '🪶', '💎', '🌸'];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col relative z-20 pt-32 pb-0 space-y-[40vh] px-4">
      {paragraphs.map((p, index) => {
        const alignClass = alignments[index % alignments.length];
        const isLeft = alignClass.includes("self-start");
        const isRight = alignClass.includes("self-end");
        
        // El texto entra desde la dirección hacia donde está alineado
        const initialX = isLeft ? -100 : isRight ? 100 : 0;
        
        const sticker = stickers[index % stickers.length];
        const stickerPosition = isLeft ? "top-right" : "top-left";

        return (
          <div key={index} className="w-full flex flex-col space-y-[30vh]">
            <motion.div 
              initial={{ opacity: 0, x: initialX, y: 50, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`w-full ${alignClass} perspective-1000`}
            >
              <TextCard3D sticker={sticker} stickerPosition={stickerPosition}>
                <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-[1.8] text-black font-pixel tracking-wide">
                  {p}
                </p>
              </TextCard3D>
            </motion.div>

            {/* Insert the photo exactly in the middle of the text */}
            {index === photoIndex && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-sm md:max-w-md mx-auto self-center perspective-1000 my-16"
              >
                <Card3D src="/Media/IMG_1936.JPEG" alt="Nuestra Memoria" />
              </motion.div>
            )}
          </div>
        );
      })}
      
    </div>
  );
}
