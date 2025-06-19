// components/OurProcess.js

import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa'; // Usando el mismo icono de la imagen

// Array con los datos de cada paso para mantener el código limpio y organizado
const processSteps = [
  {
    number: '01.',
    title: 'Initial Consultation',
    description:
      'Dial (316) 555-0116 or contact us online. Our trained team will assess your situation, gather details, and schedule your confidential legal consultation.',
  },
  {
    number: '02.',
    title: 'Case Assessment & Strategy',
    description:
      'Our legal team is deployed immediately. With strategically developed frameworks and data-driven insights, we build a tailored strategy for your case.',
  },
  {
    number: '03.',
    title: 'Action & Implementation',
    description:
      'If further legal action is required, we proceed with precision, whether it involves negotiation, drafting documents, or filing motions while keeping you informed.',
  },
  {
    number: '04.',
    title: 'Ongoing Communication',
    description:
      'We ensure a seamless flow of information, providing regular updates and reports to you and your team, guiding you on the next steps.',
  },
  {
    number: '05.',
    title: 'Review & Adaptation',
    description:
      'We provide continuous oversight and adapt our strategy as the case evolves, ensuring the approach remains effective for a successful outcome.',
  },
  {
    number: '06.',
    title: 'Resolution & Finalization',
    description:
      'We ensure a smooth handover at case completion, offering post-resolution guidance and ensuring all legal matters are formally concluded.',
  },
];

const OurProcess = () => {
  // Variante para el contenedor de la cuadrícula, que anima a sus hijos en secuencia
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Retraso entre la animación de cada hijo
      },
    },
  };

  // Variante para cada uno de los elementos de la cuadrícula
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className='bg-black text-white py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-start space-x-3'>
            <span className='text-red-500 mt-1'>
              <FaPlus size={12} />
            </span>
            <p className='text-gray-300'>
              When a legal challenge arises, every second counts. Here’s how our
              Consultancy ensures you get the help you need—fast and
              efficiently.
            </p>
          </div>
        </motion.div>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'
          variants={gridContainerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
        >
          {processSteps.map((step) => (
            <motion.div key={step.number} variants={itemVariants}>
              <h2 className='text-6xl font-bold text-red-500/30 mb-4'>
                {step.number}
              </h2>
              <hr className='border-gray-800' />
              <h3 className='text-2xl font-bold mt-6'>{step.title}</h3>
              <p className='text-gray-400 mt-2'>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurProcess;
