import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Logo({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const sizes = {
    sm: 'text-xl',
    default: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <Link to="/" className="flex items-center gap-2">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-card">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
                <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.45-2.344-2.5" />
                <path d="M8 14v.5" />
                <path d="M16 14v.5" />
                <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
              </svg>
            </div>
          </div>
          <span className={`font-bold ${sizes[size]} text-gradient`}>PAXI</span>
        </div>
      </motion.div>
    </Link>
  );
}
