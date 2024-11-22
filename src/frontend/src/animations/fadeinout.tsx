import { AnimatePresence, motion } from 'framer-motion';

interface IFadeInOutProps {
  children: any;
  isVisible: boolean;
  animationKey?: any;
  duration?: number;
}

const FadeInOut: React.FC<IFadeInOutProps> = ({
  children,
  isVisible,
  animationKey,
  duration = 0.3,
}) => (
  <AnimatePresence mode="wait">
    {isVisible && (
      <motion.div
        key={animationKey}
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
