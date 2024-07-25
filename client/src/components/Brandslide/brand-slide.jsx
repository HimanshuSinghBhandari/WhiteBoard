import React from 'react';
import logo_acme from '../../assets/logo-acme.png';
import logo_apex from '../../assets/logo-apex.png';
import logo_celestial from '../../assets/logo-celestial.png';
import logo_echo from '../../assets/logo-echo.png';
import logo_pulse from '../../assets/logo-pulse.png';
import logo_quantum from '../../assets/logo-quantum.png';
import { motion } from 'framer-motion';

const BrandSlide = () => {
  const logos = [
    { src: logo_acme, alt: 'logo_acme' },
    { src: logo_apex, alt: 'logo_apex' },
    { src: logo_celestial, alt: 'logo_celestial' },
    { src: logo_echo, alt: 'logo_echo' },
    { src: logo_pulse, alt: 'logo_pulse' },
    { src: logo_quantum, alt: 'logo_quantum' },
  ];

  return (
    <div className="pt-8 bg-zinc-800 px-4 md:p-12 flex justify-center">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] w-[1200px]">
        <motion.div
          className="flex gap-14 flex-none items-center justify-center pr-14"
          animate={{
            translateX: '-50%',
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto filter invert brightness-0 saturate-0"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BrandSlide;
