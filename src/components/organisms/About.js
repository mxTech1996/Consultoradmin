// components/AboutLegalFirm.js

import { dataSite } from '@/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { LiaGavelSolid } from 'react-icons/lia'; // Un icono de mazo, muy apropiado

// Datos para la lista, para mantener el código JSX limpio
const principles = [
  { number: '01.', text: 'Diligence & Reliability' },
  { number: '02.', text: 'Dedication & Client Care' },
  { number: '03.', text: 'Excellence & Professionalism' },
  { number: '04.', text: 'Innovation & Strategy' },
];

const AboutLegalFirm = () => {
  // Variante para el contenedor de la derecha, que anima a sus hijos en secuencia
  const rightColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Variante para cada elemento que aparece desde abajo
  const fadeUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id='about' className='bg-white py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start'>
        {/* --- Columna Izquierda (Imagen) --- */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
            <span className='text-red-600'>
              <LiaGavelSolid />
            </span>
            <span>About us</span>
          </div>
          <div className='relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-lg'>
            {/* REEMPLAZA ESTA IMAGEN */}
            <Image
              src={dataSite.image_hero2}
              alt='Professional legal team meeting'
              layout='fill'
              objectFit='cover'
            />
          </div>
        </motion.div>

        {/* --- Columna Derecha (Contenido) --- */}
        <motion.div
          variants={rightColumnVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 leading-tight'
            variants={fadeUp}
          >
            We are committed to providing strategic, professional, and dedicated
            legal services when you need them most.
          </motion.h2>
          <motion.p className='mt-4 text-gray-600' variants={fadeUp}>
            With a focus on diligence, efficiency, and advanced legal strategy,
            we bridge the gap between complex challenges and clear resolutions.
            Whether it&#39;s a critical corporate negotiation, a personal legal
            matter, or complex litigation.
          </motion.p>

          <div className='mt-10 space-y-2'>
            {principles.map((item, index) => (
              <motion.div
                key={index}
                className='flex items-center border-b border-gray-200 py-4'
                variants={fadeUp}
              >
                <span className='text-gray-400 font-semibold text-lg mr-6'>
                  {item.number}
                </span>
                <span className='text-gray-800 font-semibold text-lg'>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div className='flex justify-end mt-8' variants={fadeUp}>
            <a
              href='#contact'
              className='inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 ease-in-out'
            >
              Schedule a Consultation
              <FaArrowRight className='ml-3' size={12} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutLegalFirm;
