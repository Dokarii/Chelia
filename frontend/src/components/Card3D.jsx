import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function Card3D({ src, alt }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[3/4] sm:aspect-square md:aspect-[3/4] rounded-xl overflow-hidden shadow-2xl cursor-pointer border border-brand-700/50"
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-0 p-4"
      >
        <div className="w-full h-full rounded-lg overflow-hidden border border-purple-500/30 bg-brand-800">
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      
      {/* Glare effect */}
      <motion.div
        style={{
          opacity: useTransform(y, [-0.5, 0.5], [0, 0.5]),
          background: "linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)"
        }}
        className="absolute inset-0 pointer-events-none rounded-xl"
      />
    </motion.div>
  );
}
