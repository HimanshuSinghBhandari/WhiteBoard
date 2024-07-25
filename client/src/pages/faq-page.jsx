import {motion} from "framer-motion"
import FAQ from "../components/Navbar/faq";
const FAQPage = () => {
    return (
      <div className="min-h-screen bg-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-extrabold text-zinc-300 text-center md:mt-8 mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FAQ />
          </motion.div>
        </div>
      </div>
    );
  };

  export default FAQPage