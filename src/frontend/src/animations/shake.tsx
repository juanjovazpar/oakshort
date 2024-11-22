import { AnimatePresence, motion } from 'framer-motion';

const shakeAnimation = {
  initial: { x: 0 },
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

interface IShakeProps {
  children: any;
  shaking: boolean;
  className?: string;
}

const Shake: React.FC<IShakeProps> = ({
  children,
  shaking,
  className = '',
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial="initial"
      animate={shaking ? 'animate' : 'initial'}
      variants={shakeAnimation}
      className={className}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export default Shake;
