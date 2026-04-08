import { motion } from "framer-motion";

const GlassBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Large faded logo in center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src="/images/cropped-mms-fINAL1-WHITE.webp"
          alt="Mosi Media Solutions"
          className="w-[700px] h-auto rotate-12"
        />
      </motion.div>

      {/* Top left subtle gradient blob */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'linear-gradient(135deg, #191970, #8B0000)' }}
      />

      {/* Bottom right subtle gradient blob */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: 'linear-gradient(135deg, #8B0000, #2F2F5F)' }}
      />

      {/* Top right corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full blur-[80px]"
        style={{ background: 'linear-gradient(135deg, #2F2F5F, #191970)' }}
      />

      {/* Bottom left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute bottom-20 left-20 w-[250px] h-[250px] rounded-full blur-[60px]"
        style={{ background: 'linear-gradient(135deg, #8B0000, #191970)' }}
      />

      {/* Center left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.025 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute top-1/3 left-10 w-[200px] h-[200px] rounded-full blur-[50px]"
        style={{ background: 'linear-gradient(135deg, #191970, #8B0000)' }}
      />

      {/* Center right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.025 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute top-1/2 right-10 w-[180px] h-[180px] rounded-full blur-[40px]"
        style={{ background: 'linear-gradient(135deg, #8B0000, #2F2F5F)' }}
      />

      {/* Additional subtle logo repetitions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-1/4 left-1/4"
      >
        <img
          src="/images/cropped-mms-fINAL1-WHITE.webp"
          alt=""
          className="w-[300px] h-auto -rotate-6 opacity-50"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute top-1/3 right-1/4"
      >
        <img
          src="/images/cropped-mms-fINAL1-WHITE.webp"
          alt=""
          className="w-[250px] h-auto rotate-45 opacity-40"
        />
      </motion.div>
    </div>
  );
};

export default GlassBackground;
