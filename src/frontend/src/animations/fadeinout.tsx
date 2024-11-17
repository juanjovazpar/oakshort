import { AnimatePresence, motion } from 'framer-motion';

interface FadeInOutProps {
  children: any;
  isVisible: boolean;
  key?: any;
  duration?: number;
}

const FadeInOut: React.FC<FadeInOutProps> = ({
  children,
  isVisible,
  key,
  duration = 0.3,
}) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <motion.div
        key={key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
        style={{ display: 'block' }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default FadeInOut;
