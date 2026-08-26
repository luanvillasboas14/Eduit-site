import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedCourses } from './components/FeaturedCourses';
import { CoursesPage } from './components/CoursesPage';
import { PostGradPage } from './components/PostGradPage';
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
import { fetchBlogPost } from './lib/supabase';
import {
  BLOG_CATEGORIES,
  GRAD_CATEGORY_BY_NAME,
  GRAD_CATEGORY_ROUTES,
  PATHS,
  POLO_PATHS,
  POS_CATEGORY_BY_NAME,
  POS_CATEGORY_ROUTES,
  blogCategoryPath,
  coursePath,
  findCourseBySlug,
  findPoloBySlug,
  isListingPath,
  isPostgradCourse,
  poloPath,
  postPath,
} from './data/siteUrls';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [consultantCourseTitle, setConsultantCourseTitle] = useState<string>('');
  const [consultantPoloName, setConsultantPoloName] = useState<string>('');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState<string>('');

  const handleOpenConsultant = (courseTitle: string = '', poloName: string = '') => {
    setConsultantCourseTitle(courseTitle);
    setConsultantPoloName(poloName);
    setIsConsultantOpen(true);
  };

  const handleHeaderSearch = (query: string) => {
    setHeaderSearchQuery(query);
    if (!isListingPath(location.pathname)) {
      navigate(PATHS.graduacao);
    }
  };

  const handleSelectCourse = (course: Course) => {
    navigate(coursePath(course));
  };

  const handleSelectPolo = (polo: Polo) => {
    navigate(poloPath(polo));
  };

  const handleSelectArticle = (article: NewsArticle) => {
    navigate(postPath(article));
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-950">
      <ScrollToTop />
      <Header
        onOpenConsultant={() => handleOpenConsultant()}
        onSearch={handleHeaderSearch}
        searchQuery={headerSearchQuery}
      />

      <main>
        <Routes>
          <Route
            path={PATHS.home}
            element={
              <>
                <Hero
                  onOpenConsultant={() => handleOpenConsultant()}
                  onExploreCourses={() => navigate(PATHS.graduacao)}
                  onOpenVideo={() => setIsVideoOpen(true)}
                />
                <FeaturedCourses
                  onSelectCourse={handleSelectCourse}
                  onOpenConsultant={() => handleOpenConsultant()}
                  onNavigateToCourses={() => navigate(PATHS.graduacao)}
                />
                <EntryMethodsSection onOpenConsultant={(title) => handleOpenConsultant(title)} />
                <NewsSection
                  onSelectArticle={handleSelectArticle}
                  onOpenConsultant={() => handleOpenConsultant()}
                  onNavigateToNews={() => navigate(PATHS.blog)}
                />
              </>
            }
          />

          <Route
            path={PATHS.blog}
            element={
              <NewsPage
                onSelectArticle={handleSelectArticle}
                onOpenConsultant={() => handleOpenConsultant()}
                onNavigateHome={() => navigate(PATHS.home)}
                onCategoryChange={(category) => navigate(blogCategoryPath(category))}
              />
            }
          />

          {BLOG_CATEGORIES.map((category) => (
            <Route
              key={category.path}
              path={category.path}
              element={
                <NewsPage
                  onSelectArticle={handleSelectArticle}
                  onOpenConsultant={() => handleOpenConsultant()}
                  onNavigateHome={() => navigate(PATHS.home)}
                  initialCategory={category.name}
                  onCategoryChange={(name) => navigate(blogCategoryPath(name))}
                />
              }
            />
          ))}

          <Route
            path="/post/:slug"
            element={
              <BlogPostRoute
                onSelectArticle={handleSelectArticle}
                onOpenConsultant={handleOpenConsultant}
              />
            }
          />

          <Route
            path={PATHS.graduacao}
            element={
              <CoursesPage
                onSelectCourse={handleSelectCourse}
                onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                initialSearchQuery={headerSearchQuery}
                onSearchChange={(q) => setHeaderSearchQuery(q)}
                onCategoryChange={(cat) => navigate(GRAD_CATEGORY_BY_NAME[cat] ?? PATHS.graduacao)}
                onClearFilters={() => navigate(PATHS.graduacao)}
              />
            }
          />

          {Object.entries(GRAD_CATEGORY_ROUTES).map(([path, filter]) => (
            <Route
              path={path}
              element={
                <CoursesPage
                  onSelectCourse={handleSelectCourse}
                  onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                  initialSearchQuery={headerSearchQuery}
                  onSearchChange={(q) => setHeaderSearchQuery(q)}
                  initialCategory={filter.category}
                  initialModality={filter.modality ?? 'Todas'}
                  titleIncludes={filter.titleIncludes}
                  onCategoryChange={(cat) => navigate(GRAD_CATEGORY_BY_NAME[cat] ?? PATHS.graduacao)}
                  onClearFilters={() => navigate(PATHS.graduacao)}
                />
              }
            />
          ))}

          <Route
            path={PATHS.posGraduacao}
            element={
              <PostGradPage
                onSelectCourse={handleSelectCourse}
                onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                initialSearchQuery={headerSearchQuery}
                onSearchChange={(q) => setHeaderSearchQuery(q)}
                onCategoryChange={(cat) => {
                  const next = POS_CATEGORY_BY_NAME[cat];
                  if (next) navigate(next);
                }}
                onClearFilters={() => navigate(PATHS.posGraduacao)}
              />
            }
          />

          {Object.entries(POS_CATEGORY_ROUTES).map(([path, filter]) => (
            <Route
              path={path}
              element={
                <PostGradPage
                  onSelectCourse={handleSelectCourse}
                  onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                  initialSearchQuery={headerSearchQuery}
                  onSearchChange={(q) => setHeaderSearchQuery(q)}
                  initialCategory={filter.category}
                  titleIncludes={filter.titleIncludes}
                  onCategoryChange={(cat) => {
                    const next = POS_CATEGORY_BY_NAME[cat];
                    if (next) navigate(next);
                  }}
                  onClearFilters={() => navigate(PATHS.posGraduacao)}
                />
              }
            />
          ))}

          <Route
            path="/graduacao-cruzeiro/:slug"
            element={
              <CourseDetailRoute
                onSelectCourse={handleSelectCourse}
                onSelectPolo={handleSelectPolo}
                onOpenConsultant={handleOpenConsultant}
              />
            }
          />

          <Route
            path="/pos/:slug"
            element={
              <CourseDetailRoute
                onSelectCourse={handleSelectCourse}
                onSelectPolo={handleSelectPolo}
                onOpenConsultant={handleOpenConsultant}
              />
            }
          />

          {POLO_PATHS.map((path) => (
            <Route
              path={path}
              element={
                <PoloDetailRoute
                  onSelectCourse={handleSelectCourse}
                  onSelectPolo={handleSelectPolo}
                  onOpenConsultant={handleOpenConsultant}
                />
              }
            />
          ))}

          <Route path="*" element={<Navigate to={PATHS.home} replace />} />
        </Routes>
      </main>

      <Footer onOpenConsultant={() => handleOpenConsultant()} />

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

      <FloatingWhatsApp onOpenConsultant={() => handleOpenConsultant()} />
      <ScrollToTopButton />
    </div>
  );
}

function CourseDetailRoute({
  onSelectCourse,
  onSelectPolo,
  onOpenConsultant,
}: {
  onSelectCourse: (course: Course) => void;
  onSelectPolo: (polo: Polo) => void;
  onOpenConsultant: (courseTitle?: string, poloName?: string) => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { slug } = useParams();
  const course = findCourseBySlug(slug);
  const isPosPath = pathname.startsWith('/pos/');

  if (!course || isPostgradCourse(course) !== isPosPath) {
    return <Navigate to={isPosPath ? PATHS.posGraduacao : PATHS.graduacao} replace />;
  }

  return (
    <CourseDetailPage
      course={course}
      onBackToCourses={() => navigate(isPostgradCourse(course) ? PATHS.posGraduacao : PATHS.graduacao)}
      onNavigateHome={() => navigate(PATHS.home)}
      onSelectCourse={onSelectCourse}
      onOpenConsultant={(courseTitle, poloName) =>
        onOpenConsultant(courseTitle || course.title, poloName)
      }
      onSelectPolo={onSelectPolo}
      onNavigatePolos={() => navigate(PATHS.home)}
    />
  );
}

function PoloDetailRoute({
  onSelectCourse,
  onSelectPolo,
  onOpenConsultant,
}: {
  onSelectCourse: (course: Course) => void;
  onSelectPolo: (polo: Polo) => void;
  onOpenConsultant: (courseTitle?: string, poloName?: string) => void;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\//, '');
  const polo = findPoloBySlug(slug);

  if (!polo) {
    return <Navigate to={PATHS.home} replace />;
  }

  return (
    <PoloDetailPage
      polo={polo}
      onBackToPolos={() => navigate(PATHS.home)}
      onOpenConsultant={(name) => onOpenConsultant(name || polo.name)}
      onSelectCourse={onSelectCourse}
      onNavigateGraduation={() => navigate(PATHS.graduacao)}
      onNavigatePostGrad={() => navigate(PATHS.posGraduacao)}
      onSelectOtherPolo={onSelectPolo}
    />
  );
}

function BlogPostRoute({
  onSelectArticle,
  onOpenConsultant,
}: {
  onSelectArticle: (article: NewsArticle) => void;
  onOpenConsultant: (courseTitle?: string, poloName?: string) => void;
}) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    if (!slug) {
      setStatus('missing');
      return;
    }
    let active = true;
    setStatus('loading');
    fetchBlogPost(slug)
      .then((found) => {
        if (!active) return;
        setArticle(found);
        setStatus(found ? 'ready' : 'missing');
      })
      .catch(() => {
        if (active) setStatus('missing');
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400 text-sm">
        Carregando postagem...
      </div>
    );
  }

  if (status === 'missing' || !article) {
    return <Navigate to={PATHS.blog} replace />;
  }

  return (
    <BlogPostPage
      article={article}
      onBackToBlog={() => navigate(PATHS.blog)}
      onNavigateHome={() => navigate(PATHS.home)}
      onSelectArticle={onSelectArticle}
      onOpenConsultant={(subject) => onOpenConsultant(subject || article.title)}
    />
  );
}
