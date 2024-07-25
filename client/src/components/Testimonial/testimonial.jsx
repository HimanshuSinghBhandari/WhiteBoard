import { motion } from "framer-motion";
import testimonialData from "./testimonialData";

const Testimonials = () => {
  return (
    <div className="pt-12">
      <div className="flex flex-col items-center px-28 pb-16">
        <div className="text-4xl lg:text-5xl pt-6 font-bold tracking-tighter text-center bg-gradient-to-b from-zinc-200/60 via-zinc-200 to-zinc-200/60 text-transparent bg-clip-text">
          What our users say
        </div>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_top,transparent,black,transparent)] h-[750px] mb-12 md:mb-28 lg:mb-36">
        <motion.div
          animate={{
            translateY: "-50%",
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center justify-center overflow-x-hidden pb-4 gap-4 ">
              {[0, 1, 2].map((columnIndex) => (
                <div key={columnIndex} className={columnIndex === 1 ? "block" : "hidden md:block"}>
                  {testimonialData.slice(columnIndex * 3, (columnIndex + 1) * 3).map((testimonial, i) => (
                    <div key={i} className={`shadow-xl w-[310px] rounded-2xl p-8 ${i === 1 ? "my-6" : ""} bg-zinc-600`}>
                      <div className="font-medium pb-4 text-white">{testimonial.content}</div>
                      <div className="flex items-center gap-3">
                        <img src={testimonial.avatar} alt="Avatar" className="h-12 w-12" />
                        <div>
                          <div className="font-semibold text-white">{testimonial.name}</div>
                          <div className="text-white">{testimonial.username}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;