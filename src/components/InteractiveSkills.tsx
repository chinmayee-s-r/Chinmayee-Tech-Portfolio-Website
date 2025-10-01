import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

const InteractiveSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    { name: 'TypeScript', level: 90, category: 'frontend', color: '#3178c6' },
    { name: 'React', level: 85, category: 'frontend', color: '#61dafb' },
    { name: 'Next.js', level: 80, category: 'frontend', color: '#000000' },
    { name: 'Python', level: 88, category: 'backend', color: '#3776ab' },
    { name: 'Node.js', level: 82, category: 'backend', color: '#339933' },
    { name: 'FastAPI', level: 85, category: 'backend', color: '#009688' },
    { name: 'PostgreSQL', level: 78, category: 'database', color: '#336791' },
    { name: 'Redis', level: 75, category: 'database', color: '#dc382d' },
    { name: 'Docker', level: 80, category: 'devops', color: '#2496ed' },
    { name: 'AWS', level: 70, category: 'devops', color: '#ff9900' },
    { name: 'LLMs', level: 85, category: 'ai', color: '#ff6b6b' },
    { name: 'Vector DBs', level: 75, category: 'ai', color: '#4ecdc4' },
  ];

  const categories = [
    { id: 'all', name: 'All', color: '#e6e6e6' },
    { id: 'frontend', name: 'Frontend', color: '#3b82f6' },
    { id: 'backend', name: 'Backend', color: '#10b981' },
    { id: 'database', name: 'Database', color: '#f59e0b' },
    { id: 'devops', name: 'DevOps', color: '#8b5cf6' },
    { id: 'ai', name: 'AI/ML', color: '#ef4444' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-green-400 text-black'
                : 'bg-gray-900 border border-gray-700 text-white hover:bg-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4"
        layout
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-lg text-center text-lg relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredSkill === skill.name ? '0%' : '-100%' }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Skill Name */}
              <motion.div
                className="relative z-10 font-medium"
                animate={{ color: hoveredSkill === skill.name ? '#4ade80' : '#ffffff' }}
              >
                {skill.name}
              </motion.div>
              
              {/* Skill Level Bar */}
              <motion.div
                className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                />
              </motion.div>
              
              {/* Skill Level Percentage */}
              <motion.div
                className="text-xs text-white opacity-70 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.05 }}
              >
                {skill.level}%
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InteractiveSkills;
