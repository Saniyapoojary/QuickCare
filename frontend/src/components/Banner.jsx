import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="my-24 px-6 md:px-10">

      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-700 via-cyan-600 to-teal-500 shadow-2xl">

        {/* Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 right-0 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl"></div>

        <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between px-10 md:px-16 py-14">

          {/* Left Side */}
          <div className="lg:w-1/2 text-center lg:text-left">

            <p className="uppercase tracking-[5px] text-cyan-100 font-semibold">
              QUICKCARE
            </p>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mt-4">
              Your Health
              <br />
              Begins Here.
            </h2>

            <p className="text-blue-100 mt-6 text-lg leading-8 max-w-xl">
              Join thousands of patients who trust QuickCare for
              fast appointment booking, experienced doctors,
              and a seamless healthcare experience.
            </p>

            <div className="flex flex-wrap gap-5 mt-10 justify-center lg:justify-start">

              <button
                onClick={() => {
                  navigate("/login");
                  scrollTo(0, 0);
                }}
                className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300"
              >
                Get Started
              </button>

              <button
                onClick={() => {
                  navigate("/doctors");
                  scrollTo(0, 0);
                }}
                className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-700 transition duration-300"
              >
                Explore Doctors
              </button>

            </div>

            <div className="flex gap-10 mt-12 justify-center lg:justify-start">

              <div>
                <h3 className="text-3xl font-bold text-white">500+</h3>
                <p className="text-blue-100">Doctors</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">20K+</h3>
                <p className="text-blue-100">Patients</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">4.9★</h3>
                <p className="text-blue-100">Rating</p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="lg:w-1/2 flex justify-center relative mb-10 lg:mb-0">

            <div className="absolute w-72 h-72 bg-cyan-300/20 blur-3xl rounded-full"></div>

            <img
              src={assets.appointment_img}
              alt="Doctor"
              className="relative w-[380px] lg:w-[470px] drop-shadow-2xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Banner;