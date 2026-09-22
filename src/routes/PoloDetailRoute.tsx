import { useNavigate, useLocation } from 'react-router-dom';
import { PoloDetailPage } from '../components/PoloDetailPage';
import { NotFoundPage } from '../components/NotFoundPage';
import { findPoloBySlug } from '../data/polos';
import { PATHS } from '../data/siteUrls';
import { Course, Polo } from '../types';

export function PoloDetailRoute({
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
      onBackToPolos={() => navigate(PATHS.polos)}
      onOpenConsultant={(name) => onOpenConsultant(name || polo.name)}
      onSelectCourse={onSelectCourse}
      onNavigateGraduation={() => navigate(PATHS.graduacao)}
      onNavigatePostGrad={() => navigate(PATHS.posGraduacao)}
      onSelectOtherPolo={onSelectPolo}
    />
  );
}
