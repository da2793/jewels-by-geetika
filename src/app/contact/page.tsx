"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
    title: "WhatsApp",
    description: "Chat with us directly for quick responses",
    action: "Message on WhatsApp",
    href: "https://wa.me/919999999999?text=Hi%20Geetika!%20I%20have%20a%20query%20about%20your%20jewellery.",
  },
  {
    icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    title: "Instagram",
    description: "DM us or browse our latest collection",
    action: "Follow @jewelsbygeetika",
    href: "https://www.instagram.com/jewelsbygeetika/",
  },
  {
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: "Email",
    description: "For bulk orders and collaborations",
    action: "jewelsbygeetika@gmail.com",
    href: "mailto:jewelsbygeetika@gmail.com",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi Geetika!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`);
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-16 bg-cream-50 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-4 mb-16">
        <span className="text-gold-600 uppercase tracking-[0.3em] text-xs font-light">Get In Touch</span>
        <h1 className="text-4xl md:text-6xl font-serif mt-4 mb-4 text-charcoal-800">
          Contact <span className="italic text-gold-gradient">Us</span>
        </h1>
        <p className="text-charcoal-400 max-w-lg mx-auto font-light">
          Have a question about a piece? Want to place a custom order? We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactMethods.map((method, index) => (
            <motion.a key={method.title} href={method.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -4 }} className="bg-white rounded-2xl p-8 text-center group cursor-pointer block shadow-sm hover:shadow-md transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4 text-gold-600 group-hover:bg-gold-600 group-hover:text-white transition-all duration-300">
                {method.icon}
              </div>
              <h3 className="text-charcoal-700 font-serif text-xl mb-2">{method.title}</h3>
              <p className="text-charcoal-400 text-sm mb-4 font-light">{method.description}</p>
              <span className="text-gold-600 text-sm font-medium">{method.action}</span>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-serif text-charcoal-800">
              Send Us a <span className="italic text-gold-gradient">Message</span>
            </h2>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-serif text-gold-600 mb-3">Message Sent!</h3>
              <p className="text-charcoal-400 font-light">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-6 text-gold-600 text-sm uppercase tracking-[0.15em] hover:underline">Send Another Message</button>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-12 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">Name *</label>
                  <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-cream-50 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-cream-50 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">Phone *</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-cream-50 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors" placeholder="+91 99999 99999" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">Subject</label>
                  <select id="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-cream-50 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors">
                    <option value="">Select a topic</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="custom-order">Custom Order</option>
                    <option value="bulk-order">Bulk Order</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-charcoal-500 text-xs uppercase tracking-[0.15em] mb-2">Message *</label>
                <textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-cream-50 border border-cream-400 rounded-xl px-4 py-3 text-charcoal-700 focus:outline-none focus:border-gold-400 transition-colors resize-none" placeholder="Tell us what you're looking for..." />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full py-4 bg-charcoal-800 text-white font-light uppercase tracking-[0.2em] text-sm hover:bg-gold-600 transition-colors rounded-full">
                Send Message
              </motion.button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
