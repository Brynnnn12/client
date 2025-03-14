import React from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const Artikel = () => {
  return (
    <Motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="pt-24 mb-20 bg-white"
    >
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight"
          >
            <span>Temukan</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-green-500 lg:inline">
              Artikel Menarik
            </span>{" "}
            <span>Setiap Hari</span>
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24"
          >
            Baca berbagai artikel informatif dan inspiratif yang dapat menambah
            wawasan serta membantu Anda menemukan ide-ide baru.
          </Motion.p>
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-4 space-x-0 md:space-x-2 md:mb-8"
          >
            <Link
              to="/articles"
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-blue-500 rounded-2xl sm:w-auto sm:mb-0"
            >
              Baca Sekarang
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0"
            >
              Lihat Kategori
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </Link>
          </Motion.div>
        </div>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full mx-auto mt-20 text-center md:w-10/12"
        >
          <div className="relative z-0 w-full mt-8">
            <div className="relative overflow-hidden shadow-2xl">
              <div className="flex items-center flex-none px-4 bg-blue-500 rounded-b-none h-11 rounded-xl">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <img
                src="https://mrwallpaper.com/images/high/antique-newspaper-with-eloquent-script-writing-rocs9n74eso8k2p7.webp"
                alt="Artikel"
                className="w-full"
              />
            </div>
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
};

export default Artikel;
