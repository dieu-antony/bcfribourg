import { motion } from "framer-motion";

export const FadeUpOnScroll: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // starts slightly below and invisible
      whileInView={{ opacity: 1, y: 0 }} // slides up and becomes visible
      transition={{ duration: 1, ease: "easeOut" }} // smooth transition
      viewport={{ amount: 0.5 }} // triggers when 50% of the div is visible, only once
    >
      {children}
    </motion.div>
  );
};
