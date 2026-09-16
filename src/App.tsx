import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { SearchPage } from './components/SearchPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Seo } from './components/Seo';

import { CourseModal } from './components/CourseModal';
import { ConsultantModal } from './components/ConsultantModal';
import { VideoModal } from './components/VideoModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTopButton } from './components/ScrollToTopButton';

import { Course, NewsArticle, Polo } from './types';
import { fetchBlogPost } from './lib/supabase';
import { fetchCourseBySlug } from './lib/courses';
import { captureGclidFromUrl } from './lib/leads';
import { initAnalytics, trackCta, trackCourseClick, trackPageView, trackPoloClick } from './lib/analytics';
import { seoForBlogCategory, seoForPath } from './lib/seo';
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
  findPoloBySlug,
  isPostgradCourse,
  poloPath,
  postPath,
} from './data/siteUrls';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    captureGclidFromUrl();
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);
  return null;
}

export default function App() {
  const navigate = useNavigate();

  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [isConsultantOpen, setIsConsultantOpen] = useState<boolean>(false);
  const [consultantCourseTitle, setConsultantCourseTitle] = useState<string>('');
  const [consultantPoloName, setConsultantPoloName] = useState<string>('');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  useEffect(() => {
    initAnalytics();
  }, []);

  const handleOpenConsultant = (courseTitle: string = '', poloName: string = '') => {
    trackCta(courseTitle || poloName ? 'consultar_valores' : 'fale_conosco');
    setConsultantCourseTitle(courseTitle);
    setConsultantPoloName(poloName);
    setIsConsultantOpen(true);
  };

  const handleHeaderSearch = (query: string) => {
    const q = query.trim();
    navigate(q ? `${PATHS.busca}?q=${encodeURIComponent(q)}` : PATHS.busca);
  };

  const handleSelectCourse = (course: Course) => {
    trackCourseClick(course.title, course.id);
    navigate(coursePath(course));
  };

  const handleSelectPolo = (polo: Polo) => {
    trackPoloClick(polo.name, polo.id);
    navigate(poloPath(polo));
  };

  const handleSelectArticle = (article: NewsArticle) => {
    navigate(postPath(article));
  };

  const homeSeo = seoForPath(PATHS.home);

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 font-sans selection:bg-yellow-400 selection:text-slate-950">
      <ScrollToTop />
      <Header
        onOpenConsultant={() => handleOpenConsultant()}
        onSearch={handleHeaderSearch}
      />

      <main>
        <Routes>
          <Route
            path={PATHS.home}
            element={
              <>
                <Seo {...homeSeo} path={PATHS.home} />
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
            path={PATHS.busca}
            element={
              <SearchPage
                onSelectCourse={handleSelectCourse}
                onSelectPolo={handleSelectPolo}
                onSelectArticle={handleSelectArticle}
                onNavigateHome={() => navigate(PATHS.home)}
              />
            }
          />

          <Route
            path={PATHS.blog}
            element={
              <>
                <Seo {...seoForPath(PATHS.blog)} path={PATHS.blog} />
                <NewsPage
                  onSelectArticle={handleSelectArticle}
                  onOpenConsultant={() => handleOpenConsultant()}
                  onNavigateHome={() => navigate(PATHS.home)}
                  onCategoryChange={(category) => navigate(blogCategoryPath(category))}
                />
              </>
            }
          />

          {BLOG_CATEGORIES.map((category) => (
            <React.Fragment key={category.path}>
            <Route
              path={category.path}
              element={
                <>
                  <Seo {...seoForBlogCategory(category.name)} path={category.path} />
                  <NewsPage
                    onSelectArticle={handleSelectArticle}
                    onOpenConsultant={() => handleOpenConsultant()}
                    onNavigateHome={() => navigate(PATHS.home)}
                    initialCategory={category.name}
                    onCategoryChange={(name) => navigate(blogCategoryPath(name))}
                  />
                </>
              }
            />
            </React.Fragment>
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
              <>
                <Seo {...seoForPath(PATHS.graduacao)} path={PATHS.graduacao} />
                <CoursesPage
                  onSelectCourse={handleSelectCourse}
                  onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                  onCategoryChange={(cat) => navigate(GRAD_CATEGORY_BY_NAME[cat] ?? PATHS.graduacao)}
                  onClearFilters={() => navigate(PATHS.graduacao)}
                />
              </>
            }
          />

          {Object.entries(GRAD_CATEGORY_ROUTES).map(([path, filter]) => (
            <React.Fragment key={path}>
            <Route
              path={path}
              element={
                <>
                  <Seo {...seoForPath(path)} path={path} />
                  <CoursesPage
                    onSelectCourse={handleSelectCourse}
                    onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                    initialCategory={filter.category}
                    initialModality={filter.modality ?? 'Todas'}
                    titleIncludes={filter.titleIncludes}
                    onCategoryChange={(cat) => navigate(GRAD_CATEGORY_BY_NAME[cat] ?? PATHS.graduacao)}
                    onClearFilters={() => navigate(PATHS.graduacao)}
                  />
                </>
              }
            />
            </React.Fragment>
          ))}

          <Route
            path={PATHS.posGraduacao}
            element={
              <>
                <Seo {...seoForPath(PATHS.posGraduacao)} path={PATHS.posGraduacao} />
                <PostGradPage
                  onSelectCourse={handleSelectCourse}
                  onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                  onCategoryChange={(cat) => {
                    const next = POS_CATEGORY_BY_NAME[cat];
                    if (next) navigate(next);
                  }}
                  onClearFilters={() => navigate(PATHS.posGraduacao)}
                />
              </>
            }
          />

          {Object.entries(POS_CATEGORY_ROUTES).map(([path, filter]) => (
            <React.Fragment key={path}>
            <Route
              path={path}
              element={
                <>
                  <Seo {...seoForPath(path)} path={path} />
                  <PostGradPage
                    onSelectCourse={handleSelectCourse}
                    onOpenConsultant={(courseTitle) => handleOpenConsultant(courseTitle)}
                    initialCategory={filter.category}
                    titleIncludes={filter.titleIncludes}
                    onCategoryChange={(cat) => {
                      const next = POS_CATEGORY_BY_NAME[cat];
                      if (next) navigate(next);
                    }}
                    onClearFilters={() => navigate(PATHS.posGraduacao)}
                  />
                </>
              }
            />
            </React.Fragment>
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
            <React.Fragment key={path}>
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
            </React.Fragment>
          ))}

          <Route path="*" element={<NotFoundPage />} />
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
  const isPosPath = pathname.startsWith('/pos/');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchCourseBySlug(slug)
      .then((found) => {
        if (!active) return;
        setCourse(found ?? null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-300 text-sm">
        Carregando curso...
      </div>
    );
  }

  if (!course || isPostgradCourse(course) !== isPosPath) {
    return <NotFoundPage />;
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
    return <NotFoundPage />;
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
    return <NotFoundPage />;
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
