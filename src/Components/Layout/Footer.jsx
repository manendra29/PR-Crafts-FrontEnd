// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-gray-300 py-10">
//       <div className="container mx-auto px-4">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-xl font-medium text-white mb-4">Handmade Crafts</h3>
//             <p className="text-gray-400 mb-4 max-w-xs">
//               Crafting with love since 2010.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-xl font-medium text-white mb-4">Quick Links</h3>
//             <div className="grid grid-cols-2 gap-2">
//               <a href="/" className="text-gray-400 hover:text-white transition duration-300">Home</a>
//               <a href="/products" className="text-gray-400 hover:text-white transition duration-300">Products</a>
//               <a href="/about" className="text-gray-400 hover:text-white transition duration-300">About</a>
//               <a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a>
//               <a href="/privacy" className="text-gray-400 hover:text-white transition duration-300">Privacy</a>
//               <a href="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms</a>
//             </div>
//           </div>

//           {/* Contact Us */}
//           <div>
//             <h3 className="text-xl font-medium text-white mb-4">Get In Touch</h3>
//             <div className="flex items-center mb-3">
//               <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//               <a href="mailto:info@handcrafts.com" className="text-gray-400 hover:text-white">info@handcrafts.com</a>
//             </div>
//             <div className="flex items-center">
//               <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               <a href="tel:+919876543210" className="text-gray-400 hover:text-white">+91 98765 43210</a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Handmade Crafts. All rights reserved.</p>
          
//           {/* Social Media Icons */}
//           <div className="flex space-x-6">
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition duration-300">
//               <span className="sr-only">Instagram</span>
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
//               </svg>
//             </a>
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition duration-300">
//               <span className="sr-only">Facebook</span>
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
//               </svg>
//             </a>
//             <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition duration-300">
//               <span className="sr-only">YouTube</span>
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
//               </svg>
//             </a>
//             <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition duration-300">
//               <span className="sr-only">WhatsApp</span>
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;














import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  useEffect(() => {
    // For scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll(".footer-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10 overflow-hidden relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-5 w-full h-full">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-white/10 to-transparent -top-20 -right-20 blur-3xl"></div>
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-l from-white/10 to-transparent -bottom-32 -left-20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="footer-hidden">
            <h3 className="text-2xl font-medium text-white mb-6 inline-block relative">
              Handmade Crafts
              <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-white/60 transform origin-left transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-xs leading-relaxed">
              Crafting with love since 2010.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-white/60 to-transparent mb-8"></div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="footer-hidden">
            <h3 className="text-2xl font-medium text-white mb-6 inline-block relative">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-white/60 transform origin-left transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 flex items-center"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <span className="w-0 h-px bg-white mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Us */}
          <motion.div variants={itemVariants} className="footer-hidden">
            <h3 className="text-2xl font-medium text-white mb-6 inline-block relative">
              Get In Touch
              <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-white/60 transform origin-left transition-all duration-300 group-hover:w-full"></span>
            </h3>
            <motion.div
              className="flex items-center mb-4 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-gray-800">
                <svg
                  className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <a
                href="mailto:info@handcrafts.com"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                info@handcrafts.com
              </a>
            </motion.div>
            <motion.div
              className="flex items-center group"
              whileHover={{ x: 5 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center mr-4 transition-all duration-300 group-hover:bg-gray-800">
                <svg
                  className="h-5 w-5 text-gray-500 transition-all duration-300 group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <a
                href="tel:+919876543210"
                className="text-gray-400 hover:text-white transition-all duration-300"
              >
                +91 98765 43210
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Newsletter Subscription (new feature) */}
        <motion.div
          className="footer-hidden flex flex-col md:flex-row items-start gap-6 justify-between bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div>
            <h4 className="text-lg font-medium text-white mb-2">Subscribe to our newsletter</h4>
            <p className="text-gray-400 text-sm">Get the latest updates and offers</p>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              />
              <button className="bg-white text-black font-medium px-5 py-2 rounded-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-gray-500 text-sm mb-6 md:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            © 2025 Handmade Crafts. All rights reserved.
          </motion.p>

          {/* Social Media Icons */}
          <motion.div
            className="flex space-x-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {[
              {
                name: "Instagram",
                url: "https://instagram.com",
                path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
              },
              {
                name: "Facebook",
                url: "https://facebook.com",
                path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
              },
              {
                name: "YouTube",
                url: "https://youtube.com",
                path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
              },
              {
                name: "WhatsApp",
                url: "https://whatsapp.com",
                path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-800 transition duration-300"
                variants={iconVariants}
                whileHover="hover"
              >
                <span className="sr-only">{social.name}</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;