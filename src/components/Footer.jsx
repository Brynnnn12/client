import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="mx-auto  bg-gray-800  w-full  px-4 sm:px-6 lg:px-8"
      aria-labelledby="footer-heading"
    >
      <div className="items-centers grid grid-cols-1 justify-between gap-4 border-t border-gray-100 py-6 md:grid-cols-2">
        <p className="text-sm/6 text-white max-md:text-center">
          © 2025 . All rights reserved.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm/6 text-gray-500 md:justify-end">
          <Link
            to="https://learnwithsumit.com/privacy-policy"
            className="hover:text-gray-900"
          >
            Privacy policy
          </Link>
          <div className="h-4 w-px bg-gray-200"></div>
          <Link
            to="https://learnwithsumit.com/terms"
            className="hover:text-gray-900"
          >
            Terms
          </Link>
          <div className="h-4 w-px bg-gray-200"></div>
          <Link
            to="https://facebook.com/learnwithsumit"
            className="hover:text-gray-900"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            to="https://twitter.com/learnwithsumit"
            className="hover:text-gray-900"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            to="https://instagram.com/learnwithsumit"
            className="hover:text-gray-900"
          >
            <Instagram className="h-5 w-5" />
          </Link>
          <Link
            to="https://linkedin.com/company/learnwithsumit"
            className="hover:text-gray-900"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
