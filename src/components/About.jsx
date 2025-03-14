import React, { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Konten Kiri */}
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl dark:text-neutral-200">
              Fully customizable rules to match your unique needs
            </h2>

            {/* Tab Navigation */}
            <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs">
              {[
                {
                  id: 1,
                  title: "Advanced tools",
                  desc: "Use Preline thoroughly thought and automated libraries to manage your businesses.",
                  icon: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z",
                },
                {
                  id: 2,
                  title: "Smart dashboards",
                  desc: "Quickly Preline sample components, copy-paste codes, and start right off.",
                  icon: "m12 14 4-4",
                },
                {
                  id: 3,
                  title: "Powerful features",
                  desc: "Reduce time and effort on building modern look design with Preline only.",
                  icon: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`text-start hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 p-4 md:p-5 rounded-xl dark:hover:bg-neutral-700 ${
                    activeTab === tab.id
                      ? "bg-white shadow-md dark:bg-neutral-700"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="flex gap-x-6">
                    <svg
                      className="shrink-0 mt-2 size-6 md:size-7 text-gray-800 dark:text-neutral-200"
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
                      <span className="block text-lg font-semibold text-gray-800 dark:text-neutral-200">
                        {tab.title}
                      </span>
                      <span className="block mt-1 text-gray-800 dark:text-neutral-200">
                        {tab.desc}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Konten Kanan */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Tab Content */}
              {activeTab === 1 && (
                <img
                  className="shadow-xl rounded-xl"
                  src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?auto=format&fit=crop&w=560&h=720&q=80"
                  alt="Advanced tools"
                />
              )}
              {activeTab === 2 && (
                <img
                  className="shadow-xl rounded-xl"
                  src="https://images.unsplash.com/photo-1665686306574-1ace09918530?auto=format&fit=crop&w=560&h=720&q=80"
                  alt="Smart dashboards"
                />
              )}
              {activeTab === 3 && (
                <img
                  className="shadow-xl rounded-xl"
                  src="https://images.unsplash.com/photo-1598929213452-52d72f63e307?auto=format&fit=crop&w=560&h=720&q=80"
                  alt="Powerful features"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
