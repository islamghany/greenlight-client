import React from 'react';
//import { motion, AnimatePresence } from "framer-motion";

interface ErrorProps {
  error?: string;
}

// const closed = {height:0, opacity:0};
// const open={height:"auto", opacity:1};
// const transition={duration:0.2, damping:300};
const Error: React.FC<ErrorProps> = ({ error }) => {
  if (!error) return null;
  return <p className="text-rose-500 text-xs mt-1">{error}</p>;
};
export default Error;
