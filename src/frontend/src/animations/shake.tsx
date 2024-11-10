import { motion } from 'framer-motion';

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

interface ShakeProps {
  children: any;
  shaking: boolean;
}

const Shake: React.FC<ShakeProps> = ({ children, shaking }) => (
  <motion.div
    initial="initial"
    animate={shaking ? 'animate' : 'initial'}
    variants={shakeAnimation}
  >
    {children}
  </motion.div>
);

export default Shake;
