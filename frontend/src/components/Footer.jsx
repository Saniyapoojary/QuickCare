import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-28 bg-gradient-to-br from-slate-50 to-cyan-50 border-t">

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">

        <div className="grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Brand */}
          <div>

            <img
              src={assets.logo}
              alt="QuickCare"
              className="w-44"
            />

            <p className="mt-6 text-gray-600 leading-7">
              QuickCare is your trusted healthcare companion,
              making doctor appointments faster, easier,
              and stress-free.
            </p>

            <div className="flex gap-4 mt-6">

              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition">
                F
              </div>

              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition">
                X
              </div>

              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition">
                I
              </div>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Company
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li className="hover:text-blue-600 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-blue-600 cursor-pointer transition">
                About
              </li>

              <li className="hover:text-blue-600 cursor-pointer transition">
                Doctors
              </li>

              <li className="hover:text-blue-600 cursor-pointer transition">
                Contact
              </li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Services
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>Book Appointment</li>

              <li>Health Checkups</li>

              <li>Emergency Care</li>

              <li>Online Consultation</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-600">

              <li>📞 +91 90000 90000</li>

              <li>✉ support@quickcare.in</li>

              <li>📍 Mangalore, Karnataka</li>

            </ul>

          </div>

        </div>

        <hr className="my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500">

          <p>
            © 2026 QuickCare. All Rights Reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Your Health, Our Priority.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;