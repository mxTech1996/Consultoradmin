// components/LegalFeatures.js
'use client';
import { motion } from 'framer-motion';
// Seleccionamos iconos relevantes para un bufete jurídico
import { FiClock, FiHeadphones } from 'react-icons/fi';
import { FaUserTie, FaBalanceScale } from 'react-icons/fa';

// Array de datos para mantener el código limpio y fácil de actualizar
const featuresData = [
  {
    icon: <FiClock />,
    title: '24/7 Expert Counsel',
    description:
      'Our team is always on standby, ready to respond to critical legal inquiries anytime, day or night.',
  },
  {
    icon: <FiHeadphones />,
    title: 'Strategic & Swift Response',
    description:
      'We ensure rapid and strategic action, providing critical advice when every second counts for your case.',
  },
  {
    icon: <FaUserTie />,
    title: 'Specialized Legal Team',
    description:
      'Our attorneys deliver top-tier legal assistance with specialized knowledge and unwavering precision.',
  },
  {
    icon: <FaBalanceScale />,
    title: 'Data-Driven Strategy',
    description:
      'Equipped with state-of-the-art legal tech, we bring a modern, evidence-based approach directly to you.',
  },
];

const LegalFeatures = () => {
  // Variante para el contenedor principal que orquesta la animación de sus hijos
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Anima cada hijo con un retraso de 0.2s
      },
    },
  };

  // Variante para cada una de las tarjetas de características
  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className='bg-gray-900 text-white py-20 sm:py-24'>
      <motion.div
        className='container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center'
        variants={containerVariant}
        initial='hidden'
        whileInView='visible' // La animación se activa cuando el componente entra en la vista
        viewport={{ once: true, amount: 0.5 }} // Se anima una vez, cuando el 50% es visible
      >
        {featuresData.map((feature, index) => (
          <motion.div
            key={index}
            className='flex flex-col items-center'
            variants={itemVariant}
          >
            <div className='text-red-500 text-4xl mb-4'>{feature.icon}</div>
            <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
            <p className='text-gray-400 text-sm leading-relaxed'>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LegalFeatures;
