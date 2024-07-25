import { IoMdCheckmark } from "react-icons/io";
import { motion } from "framer-motion";

const PricingCard = ({
  title,
  price,
  pricePerMonth,
  buttonText,
  featured = false,
  features,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className={`shadow-xl border-2 rounded-2xl p-8 ${
        featured
          ? "border-2 rounded-2xl p-8 bg-zinc-900 text-white"
          : "border-gray-700 bg-zinc-300"
      }`}
    >
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
          className="font-bold text-purple-500"
        >
          {title}
        </motion.div>
        {featured && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-2 w-fit p-0.5 px-3 text-xs rounded-xl border-slate-300/20 bg-gradient-to-r from-pink-500 via-lime-600 to-sky-400 text-transparent bg-clip-text font-bold tracking-tighter"
          >
            Most Popular
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="py-8"
      >
        <span className="font-extrabold text-5xl">{price}</span>
        <span className="font-semibold text-gray-600">{pricePerMonth}</span>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mb-8 py-1.5 w-full rounded-lg cursor-pointer ${
          featured
            ? "text-black font-medium bg-white"
            : "text-white bg-black"
        }`}
      >
        {buttonText}
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <IoMdCheckmark className="inline mr-2" /> {feature}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default PricingCard;