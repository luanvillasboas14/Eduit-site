import { useEffect } from 'react';
import { applySeo, SeoContent } from '../lib/seo';

export function Seo({ title, description, path }: SeoContent & { path?: string }) {
  useEffect(() => {
    applySeo({ title, description }, path);
  }, [title, description, path]);
  return null;
}
