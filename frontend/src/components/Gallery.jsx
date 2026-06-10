import { motion } from 'framer-motion';
import Card3D from './Card3D';

const images = [
  "/Media/IMG_1936.JPEG"
];

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="font-pixel text-3xl md:text-5xl text-purple-400 mb-4">MEMORIAS</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <Card3D src={src} alt={`Memoria ${index + 1}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
