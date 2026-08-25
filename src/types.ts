export interface Course {
  id: string;
  title: string;
  category: string;
  categoryBadge: string; // e.g. 'NEGÓCIOS', 'JURÍDICO'
  badge?: string; // e.g. 'Mais Procurado', 'Prestígio', 'Novo', 'Top 1'
  rating: number;
  duration: string; // e.g. '8 semestres'
  students: string; // e.g. '12.400 alunos'
  price: number; // e.g. 97
  originalPrice?: number;
  image: string;
  description: string;
  modality: string; // e.g. '100% Online (EAD)'
  modules: string[];
  careerOpportunities: string[];
}

export interface Professor {
  id: string;
  name: string;
  title: string; // e.g. 'Prof. Dr. Carlos Mendes'
  department: string; // e.g. 'DIREITO EMPRESARIAL'
  experience: string; // e.g. '18 anos de docência'
  avatar: string;
  bio: string;
  education: string;
}

export interface EntryMethod {
  id: string;
  title: string;
  badge: string;
  description: string;
  highlight: string;
  iconName: string;
}

export interface NewsArticle {
  id: string;
  badge: string;
  badgeColor?: string;
  category: string; // e.g. 'Vestibular', 'Carreira', 'Tecnologia', 'Educação', 'Dicas de Estudo', 'Parcerias'
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  image?: string;
  isFeatured?: boolean;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags?: string[];
}

export interface Polo {
  id: string;
  name: string;
  city: string;
  state: string;
  neighborhood: string;
  address: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: string;
  mapsUrl: string;
  image?: string;
  gallery?: string[];
  featured?: boolean;
  hubEad?: boolean;
}

