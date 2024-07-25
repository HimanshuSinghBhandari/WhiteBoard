import { motion } from "framer-motion";
import PricingCard from "./pricing";

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="mb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col items-center font-medium mt-16 mb-12 px-12 mx-auto max-w-[550px]"
        variants={itemVariants}
      >
        <motion.div
          className="border-2 w-fit p-0.5 px-3 text-sm rounded-xl border-slate-300/80 text-purple-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Boost your productivity
        </motion.div>
        <motion.div
          className="text-3xl md:text-4xl lg:text-5xl py-6 font-bold tracking-tighter text-center bg-gradient-to-b from-zinc-200/60 via-zinc-200 to-zinc-200/60 text-transparent bg-clip-text"
          variants={itemVariants}
        >
          Elevate your digital whiteboard experience
        </motion.div>
        <motion.div
          className="text-center text-zinc-300 text-lg mb-8 md:text-xl"
          variants={itemVariants}
        >
          Unlock the power of a seamless, collaborative digital whiteboard that transforms your ideas into reality. Streamline your workflow and boost productivity with our cutting-edge features.
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col lg:flex-row items-center lg:items-end justify-center pb-20 gap-8"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <PricingCard
            title="Free"
            price="$0"
            pricePerMonth="/month"
            buttonText="Get started for free"
            features={[
              "Up to 5 project members",
              "Unlimited tasks and projects",
              "2GB storage",
              "Integrations",
              "Basic support",
            ]}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PricingCard
            title="Pro"
            price="$9"
            pricePerMonth="/month"
            buttonText="Sign up now"
            featured={true}
            features={[
              "Up to 50 project members",
              "Unlimited tasks and projects",
              "50GB storage",
              "Integrations",
              "Priority support",
              "Advanced support",
              "Expert support",
            ]}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <PricingCard
            title="Business"
            price="$19"
            pricePerMonth="/month"
            buttonText="Sign up now"
            features={[
              "Up to 50 project members",
              "Unlimited tasks and projects",
              "200GB storage",
              "Integrations",
              "Dedicated account manager",
              "Custom fields",
              "Advanced analytics",
              "Export capabilities",
              "API access",
              "Advanced security features",
            ]}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Pricing;