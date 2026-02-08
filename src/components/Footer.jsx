// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="text-white font-semibold text-lg">Studymitra</h3>
          <p className="mt-4 text-sm">
            Your AI-powered study companion for smarter and more focused learning.
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>Features</li>
            <li>How it Works</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Contact</h4>
          <p className="text-sm">support@studymitra.ai</p>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-12">
        © {new Date().getFullYear()} Studymitra. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
