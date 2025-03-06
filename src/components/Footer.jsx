import React from "react";

const Footer = () => {
  return (
    <section id="footer" className="">
      <div className="mt-16 pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-400">
          © {new Date().getFullYear()} Ken Samonte. All rights reserved.
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Built with React and Vite. All images and creative works on this site
          belong to Ken Samonte.
        </p>
      </div>
    </section>
  );
};

export default Footer;
