import { motion } from 'framer-motion';

interface FadeInOutProps {
  children: any;
  isVisible: boolean;
}

const FadeInOut: React.FC<FadeInOutProps> = ({ children, isVisible }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    style={{ display: isVisible ? 'block' : 'none' }}
  >
    {children}
  </motion.div>
);

export default FadeInOut;
