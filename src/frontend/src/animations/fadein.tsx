import { AnimatePresence, motion } from 'framer-motion';

interface IFadeInProps {
  children: any;
  animationKey?: any;
  duration?: number;
}

const FadeIn: React.FC<IFadeInProps> = ({
  children,
  animationKey,
  duration = 0.3,
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={animationKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default FadeIn;
