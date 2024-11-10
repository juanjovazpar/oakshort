import { motion } from 'framer-motion';

interface FadeInProps {
  children: any;
}

const FadeIn: React.FC<FadeInProps> = (props: any) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {props.children}
  </motion.div>
);

export default FadeIn;
