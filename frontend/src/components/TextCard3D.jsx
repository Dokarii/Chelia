import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function TextCard3D({ children, sticker, stickerPosition = "top-right" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Rotaciones ligeramente más suaves para el texto que para la foto
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Determinar la clase de posicionamiento del sticker
  const positionClass = stickerPosition === "top-right" 
    ? "top-0 right-0 translate-x-1/3 -translate-y-1/3" 
    : "top-0 left-0 -translate-x-1/3 -translate-y-1/3";

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full cursor-pointer perspective-1000"
    >
      <div
        style={{
          transform: "translateZ(30px)", // Da la sensación de que el texto sale hacia adelante
          transformStyle: "preserve-3d",
        }}
        className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0_0_rgba(107,33,168,0.5)] md:shadow-[16px_16px_0_0_rgba(0,0,0,1)] rounded-3xl relative"
      >
        {sticker && (
          <div className={`absolute ${positionClass} text-5xl md:text-6xl filter drop-shadow-[2px_2px_0_rgba(0,0,0,1)] z-20`}>
            {sticker}
          </div>
        )}
        {children}
      </div>
      
      {/* Glare effect sutil para el brillo al moverlo */}
      <motion.div
        style={{
          opacity: useTransform(y, [-0.5, 0.5], [0, 0.15]),
          background: "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)"
        }}
        className="absolute inset-0 pointer-events-none rounded-3xl"
      />
    </motion.div>
  );
}
