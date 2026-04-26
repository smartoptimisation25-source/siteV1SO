import { motion } from 'framer-motion'

const VARIANTS = {
  up:     { hidden: { opacity: 0, y: 40 },           show: { opacity: 1, y: 0 } },
  down:   { hidden: { opacity: 0, y: -30 },          show: { opacity: 1, y: 0 } },
  left:   { hidden: { opacity: 0, x: -50 },          show: { opacity: 1, x: 0 } },
  right:  { hidden: { opacity: 0, x: 50 },           show: { opacity: 1, x: 0 } },
  scale:  { hidden: { opacity: 0, scale: 0.88 },     show: { opacity: 1, scale: 1 } },
  fade:   { hidden: { opacity: 0 },                  show: { opacity: 1 } },
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.55,
  once = true,
  amount = 0.15,
  style,
  className,
}) {
  const variant = VARIANTS[direction] || VARIANTS.up
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variant}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollRevealGroup({ children, stagger = 0.12, direction = 'up', duration = 0.5, once = true, style }) {
  const variant = VARIANTS[direction] || VARIANTS.up
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.1 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      style={style}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={variant} transition={{ duration, ease: [0.4, 0, 0.2, 1] }}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={variant} transition={{ duration, ease: [0.4, 0, 0.2, 1] }}>{children}</motion.div>
      }
    </motion.div>
  )
}
