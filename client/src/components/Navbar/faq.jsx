import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      className="border-b border-gray-200 py-4"
      initial={false}
      animate={{ backgroundColor: 'transparent' }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-zinc-300">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiPlus className="text-2xl text-zinc-300" />
        </motion.div>
      </button>
      <motion.div
        className="mt-2 text-zinc-400"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {answer}
      </motion.div>
    </motion.div>
  );
};

const FAQ = () => {
    const faqData = [
      {
        question: "What features does the whiteboard application offer?",
        answer: "Our whiteboard application provides a range of tools for drawing, text input, shape creation, and image uploading. You can collaborate in real-time, save your work, and export it in various formats."
      },
      {
        question: "Can I use the whiteboard collaboratively with my team?",
        answer: "Yes, our application supports real-time collaboration. Multiple users can work on the same whiteboard simultaneously, with changes syncing instantly across all connected devices."
      },
      {
        question: "Is the whiteboard application responsive on mobile devices?",
        answer: "Absolutely! We've designed the application to be fully responsive, providing a seamless experience across desktop, tablet, and mobile devices."
      },
      {
        question: "How do I save my work on the whiteboard?",
        answer: "Your work is automatically saved in real-time. You can also manually save your whiteboard as a project, export it as an image, or share a link for others to view or edit."
      },
      {
        question: "Are there keyboard shortcuts available for faster navigation?",
        answer: "Yes, we offer a variety of keyboard shortcuts to enhance your productivity. You can access a full list of shortcuts by pressing '?' while using the application."
      }
    ];
  
    return (
      <section className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </motion.div>
      </section>
    );
  };
  
  export default FAQ;