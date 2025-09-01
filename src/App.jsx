import "./index.css";
import { motion } from "framer-motion";
import useLenis from "./hooks/useLenis";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Section from "./components/Section";
import TiltCard from "./components/TiltCard";
import EditablePortrait from "./components/EditablePortrait";
import profile from "./assets/profile.jpg";
import { Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";
import ContactForm from "./components/ContactForm";
import { GraduationCap, Briefcase } from "lucide-react";
import UnderDevelopment from "./components/UnderDevelopment";
import { fadeIn, stagger, scaleIn } from "./lib/motion";

function LenisProvider({ children }) {
  useLenis();
  return <>{children}</>;
}

export default function App() {
  return (
    <div className="dark">
      <Preloader />
      <LenisProvider>
        <Nav />

        {/* HERO */}
        <section d="home" className="container-pad pt-28 md:pt-36 pb-10">
          <motion.div
            variants={stagger(0.08, 0)}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-[1.2fr_.8fr]"
          >
            <motion.div variants={fadeIn(0, 12)}>
              <h1>Hi, I'm Kritik Paudel</h1>
              <p className="mt-4 text-gray-400 max-w-xl">
                A passionate Web Developer and Cybersecurity Enthusiast.
              </p>
              <div className="mt-6 flex gap-3">
                <a className="btn" href="#work">View Work</a>
                <a className="btn" href="#contact">Contact</a>
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div variants={scaleIn(0.1)} className="relative">
              <EditablePortrait src={profile} alt="Your Name portrait" />
              <div className="mt-3">
                <p className="text-sm text-gray-400"></p>
                <h3 className="mt-1 text-xl">Kritik Paudel</h3>
                <p className="mt-2 text-gray-400">Skill Officer / Cybersecurity Researcher</p>
              </div>
            </motion.div>

          </motion.div>
        </section>

        {/* WORK */}
        <Section id="work" title="Work" subtitle="Selected projects & experiments">
          <UnderDevelopment />
        </Section>



        {/* ABOUT */}
        <Section id="about" title="About" subtitle="A short description">
          {/* 1 col → 3 cols @md → 4 cols @lg (2/2 split) */}
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {/* Description (no fixed height) */}
            <div className="md:col-span-2 lg:col-span-2 glass p-5 md:p-6 lg:p-8">
              <h4 className="text-lg md:text-xl lg:text-2xl">About me</h4>
              <p className="mt-3 text-gray-400 text-[15px] md:text-[16px] lg:text-[17px] leading-7 md:leading-8">
                To pursue a challenging career in cyber security where I can continuously learn,
                adjust, and significantly contribute to the security of sensitive data and crucial
                systems. I am incredibly willing to collaborate with top industry professionals to
                enhance current security procedures and develop cutting-edge strategies to counter
                growing cyber threats.
              </p>
            </div>

            {/* Details (auto height, no overflow hidden) */}
            <div className="lg:col-span-2 glass p-5 md:p-6 lg:p-8">
              <h4 className="text-lg md:text-xl lg:text-2xl">Details</h4>

              <ul role="list" className="mt-3 md:mt-4 space-y-3">
                {/* Each row has a fixed label column + flexible value column */}
                <li className="grid grid-cols-[minmax(100px,140px)_1fr] gap-x-4 items-start">
                  <span className="text-gray-400 whitespace-nowrap">Website</span>
                  <a
                    href="https://www.kritikpaudel.com.np"
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted break-words break-all"
                  >
                    www.kritikpaudel.com.np
                  </a>
                </li>

                <li className="grid grid-cols-[minmax(100px,140px)_1fr] gap-x-4 items-start">
                  <span className="text-gray-400 whitespace-nowrap">Age</span>
                  <span>23</span>
                </li>

                <li className="grid grid-cols-[minmax(100px,140px)_1fr] gap-x-4 items-start">
                  <span className="text-gray-400 whitespace-nowrap">Degree</span>
                  <span className="break-words">
                    BSc (Hons) Computer Networking &amp; IT Security
                  </span>
                </li>

                <li className="grid grid-cols-[minmax(100px,140px)_1fr] gap-x-4 items-start">
                  <span className="text-gray-400 whitespace-nowrap">Address</span>
                  <span>Kathmandu, Nepal</span>
                </li>

                <li className="grid grid-cols-[minmax(100px,140px)_1fr] gap-x-4 items-start">
                  <span className="text-gray-400 whitespace-nowrap">Email</span>
                  <a
                    href="mailto:kritikpaudel16@gmail.com"
                    className="underline decoration-dotted break-words break-all"
                  >
                    kritikpaudel16@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Section>



        {/* CONTACT */}
        <Section id="contact" title="Contact" subtitle="Let’s get connected">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Left: contact card */}
            <div className="glass p-5 md:p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-lg md:text-xl lg:text-2xl">Reach me directly</h4>
                <div className="mt-4 space-y-3 text-gray-300">
                  <a className="flex items-center gap-2 underline decoration-dotted" href="mailto:kritikpaudel16@gmail.com">
                    <Mail size={16} />
                    kritikpaudel16@gmail.com
                  </a>
                  <p className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    Kathmandu, Nepal
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20"
                      href="https://instagram.com/kritik_paudel" target="_blank" rel="noreferrer"
                    >
                      <Instagram size={16} /> Instagram
                    </a>
                    <a
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20"
                      href="https://www.linkedin.com/in/kritik-paudel-6a159128a/" target="_blank" rel="noreferrer"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </div>

                </div>
              </div>

              {/* subtle note */}
              <p className="mt-6 text-xs text-gray-500">
                Prefer email? Use the form or write me directly. I usually reply within 1–2 days.
              </p>
            </div>

            {/* Right: form spans 2 cols on md+ */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </Section>


        <footer className="container-pad py-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Kritik Paudel
        </footer>
      </LenisProvider>
    </div>
  );
}
