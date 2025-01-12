import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Menu, X, Anchor, Building2, PaintBucket, Factory, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const services = [
    { icon: Anchor, title: 'Oil Platforms', description: 'Offshore drilling platforms and marine structures' },
    { icon: Building2, title: 'Rig Construction', description: 'Industrial-grade drilling equipment and facilities' },
    { icon: Building2, title: 'Over-water Bridges', description: 'Complex bridge engineering and construction' },
    { icon: PaintBucket, title: 'Interior Design', description: 'Modern industrial and commercial spaces' },
    { icon: Factory, title: 'Art Installations', description: 'Large-scale architectural art pieces' }
  ];

  const projects = [
    {
      title: 'Dubai Marine Terminal',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=80',
      category: 'Marine Engineering'
    },
    {
      title: 'Singapore Sky Bridge',
      image: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?auto=format&fit=crop&w=800&q=80',
      category: 'Infrastructure'
    },
    {
      title: 'Arctic Research Station',
      image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
      category: 'Industrial'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 backdrop-blur-md bg-black/30 border-b border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-white text-4xl font-bold">HUNTER CONTRACTORS</a>
            <div className="hidden md:flex space-x-8">
              {['Services', 'Projects', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white hover:text-gray-300 transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {['Services', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen">
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-black/50 z-10"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=2000&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
        </motion.div>
        <div className="relative z-20 h-full flex items-center justify-center text-white">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Building Tomorrow's World
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto"
            >
              Global leaders in industrial and marine engineering excellence
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.2
              });
              
              return (
                <motion.div
                  key={service.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/10 transition-all duration-300 shadow-xl"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <service.icon className="w-12 h-12 text-blue-400 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const [ref, inView] = useInView({
                triggerOnce: true,
                threshold: 0.2
              });

              return (
                <motion.div
                  key={project.title}
                  ref={ref}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/5 border border-white/10"
                >
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-[400px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-0 left-0 p-8">
                      <motion.h3 
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-bold text-white mb-2"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-blue-400"
                      >
                        {project.category}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '25+', label: 'Years Experience' },
              { number: '500+', label: 'Projects Completed' },
              { number: '50+', label: 'Countries Served' },
              { number: '1000+', label: 'Team Members' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-white"
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center text-gray-400">
                  <Phone className="w-6 h-6 mr-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="w-6 h-6 mr-4" />
                  <span>contact@huntercontractors.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-6 h-6 mr-4" />
                  <span>8250 Lankershim Blvd #10, North Hollywood, CA 91605</span>
                </div>
              </div>
            </div>
            <form className="space-y-6 backdrop-blur-lg bg-white/5 p-8 rounded-xl border border-white/10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-white/5 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                ></textarea>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center"
              >
                Send Message
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="ml-2 w-5 h-5" />
                </motion.div>
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hunter Contractors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;