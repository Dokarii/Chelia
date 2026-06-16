import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Componente para el bloque desplegable
function DetailsBlock({ title, content, sticker, stickerPosition, initialX }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 50, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-center px-4 md:px-12"
      style={{ maxWidth: '90%' }}
    >
      {/* Sticker decorativo */}
      <div className="relative">
        {sticker && (
          <div
            className="absolute z-20 text-5xl md:text-6xl pointer-events-none"
            style={{
              filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))',
              ...(stickerPosition === 'top-right'
                ? { top: 0, right: 0, transform: 'translate(33%, -33%)' }
                : { top: 0, left: 0, transform: 'translate(-33%, -33%)' })
            }}
          >
            {sticker}
          </div>
        )}

        {/* Cabecera clickeable */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center gap-4 text-left"
          style={{
            background: open
              ? 'linear-gradient(135deg, #f3eeff 0%, #fce8f6 100%)'
              : 'white',
            border: '4px solid black',
            borderBottom: open ? '2px solid rgba(139,115,168,0.3)' : '4px solid black',
            borderRadius: open ? '24px 24px 0 0' : '24px',
            padding: '24px 32px',
            cursor: 'pointer',
            transition: 'background 0.3s, border-radius 0.35s, border-bottom 0.1s, box-shadow 0.3s',
            boxShadow: open
              ? '8px 8px 0 0 rgba(107,33,168,0.35)'
              : '12px 12px 0 0 rgba(107,33,168,0.5)',
          }}
        >
          {/* Ícono +/- */}
          <span
            style={{
              flexShrink: 0,
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b73a8, #d386bd)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              lineHeight: 1,
              boxShadow: '0 0 12px rgba(211,134,189,0.6)',
              userSelect: 'none',
              fontFamily: 'monospace',
              transition: 'transform 0.3s',
              transform: open ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {open ? '−' : '+'}
          </span>

          <span
            className="font-pixel tracking-wide text-black"
            style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', lineHeight: 1.4 }}
          >
            {title}
          </span>
        </button>

        {/* Panel desplegable — animado con max-height CSS (siempre funciona) */}
        <div
          style={{
            maxHeight: open ? '2000px' : '0px',
            overflow: 'hidden',
            transition: open
              ? 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease'
              : 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
            opacity: open ? 1 : 0,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #f3eeff 0%, #fce8f6 100%)',
              border: '4px solid black',
              borderTop: 'none',
              borderRadius: '0 0 24px 24px',
              padding: '28px 32px 32px 32px',
              boxShadow: '12px 12px 0 0 rgba(107,33,168,0.5)',
            }}
          >
            <p
              className="font-pixel tracking-wide text-black"
              style={{ fontSize: 'clamp(16px, 2.2vw, 26px)', lineHeight: 1.8, margin: 0 }}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Parsea bloques de tipo :::details[título] ... :::
function parseBlocks(rawBlocks) {
  const result = [];
  
  rawBlocks.forEach(block => {
    const detailsRegex = /^:::details\[(.+?)\]\s*([\s\S]*?)\s*^:::$/m;
    const match = block.match(detailsRegex);
    
    if (match) {
      const title = match[1];
      const content = match[2].trim();
      result.push({ type: 'details', title, content });
    } else {
      result.push({ type: 'text', content: block });
    }
  });
  
  return result;
}

export default function Letter() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch('/Carta.md')
      .then(res => res.text())
      .then(text => {
        const rawBlocks = text.split(/\n\s*\n/).filter(p => p.trim() !== '');
        setBlocks(parseBlocks(rawBlocks));
      })
      .catch(err => console.error("Could not load Carta.md", err));
  }, []);

  // Determine where to place the photo (e.g. roughly halfway through the letter)
  const photoIndex = Math.floor(blocks.length / 2);

  const stickers = ['🍓', '✨', '💖', '🪶', '💎', '🌸'];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col relative z-20 pt-32 pb-0 space-y-[40vh] px-4">
      {blocks.map((block, index) => {
        const alignClass = alignments[index % alignments.length];
        const isLeft = alignClass.includes("self-start");
        const isRight = alignClass.includes("self-end");
        const initialX = isLeft ? -100 : isRight ? 100 : 0;
        const sticker = stickers[index % stickers.length];
        const stickerPosition = isLeft ? "top-right" : "top-left";

        return (
          <div key={index} className="w-full flex flex-col space-y-[30vh]">
            {block.type === 'details' ? (
              <DetailsBlock
                title={block.title}
                content={block.content}
                sticker={sticker}
                stickerPosition={stickerPosition}
                initialX={initialX}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, x: initialX, y: 50, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`w-full ${alignClass} perspective-1000`}
              >
                <TextCard3D sticker={sticker} stickerPosition={stickerPosition}>
                  <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-[1.8] text-black font-pixel tracking-wide">
                    {block.content}
                  </p>
                </TextCard3D>
              </motion.div>
            )}

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
