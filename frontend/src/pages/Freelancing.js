import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Code2, 
  GraduationCap, 
  FileCheck, 
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';

const Freelancing = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Full-stack web applications with modern frameworks and responsive design. From landing pages to complex web platforms.',
      features: [
        'Responsive Design',
        'RESTful APIs',
        'Database Integration',
        'Performance Optimization'
      ],
      price: 'Starting at $500'
    },
    {
      icon: Code2,
      title: 'API Development',
      description: 'Robust and scalable APIs with comprehensive documentation. RESTful and GraphQL APIs with authentication and rate limiting.',
      features: [
        'RESTful/GraphQL APIs',
        'Authentication & Authorization',
        'API Documentation',
        'Testing & Monitoring'
      ],
      price: 'Starting at $300'
    },
    {
      icon: GraduationCap,
      title: 'DSA Tutoring',
      description: 'One-on-one tutoring sessions for Data Structures and Algorithms. Perfect for interview preparation and competitive programming.',
      features: [
        'Personalized Learning',
        'Interview Preparation',
        'Problem-Solving Techniques',
        'Mock Interviews'
      ],
      price: '$40/hour'
    },
    {
      icon: FileCheck,
      title: 'Code Review & Consultation',
      description: 'Professional code review and technical consultation. Get expert feedback on architecture, best practices, and optimization.',
      features: [
        'Code Quality Analysis',
        'Architecture Review',
        'Performance Optimization',
        'Best Practices'
      ],
      price: 'Starting at $100'
    }
  ];

  const workProcess = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your project requirements, goals, and timeline.'
    },
    {
      step: '02',
      title: 'Proposal',
      description: 'I provide a detailed proposal with deliverables and pricing.'
    },
    {
      step: '03',
      title: 'Development',
      description: 'Regular updates and checkpoints throughout the project.'
    },
    {
      step: '04',
      title: 'Delivery',
      description: 'Final delivery with documentation and support period.'
    }
  ];

  const whyChooseMe = [
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'I respect deadlines and deliver on time, every time.'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      description: 'Thoroughly tested and documented code with best practices.'
    },
    {
      icon: DollarSign,
      title: 'Fair Pricing',
      description: 'Competitive rates without compromising on quality.'
    }
  ];

  return (
    <div className="page-container" data-testid="freelancing-page">
      <div className="page-header">
        <h1 className="page-title" data-testid="freelancing-page-title">Freelancing Services</h1>
        <p className="page-description">
          Professional development services tailored to your needs. Let's turn your ideas into reality.
        </p>
      </div>

      {/* Services Grid */}
      <section className="services-section">
        <h2 className="section-title" data-testid="services-title">Services I Offer</h2>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="service-card" data-testid={`service-card-${index}`}>
                <div className="service-icon">
                  <Icon size={36} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="service-feature">
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="service-price" data-testid={`service-price-${index}`}>{service.price}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Work Process */}
      <section className="work-process-section">
        <h2 className="section-title" data-testid="work-process-title">How I Work</h2>
        <div className="work-process-grid">
          {workProcess.map((process, index) => (
            <div key={index} className="process-step" data-testid={`process-step-${index}`}>
              <div className="process-number">{process.step}</div>
              <h3 className="process-title">{process.title}</h3>
              <p className="process-description">{process.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="why-choose-section">
        <h2 className="section-title" data-testid="why-choose-title">Why Choose Me</h2>
        <div className="why-choose-grid">
          {whyChooseMe.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="why-choose-card" data-testid={`why-choose-card-${index}`}>
                <div className="why-choose-icon">
                  <Icon size={32} />
                </div>
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-testid="freelancing-cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Project?</h2>
          <p className="cta-description">
            Let's discuss how I can help you achieve your goals. Get a free consultation today!
          </p>
          <Link to="/contact" className="btn btn-primary" data-testid="freelancing-cta-button">
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Freelancing;