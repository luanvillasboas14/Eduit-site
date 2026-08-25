import React from 'react';
import { FEATURED_COURSES } from '../data/courses';
import { Course } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface FeaturedCoursesProps {
  onSelectCourse: (course: Course) => void;
  onOpenConsultant: () => void;
  onNavigateToCourses?: () => void;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  onSelectCourse,
  onNavigateToCourses,
}) => {
  return (
    <section id="cursos" className="bg-slate-100 pt-6 sm:pt-10 pb-8 sm:pb-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-4 sm:mb-8 gap-4">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              GRADE DE CURSOS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cursos em{' '}
              <span className="text-yellow-400">Destaque.</span>
            </h2>
          </div>

          {onNavigateToCourses && (
            <button
              onClick={onNavigateToCourses}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-slate-950 bg-white border border-slate-300 hover:border-yellow-400 px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5 text-yellow-600" />
            </button>
          )}
        </div>

        {/* Courses Cards: Horizontal swipe carousel on mobile with peek preview, standard responsive grid on tablet/desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10 overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 pt-1 -mx-4 px-[8.333%] sm:mx-0 sm:px-0 snap-x snap-mandatory scrollbar-none">
          {FEATURED_COURSES.map((course) => (
            <div
              key={course.id}
              className="w-[76vw] min-w-[76vw] max-w-[280px] xs:w-[270px] xs:min-w-[270px] sm:w-auto sm:min-w-0 sm:max-w-none snap-center sm:snap-start bg-[#0b1329] border-2 sm:border-[3px] border-slate-800 hover:border-yellow-400 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/15 shrink-0 sm:shrink"
            >
              {/* Card Image Header */}
              <div 
                onClick={() => onSelectCourse(course)}
                className="relative h-36 sm:h-44 overflow-hidden cursor-pointer"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1329] via-[#0b1329]/30 to-transparent" />
                <span className="absolute top-2.5 left-2.5 sm:hidden bg-[#070d19]/90 text-yellow-400 font-extrabold text-[9px] uppercase px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-slate-700/80 shadow-md">
                  {course.categoryBadge}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  <div className="hidden sm:block mb-2">
                    <span className="text-[10px] font-extrabold tracking-wider text-yellow-400 uppercase">
                      {course.categoryBadge}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onSelectCourse(course)}
                    className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 group-hover:text-yellow-400 transition-colors cursor-pointer line-clamp-2 leading-snug"
                  >
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 flex-wrap text-[11px] sm:text-xs text-slate-400">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-slate-300">
                      <span className="bg-slate-800 text-yellow-400 font-bold px-2 py-0.5 rounded text-[9px] sm:text-[10px] uppercase">
                        {course.modality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-1">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md shadow-yellow-400/10 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span>Ver Curso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom View All Button (Mobile Centered) */}
        {onNavigateToCourses && (
          <div className="flex justify-center">
            <button
              onClick={onNavigateToCourses}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-yellow-500/50 text-slate-200 hover:text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl sm:rounded-full text-xs transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-500/10 cursor-pointer active:scale-95 group"
            >
              <span>Ver Todos os Cursos</span>
              <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
