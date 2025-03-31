import React, { useState } from "react";
import { motion as Motion, AnimatePresence, useInView } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Data untuk tab
  const tabs = [
    {
      id: 1,
      title: "Berita Terkini",
      desc: "Dapatkan informasi terbaru dan terpercaya dari berbagai sumber berita terkemuka.",
      icon: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z",
      image:
        "https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?auto=format&fit=crop&w=560&h=720&q=80",
    },
    {
      id: 2,
      title: "Analisis Berita",
      desc: "Telusuri lebih dalam tentang berita dengan analisis mendalam dan perspektif ahli.",
      icon: "m12 14 4-4",
      image:
        "https://images.unsplash.com/photo-1665686306574-1ace09918530?auto=format&fit=crop&w=560&h=720&q=80",
    },
    {
      id: 3,
      title: "Fakta atau Hoaks?",
      desc: "Periksa kebenaran berita dengan sumber yang dapat dipercaya untuk menghindari informasi hoaks.",
      icon: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=560&h=720&q=80",
    },
  ];

  // Hook untuk mendeteksi kapan elemen masuk ke viewport
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true }); // `once: true` agar animasi hanya muncul sekali
  return (
    <Motion.div
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"
    >
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Konten Kiri */}
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <Motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-2xl text-gray-800 font-bold sm:text-3xl"
            >
              Tentang Kami
            </Motion.h2>

            {/* Tab Navigation */}
            <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs">
              {tabs.map((tab) => (
                <Motion.button
                  key={tab.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + tab.id * 0.1, duration: 1 }}
                  className={`text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl ${
                    activeTab === tab.id ? "bg-gray-200 shadow-md" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="flex gap-x-6">
                    <svg
                      className="shrink-0 mt-2 size-6 md:size-7 text-gray-800"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={tab.icon} />
                    </svg>
                    <span className="grow">
                      <span className="block text-lg font-semibold text-gray-800">
                        {tab.title}
                      </span>
                      <span className="block mt-1 text-gray-800">
                        {tab.desc}
                      </span>
                    </span>
                  </span>
                </Motion.button>
              ))}
            </nav>
          </div>

          {/* Konten Kanan */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Tab Content dengan AnimatePresence */}
              <AnimatePresence mode="wait">
                <Motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    className="shadow-xl rounded-xl"
                    src={tabs.find((tab) => tab.id === activeTab)?.image}
                    alt={tabs.find((tab) => tab.id === activeTab)?.title}
                  />
                </Motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Motion.div>
  );
};

export default About;
