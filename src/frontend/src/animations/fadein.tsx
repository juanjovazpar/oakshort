import { motion } from 'framer-motion';

interface FadeInProps {
  children: any;
}

const FadeIn: React.FC<FadeInProps> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export default FadeIn;
