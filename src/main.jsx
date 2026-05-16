import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Ambulance,
  BadgeCheck,
  CalendarCheck,
  Clock3,
  HeartPulse,
  Hospital,
  Image,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  UsersRound,
  X,
  Zap
} from 'lucide-react';
import './styles.css';
import rejoyceLogo from './assets/rejoyce-logo.png';
import hussainGreekClinic from './assets/partners/partner-1.jpg';
import skSpecialityMedicalCentre from './assets/partners/partner-2.jpg';
import alchemyEyewear from './assets/partners/partner-3.jpg';

const WHATSAPP_NUMBER = '918074862287';
const PHONE_NUMBER = '+91 80748 62287';
const OFFICE_PHONE = '070424 24242';
const OFFICE_ADDRESS = '34, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095';
const OFFICE_MAP_QUERY = encodeURIComponent(OFFICE_ADDRESS);

const navItems = [
  ['Our Doctors', 'doctors'],
  ['Services', 'services'],
  ['Machineries', 'machineries'],
  ['Associate Partners', 'partners'],
  ['Book Appointment', 'appointment'],
  ['Location', 'location'],
  ['Photos of Treatments', 'gallery']
];

const doctors = [
  {
    name: 'Dr. Ayesha Rahman',
    specialty: 'General Physician',
    experience: '12+ years',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80',
    description: 'Experienced in home-based diagnosis, fever care, respiratory conditions, diabetes reviews, and routine checkups.'
  },
  {
    name: 'Dr. Vikram Mehta',
    specialty: 'Orthopedic Consultant',
    experience: '10+ years',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80',
    description: 'Focused on joint pain, injury assessment, elderly mobility, post-surgery review, and recovery planning.'
  },
  {
    name: 'Dr. Sara Khan',
    specialty: 'Home Care & Geriatrics',
    experience: '9+ years',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80',
    description: 'Provides careful elderly care support, chronic condition monitoring, and family-friendly treatment guidance.'
  }
];

const services = [
  ['General Physician Visits', 'Doctor consultation at home for fever, infections, weakness, chronic conditions, and routine care.', Stethoscope],
  ['Physiotherapy at Home', 'Guided rehabilitation, mobility care, pain management, and post-injury recovery sessions.', HeartPulse],
  ['Orthopedic Consultation', 'Bone, joint, sprain, back pain, and post-surgery orthopedic review without hospital travel.', UserRoundCheck],
  ['Emergency Home Visit', 'Quick-response medical assessment for urgent but home-manageable conditions.', Ambulance],
  ['Nursing Care', 'Injection, dressing, IV support, vitals monitoring, catheter care, and trained bedside assistance.', ShieldCheck],
  ['Elderly Care Support', 'Regular health checks, medication support, mobility guidance, and compassionate senior care.', UsersRound],
  ['Post-surgery Home Care', 'Recovery monitoring, wound care, physiotherapy coordination, and doctor follow-up at home.', BadgeCheck]
];

const machineries = [
  ['Portable X-Ray', 'On-site imaging support for mobility-limited patients and faster clinical decisions.', 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?auto=format&fit=crop&w=700&q=80'],
  ['Portable ECG', 'Heart rhythm screening and cardiac monitoring from the comfort of home.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80'],
  ['Oxygen Concentrator', 'Respiratory support for patients who need reliable oxygen assistance at home.', 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=700&q=80'],
  ['Nebulizers', 'Breathing support for asthma, wheezing, bronchitis, and respiratory discomfort.', 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=700&q=80'],
  ['Vital Monitoring Devices', 'Pulse, oxygen saturation, temperature, and other key readings during home visits.', 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=700&q=80'],
  ['BP & Glucose Meters', 'Routine monitoring for hypertension, diabetes, weakness, dizziness, and follow-up care.', 'https://images.unsplash.com/photo-1579165466991-467135ad3110?auto=format&fit=crop&w=700&q=80']
];

const partners = [
  {
    name: 'Hussain Greek Clinic',
    category: 'Associate Healthcare Partner',
    image: hussainGreekClinic
  },
  {
    name: 'S.K. Speciality Medical Centre',
    category: 'Associate Medical Centre',
    image: skSpecialityMedicalCentre
  },
  {
    name: 'Alchemy Luxury Eyewear',
    category: 'Associate Eyewear Partner',
    image: alchemyEyewear
  }
];

const gallery = [
  ['Doctor home consultation', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80'],
  ['Vitals monitoring session', 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80'],
  ['Physiotherapy care', 'https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=900&q=80'],
  ['Nursing care at home', 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=900&q=80'],
  ['Portable medical support', 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80'],
  ['Elderly care follow-up', 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80']
];

function createWhatsappUrl(details = {}) {
  const base = 'Hello, I want to book a doctor appointment with Rejoyce.';
  const lines = [
    base,
    details.name && `Full Name: ${details.name}`,
    details.age && `Age: ${details.age}`,
    details.phone && `Phone: ${details.phone}`,
    details.address && `Address: ${details.address}`,
    details.preferredDoctor && `Preferred Doctor: ${details.preferredDoctor}`,
    details.doctorType && `Doctor Type: ${details.doctorType}`,
    details.message && `Symptoms/Message: ${details.message}`
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Rejoyce home">
        <img className="brand-logo" src={rejoyceLogo} alt="Rejoyce" />
        <span className="brand-text">
          <small>Home Visit Care</small>
        </span>
      </a>
      <button className="icon-button menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open navigation">
        <Menu size={22} />
      </button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Primary navigation">
        <button className="icon-button nav-close" type="button" onClick={() => setOpen(false)} aria-label="Close navigation">
          <X size={20} />
        </button>
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero reveal">
      <div className="hero-content">
        <p className="eyebrow"><Clock3 size={16} /> Fast home response medical care</p>
        <h1>Expert Doctors at Your Doorstep - Rejoyce Home Visit Care</h1>
        <p className="hero-copy">
          Trusted home-visit doctors, trained nurses, physiotherapists, and portable diagnostic support for safer care without hospital travel.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#appointment"><CalendarCheck size={19} /> Book Appointment</a>
          <a className="secondary-button" href={createWhatsappUrl()} target="_blank" rel="noreferrer"><Phone size={18} /> WhatsApp Rejoyce</a>
        </div>
        <div className="hero-stats" aria-label="Rejoyce service highlights">
          <span><strong>24/7</strong> urgent support</span>
          <span><strong>30 min</strong> quick response</span>
          <span><strong>Modern</strong> portable equipment</span>
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  const features = [
    ['Trusted Doctors', 'Verified clinicians for dependable at-home diagnosis.', ShieldCheck],
    ['Fast Response', 'Quick appointment routing through WhatsApp and phone.', Zap],
    ['Modern Equipment', 'Portable diagnostics and monitoring machines at home.', Microscope]
  ];

  return (
    <section className="feature-strip reveal">
      {features.map(([title, text, Icon]) => (
        <article key={title}>
          <Icon size={27} />
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </section>
  );
}

function SectionIntro({ icon: Icon, label, title, children }) {
  return (
    <div className="section-intro reveal">
      <p className="eyebrow">{Icon && <Icon size={16} />} {label}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Doctors() {
  return (
    <section id="doctors" className="section">
      <SectionIntro icon={Stethoscope} label="Our Doctors" title="Specialists who bring hospital-grade care home">
        Rejoyce connects patients with qualified doctors for careful consultation, follow-up, and recovery support.
      </SectionIntro>
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <article className="doctor-card reveal" key={doctor.name}>
            <img src={doctor.photo} alt={doctor.name} loading="lazy" />
            <div>
              <span>{doctor.experience}</span>
              <h3>{doctor.name}</h3>
              <p className="specialty">{doctor.specialty}</p>
              <p>{doctor.description}</p>
              <a href={createWhatsappUrl({ preferredDoctor: doctor.name, doctorType: doctor.specialty })} target="_blank" rel="noreferrer" className="text-button">
                Request This Doctor
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section muted-section">
      <SectionIntro icon={HeartPulse} label="Services" title="Complete medical care services at home" />
      <div className="service-grid">
        {services.map(([title, text, Icon]) => (
          <article className="service-card reveal" key={title}>
            <Icon size={28} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Machineries() {
  return (
    <section id="machineries" className="section">
      <SectionIntro icon={Microscope} label="Machineries" title="Advanced portable medical machinery">
        Rejoyce uses compact, reliable equipment to support diagnosis, monitoring, and respiratory care during home visits.
      </SectionIntro>
      <div className="machine-grid">
        {machineries.map(([title, text, src]) => (
          <article className="machine-card reveal" key={title}>
            <img src={src} alt={title} loading="lazy" />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section id="partners" className="section muted-section">
      <SectionIntro icon={Hospital} label="Associate Partners" title="A connected care network for complete support" />
      <div className="partner-grid">
        {partners.map((partner) => (
          <article className="partner-card reveal" key={partner.name}>
            <div className="partner-image">
              <img src={partner.image} alt={partner.name} loading="lazy" />
            </div>
            <h3>{partner.name}</h3>
            <p>{partner.category}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Appointment() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
    preferredDoctor: 'Admin to allot doctor',
    doctorType: 'General Physician',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = useMemo(() => createWhatsappUrl(form), [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitForm(event) {
    event.preventDefault();
    setSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <section id="appointment" className="section appointment-section">
      <SectionIntro icon={CalendarCheck} label="Book Appointment" title="Book a Rejoyce doctor home visit">
        Fill in the details and the appointment request will open directly in WhatsApp for Rejoyce confirmation.
      </SectionIntro>
      <div className="appointment-layout">
        <form className="appointment-form reveal" onSubmit={submitForm}>
          <label>Full Name<input name="name" value={form.name} onChange={updateField} required placeholder="Patient name" /></label>
          <label>Age<input name="age" value={form.age} onChange={updateField} required inputMode="numeric" pattern="[0-9]*" placeholder="Age" /></label>
          <label>Phone Number<input name="phone" value={form.phone} onChange={updateField} required inputMode="tel" placeholder="+91 ..." /></label>
          <label>Address<textarea name="address" value={form.address} onChange={updateField} required placeholder="House, street, area, city" /></label>
          <label>Select specific doctor
            <select name="preferredDoctor" value={form.preferredDoctor} onChange={updateField}>
              <option>Admin to allot doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.name}>{doctor.name} - {doctor.specialty}</option>
              ))}
            </select>
          </label>
          <label>Select type of doctor
            <select name="doctorType" value={form.doctorType} onChange={updateField}>
              <option>General Physician</option>
              <option>Physiotherapist</option>
              <option>Orthopedic Consultant</option>
              <option>Emergency Home Visit Doctor</option>
              <option>Nursing Care Team</option>
              <option>Elderly Care Specialist</option>
            </select>
          </label>
          <label>Symptoms/message<textarea name="message" value={form.message} onChange={updateField} placeholder="Briefly describe symptoms or support needed" /></label>
          <div className="form-actions">
            <button className="primary-button" type="submit"><CalendarCheck size={18} /> Send to WhatsApp</button>
            <a className="secondary-button" href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}><Phone size={17} /> Call Directly</a>
          </div>
          {submitted && (
            <p className="success-message" role="status">
              Thank you. Your appointment message is ready in WhatsApp. Rejoyce will confirm your visit shortly.
            </p>
          )}
        </form>
        <aside className="thank-you-card reveal">
          <CalendarCheck size={35} />
          <h3>Thank you confirmation</h3>
          <p>After form submission, WhatsApp opens with the full appointment details pre-filled for secure confirmation.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-button">Open WhatsApp message</a>
        </aside>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="section">
      <SectionIntro icon={MapPin} label="Location" title="Rejoyce home-visit medical service area" />
      <div className="location-layout">
        <div className="map-wrap reveal">
          <iframe
            title="Rejoyce location map"
            src={`https://www.google.com/maps?q=${OFFICE_MAP_QUERY}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="location-card reveal">
          <h3>Rejoyce Home Visit Care</h3>
          <p><MapPin size={18} /> {OFFICE_ADDRESS}</p>
          <p><Clock3 size={18} /> Working hours: 8:00 AM - 10:00 PM</p>
          <p><Phone size={18} /> Contact: {PHONE_NUMBER}</p>
          <p><Phone size={18} /> Office: {OFFICE_PHONE}</p>
          <a className="primary-button" href={createWhatsappUrl({ message: 'I need an emergency home visit.' })} target="_blank" rel="noreferrer">
            <Ambulance size={18} /> Emergency Contact
          </a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="section muted-section">
      <SectionIntro icon={Image} label="Photos of Treatments" title="Clean, safe, professional care moments" />
      <div className="gallery-grid">
        {gallery.map(([title, src], index) => (
          <button className="gallery-item reveal" type="button" key={title} onClick={() => setActive(index)}>
            <img src={src} alt={title} loading="lazy" />
            <span>{title}</span>
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[active][0]} onClick={() => setActive(null)}>
          <button className="icon-button" type="button" aria-label="Close image viewer"><X size={24} /></button>
          <img src={gallery[active][1]} alt={gallery[active][0]} />
          <p>{gallery[active][0]}</p>
        </div>
      )}
    </section>
  );
}

function FloatingActions() {
  return (
    <div className="floating-actions" aria-label="Quick contact">
      <a href={createWhatsappUrl()} target="_blank" rel="noreferrer" aria-label="Open WhatsApp"><Phone size={21} /></a>
      <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} aria-label="Call Rejoyce"><Ambulance size={21} /></a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <strong>Rejoyce</strong>
      <p>Expert doctors, nursing care, physiotherapy, and portable medical machinery at your doorstep.</p>
      <a href="#appointment">Book Appointment</a>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }),
      { threshold: 0.14 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureStrip />
        <Doctors />
        <Services />
        <Machineries />
        <Partners />
        <Appointment />
        <Location />
        <Gallery />
      </main>
      <FloatingActions />
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
