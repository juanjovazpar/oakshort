import { AnimatePresence, motion } from 'framer-motion';

interface FadeInProps {
  children: any;
}

const FadeIn: React.FC<FadeInProps> = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default FadeIn;
