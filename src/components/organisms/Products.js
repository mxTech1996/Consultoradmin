// components/ProductGrid.js
import { dataSite } from '@/data';
import { useCart } from 'ecommerce-mxtech';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LiaGavelSolid } from 'react-icons/lia';

// La estructura de productos que proporcionaste
const products = dataSite.products;

const ProductGrid = () => {
  const { handleAddOrRemoveProduct, validateProductInCart } = useCart();
  // Variante para el contenedor de la cuadrícula, que anima a sus hijos en secuencia
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Variante para cada tarjeta de producto
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id='products' className='bg-gray-50 py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-900'>
            Our Digital Products
          </h2>
          <p className='mt-2 text-gray-600'>
            Essential legal solutions, available instantly.
          </p>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={gridContainerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product, index) => {
            // Lógica para simular el descuento para el estilo visual
            const discountPercentage = 10 + (index % 3) * 2; // e.g., 10%, 12%, 14%
            const originalPrice =
              parseFloat(product.price) / (1 - discountPercentage / 100);

            const isInCart = validateProductInCart(product.id);

            const handleAddToCart = () => {
              handleAddOrRemoveProduct(product.id);
            };
            return (
              <motion.div
                key={product.id}
                className='bg-white rounded-lg shadow-sm overflow-hidden flex flex-col group'
                variants={cardVariants}
              >
                <div className='relative'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    objectFit='cover'
                    className='transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full'>
                    Save {discountPercentage}%
                  </div>
                </div>

                <div className='p-6 flex flex-col flex-grow'>
                  <div className='flex items-center space-x-2 text-xs text-gray-500 mb-2'>
                    <LiaGavelSolid className='text-red-500' />
                    <span>Legal & Business Solutions</span>
                  </div>
                  <h3 className='text-lg font-bold text-gray-900'>
                    {product.name}
                  </h3>
                  <p className='text-sm text-gray-600 mt-1 flex-grow'>
                    {product.description}
                  </p>

                  <div className='flex items-baseline space-x-2 mt-4'>
                    <p className='text-xl font-bold text-gray-900'>
                      ${parseFloat(product.price).toFixed(2)} MXN
                    </p>
                    <p className='text-sm text-gray-400 line-through'>
                      ${originalPrice.toFixed(2)} MXN
                    </p>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className='mt-6 w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors'
                    style={{
                      backgroundColor: isInCart ? '#dc2626' : '#9AE376FF',
                      color: isInCart ? '#f9fafb' : '#ffffff',
                    }}
                  >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
