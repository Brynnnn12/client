import React from "react";
import { PuffLoader } from "react-spinners";
import { motion as Motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <PuffLoader color="#4F46E5" size={80} />
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-lg font-semibold text-gray-700"
        >
          Loading...
        </Motion.p>
      </Motion.div>
    </div>
  );
};

export default Loading;
