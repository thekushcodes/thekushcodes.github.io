import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI-Powered Chatbot',
      description: 'Built an intelligent chatbot using OpenAI GPT-4 API with context awareness and natural language understanding. Implemented real-time responses and conversation memory.',
      technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io'],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
      github: 'https://github.com/alexrodriguez/ai-chatbot',
      demo: 'https://ai-chatbot-demo.com',
      featured: true
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with product management, shopping cart, payment integration, and order tracking. Includes admin dashboard for inventory management.',
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'Stripe', 'Redis'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
      github: 'https://github.com/alexrodriguez/ecommerce-platform',
      demo: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      title: 'Task Management System',
      description: 'Collaborative task manager with real-time updates, team workspaces, Kanban boards, and productivity analytics. Supports file attachments and comments.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'AWS S3'],
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
      github: 'https://github.com/alexrodriguez/task-manager',
      demo: 'https://taskmanager-demo.com',
      featured: false
    },
    {
      title: 'Algorithm Visualizer',
      description: 'Interactive web app to visualize sorting and searching algorithms. Helps students understand algorithm execution with step-by-step animations and explanations.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=400&fit=crop',
      github: 'https://github.com/alexrodriguez/algo-visualizer',
      demo: 'https://algo-viz-demo.com',
      featured: false
    },
    {
      title: 'Weather Forecast App',
      description: 'Real-time weather application with 7-day forecasts, location-based weather alerts, and beautiful weather animations. Supports multiple locations.',
      technologies: ['React', 'OpenWeather API', 'Geolocation API', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop',
      github: 'https://github.com/alexrodriguez/weather-app',
      demo: 'https://weather-demo.com',
      featured: false
    },
    {
      title: 'Code Snippet Manager',
      description: 'Personal code snippet library with syntax highlighting, tagging system, and search functionality. Supports 20+ programming languages.',
      technologies: ['React', 'FastAPI', 'MongoDB', 'Prism.js', 'Docker'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      github: 'https://github.com/alexrodriguez/snippet-manager',
      demo: 'https://snippets-demo.com',
      featured: false
    }
  ];

  return (
    <div className="page-container" data-testid="projects-page">
      <div className="page-header">
        <h1 className="page-title" data-testid="projects-page-title">Projects</h1>
        <p className="page-description">
          A showcase of my recent work and personal projects. Each project demonstrates
          different aspects of my technical abilities and problem-solving skills.
        </p>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`project-card ${project.featured ? 'featured' : ''}`}
            data-testid={`project-card-${index}`}
          >
            <div className="project-image-container">
              <img 
                src={project.image} 
                alt={project.title}
                className="project-image"
                loading="lazy"
              />
              {project.featured && (
                <div className="featured-badge" data-testid={`featured-badge-${index}`}>Featured</div>
              )}
            </div>
            
            <div className="project-content">
              <h3 className="project-title" data-testid={`project-title-${index}`}>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag" data-testid={`tech-tag-${tech.toLowerCase()}`}>
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="project-links">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                  data-testid={`project-github-link-${index}`}
                >
                  <Github size={18} />
                  Code
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link project-link-primary"
                  data-testid={`project-demo-link-${index}`}
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;