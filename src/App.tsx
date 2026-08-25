import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCourses } from './components/FeaturedCourses';
import { CoursesPage } from './components/CoursesPage';
import { PostGradPage } from './components/PostGradPage';
import { PolosPage } from './components/PolosPage';
import { PoloDetailPage } from './components/PoloDetailPage';
import { CourseDetailPage } from './components/CourseDetailPage';
import { EntryMethodsSection } from './components/EntryMethodsSection';
import { NewsSection } from './components/NewsSection';
import { NewsPage } from './components/NewsPage';
import { BlogPostPage } from './components/BlogPostPage';
import { Footer } from './components/Footer';

import { CourseModal } from './components/CourseModal';
import { ConsultantModal } from './components/ConsultantModal';
import { VideoModal } from './components/VideoModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { Course, NewsArticle, Polo } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'courses' | 'pos-graduacao' | 'polos' | 'polo-detail' | 'course-detail' | 'news' | 'blog-post'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPolo, setSelectedPolo] = useState<Polo | null>(null);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [consultantCourseTitle, setConsultantCourseTitle] = useState<string>('');
  const [consultantPoloName, setConsultantPoloName] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState<string>('');

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleOpenConsultant = (courseTitle: string = '', poloName: string = '') => {
    setConsultantCourseTitle(courseTitle);
    setConsultantPoloName(poloName);
    setIsConsultantOpen(true);
  };

  const handleNavigate = (page: 'home' | 'courses' | 'pos-graduacao' | 'polos' | 'news') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleHeaderSearch = (query: string) => {
    setHeaderSearchQuery(query);
    if (currentPage !== 'courses' && currentPage !== 'pos-graduacao') {
      setCurrentPage('courses');
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course-detail');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectPolo = (polo: Polo) => {
    setSelectedPolo(polo);
    setCurrentPage('polo-detail');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setCurrentPage('blog-post');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-950">
      {/* Navbar Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultant={() => handleOpenConsultant()}
        onSearch={handleHeaderSearch}
        searchQuery={headerSearchQuery}
      />

      <main>
        {currentPage === 'home' && (
          <>
            {/* Hero Banner */}
            <Hero
              onOpenConsultant={() => handleOpenConsultant()}
              onExploreCourses={() => handleNavigate('courses')}
              onOpenVideo={() => setIsVideoOpen(true)}
            />

            {/* Cursos em Destaque Grid */}
            <FeaturedCourses
              onSelectCourse={(course) => handleSelectCourse(course)}
              onOpenConsultant={() => handleOpenConsultant()}
              onNavigateToCourses={() => handleNavigate('courses')}
            />

            {/* Formas de Entrada (Background Cinza Claro) */}
            <EntryMethodsSection onOpenConsultant={(title) => handleOpenConsultant(title)} />

            {/* Noticias e Novidades */}
            <NewsSection
              onSelectArticle={(article) => handleSelectArticle(article)}
              onOpenConsultant={() => handleOpenConsultant()}
              onNavigateToNews={() => handleNavigate('news')}
            />
          </>
        )}

        {currentPage === 'news' && (
          /* Dedicated Blog & News Page with Theme Filters */
          <NewsPage
            onSelectArticle={(article) => handleSelectArticle(article)}
            onOpenConsultant={() => handleOpenConsultant()}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'blog-post' && selectedArticle && (
          /* Dedicated Individual Blog Post Page */
          <BlogPostPage
            article={selectedArticle}
            onBackToBlog={() => handleNavigate('news')}
            onNavigateHome={() => handleNavigate('home')}
            onSelectArticle={(article) => handleSelectArticle(article)}
            onOpenConsultant={(subject) => handleOpenConsultant(subject || selectedArticle.title)}
          />
        )}

        {currentPage === 'courses' && (
          /* Dedicated Graduation (Graduação) Page */
          <CoursesPage
            onSelectCourse={(course) => handleSelectCourse(course)}
            onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
            initialSearchQuery={headerSearchQuery}
            onSearchChange={(q) => setHeaderSearchQuery(q)}
          />
        )}

        {currentPage === 'pos-graduacao' && (
          /* Dedicated Post-Graduation (Pós-graduação & MBA) Page */
          <PostGradPage
            onSelectCourse={(course) => handleSelectCourse(course)}
            onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
            initialSearchQuery={headerSearchQuery}
            onSearchChange={(q) => setHeaderSearchQuery(q)}
          />
        )}

        {currentPage === 'polos' && (
          /* Dedicated Polos Page with Google Maps Integration */
          <PolosPage
            onOpenConsultant={(poloName) => handleOpenConsultant(poloName)}
            onNavigateGraduation={() => handleNavigate('courses')}
            onSelectPolo={(polo) => handleSelectPolo(polo)}
          />
        )}

        {currentPage === 'polo-detail' && selectedPolo && (
          /* Dedicated Individual Polo Page */
          <PoloDetailPage
            polo={selectedPolo}
            onBackToPolos={() => handleNavigate('polos')}
            onOpenConsultant={(name) => handleOpenConsultant(name || selectedPolo.name)}
            onSelectCourse={(course) => handleSelectCourse(course)}
            onNavigateGraduation={() => handleNavigate('courses')}
            onNavigatePostGrad={() => handleNavigate('pos-graduacao')}
            onSelectOtherPolo={(polo) => handleSelectPolo(polo)}
          />
        )}

        {currentPage === 'course-detail' && selectedCourse && (
          /* Individual Course Page */
          <CourseDetailPage
            course={selectedCourse}
            onBackToCourses={() => {
              if (selectedCourse.categoryBadge === 'PÓS-GRADUAÇÃO') {
                handleNavigate('pos-graduacao');
              } else {
                handleNavigate('courses');
              }
            }}
            onNavigateHome={() => handleNavigate('home')}
            onSelectCourse={(course) => handleSelectCourse(course)}
            onOpenConsultant={(courseTitle, poloName) => handleOpenConsultant(courseTitle || selectedCourse.title, poloName)}
            onSelectPolo={(polo) => handleSelectPolo(polo)}
            onNavigatePolos={() => handleNavigate('polos')}
          />
        )}
      </main>

      {/* Footer & Fixed Bottom Bar */}
      <Footer
        onOpenConsultant={() => handleOpenConsultant()}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals */}
      <CourseModal
        course={modalCourse}
        onClose={() => setModalCourse(null)}
        onOpenConsultantWithCourse={(title) => handleOpenConsultant(title)}
      />

      <ConsultantModal
        isOpen={isConsultantOpen}
        onClose={() => {
          setIsConsultantOpen(false);
          setConsultantPoloName('');
        }}
        defaultCourse={consultantCourseTitle}
        defaultPolo={consultantPoloName}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        onOpenConsultant={() => handleOpenConsultant()}
      />

      {/* Floating WhatsApp Button for Instant Support */}
      <FloatingWhatsApp
        onOpenConsultant={() => handleOpenConsultant()}
      />

      {/* Back to top button for mobile and desktop */}
      <ScrollToTopButton />
    </div>
  );
}

