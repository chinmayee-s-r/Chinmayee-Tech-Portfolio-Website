import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  liveUrl,
  githubUrl,
  caseStudyUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 group cursor-pointer"
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="w-full h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
        />
        <motion.svg
          className="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </motion.svg>
      </div>

      {/* Project Title */}
      <motion.h3
        className="text-xl font-bold text-white mb-2"
        animate={{ color: isHovered ? '#4ade80' : '#ffffff' }}
      >
        {title}
      </motion.h3>

      {/* Project Description */}
      <p className="text-white opacity-70 text-sm mb-4 line-clamp-3">
        {description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <motion.span
            key={tech}
            className="px-2 py-1 bg-gray-800 text-white text-xs rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        {caseStudyUrl && (
          <motion.button
            className="border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Case Study
          </motion.button>
        )}
        {liveUrl && (
          <motion.a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white opacity-60 hover:opacity-100 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Live Demo
          </motion.a>
        )}
        {githubUrl && (
          <motion.a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white opacity-60 hover:opacity-100 transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
          >
            GitHub
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
