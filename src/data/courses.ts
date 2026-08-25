import { Course } from '../types';

export const COURSES_DATA: Course[] = [
  // --- GRADUAÇÃO ---
  {
    id: 'adm',
    title: 'Administração',
    category: 'Negócios',
    categoryBadge: 'NEGÓCIOS',
    badge: 'Mais Procurado',
    rating: 4.9,
    duration: '8 semestres',
    students: '12.400 alunos',
    price: 97,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    description: 'Prepare-se para liderar empresas, gerenciar processos estratégicos, finanças, marketing e novos negócios com visão global e adaptabilidade digital.',
    modality: 'EAD',
    modules: [
      'Gestão Estratégica e Liderança',
      'Finanças Corporativas e Controladoria',
      'Marketing Digital e Comportamento do Consumidor',
      'Empreendedorismo e Inovação'
    ],
    careerOpportunities: [
      'Gerente ou Diretor Administrativo',
      'Consultor Empresarial',
      'Analista Financeiro',
      'Gestor de Projetos e Processos'
    ]
  },
  {
    id: 'pedagogia',
    title: 'Pedagogia',
    category: 'Educação',
    categoryBadge: 'EDUCAÇÃO',
    badge: 'Alta Procura',
    rating: 4.9,
    duration: '8 semestres',
    students: '21.000 alunos',
    price: 89,
    originalPrice: 210,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Prepare-se para transformar a educação infantil, ensino fundamental, gestão escolar, alfabetização e pedagogia empresarial.',
    modality: 'EAD',
    modules: [
      'Psicologia da Educação e Aprendizagem',
      'Gestão Escolar e Coordenação Pedagógica',
      'Alfabetização e Letramento',
      'Novas Tecnologias na Educação'
    ],
    careerOpportunities: [
      'Professor de Educação Infantil e Anos Iniciais',
      'Coordenador Pedagógico',
      'Diretor de Instituição de Ensino',
      'Pedagogo Empresarial e Hospitalar'
    ]
  },
  {
    id: 'farmacia',
    title: 'Farmácia',
    category: 'Saúde',
    categoryBadge: 'SAÚDE',
    badge: 'Nota Máxima MEC',
    rating: 4.9,
    duration: '10 semestres',
    students: '8.900 alunos',
    price: 169,
    originalPrice: 360,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80',
    description: 'Formação científica e humanizada em ciências farmacêuticas, medicamentos, análises clínicas, toxicologia e farmácia clínica.',
    modality: 'Semipresencial',
    modules: [
      'Química Farmacêutica e Bioquímica',
      'Farmacologia e Toxicologia Clínica',
      'Tecnologia de Medicamentos e Cosméticos',
      'Análises Clínicas e Farmácia Hospitalar'
    ],
    careerOpportunities: [
      'Farmacêutico Clínico e Hospitalar',
      'Responsável Técnico em Drogarias e Farmácias de Manipulação',
      'Analista em Indústrias Farmacêuticas e Cosméticas',
      'Especialista em Análises Clínicas e Toxicológicas'
    ]
  },
  {
    id: 'nutricao',
    title: 'Nutrição',
    category: 'Saúde',
    categoryBadge: 'SAÚDE',
    badge: 'Alta Demanda',
    rating: 4.9,
    duration: '8 semestres',
    students: '9.400 alunos',
    price: 139,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    description: 'Aprenda a prescrever dietas individualizadas, atuar na promoção da saúde, nutrição esportiva, clínica, estética e gestão de alimentação coletiva.',
    modality: 'Semipresencial',
    modules: [
      'Bioquímica e Fisiologia da Nutrição',
      'Avaliação e Diagnóstico Nutricional',
      'Dietoterapia e Nutrição Clínica',
      'Nutrição Esportiva e Funcional'
    ],
    careerOpportunities: [
      'Nutricionista Clínico e de Consultório',
      'Nutricionista Esportivo para Atletas e Academias',
      'Gestor de Alimentação Coletiva (UAN / Restaurantes)',
      'Nutricionista em Saúde Pública e Escolar'
    ]
  },
  {
    id: 'direito',
    title: 'Direito',
    category: 'Jurídico',
    categoryBadge: 'JURÍDICO',
    badge: 'Prestígio',
    rating: 4.8,
    duration: '10 semestres',
    students: '9.800 alunos',
    price: 189,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    description: 'Formação jurídica completa com foco em legislação contemporânea, direito digital, advocacia empresarial, direito constitucional e preparação para a OAB.',
    modality: 'Semipresencial',
    modules: [
      'Direito Constitucional e Direitos Humanos',
      'Direito Civil e Processual Civil',
      'Direito Penal e Criminologia',
      'Direito Digital, LGPD e Compliance'
    ],
    careerOpportunities: [
      'Advogado Privado ou Corporativo',
      'Concurseiro (Juiz, Promotor, Defensor)',
      'Consultor Jurídico',
      'Especialista em Compliance'
    ]
  },
  {
    id: 'psicologia',
    title: 'Psicologia',
    category: 'Saúde',
    categoryBadge: 'SAÚDE',
    badge: 'Novo',
    rating: 4.9,
    duration: '10 semestres',
    students: '7.200 alunos',
    price: 149,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description: 'Estude os processos mentais, neuropsicologia e comportamento humano para atuar em clínicas, hospitais, escolas e recursos humanos.',
    modality: 'Semipresencial',
    modules: [
      'Neuropsicologia e Desenvolvimento Humano',
      'Psicopatologia e Diagnóstico',
      'Teorias e Técnicas Psicoterapêuticas',
      'Psicologia Organizacional e do Trabalho'
    ],
    careerOpportunities: [
      'Psicólogo Clínico',
      'Psicólogo Organizacional (RH)',
      'Psicólogo Hospitalar',
      'Pesquisador e Docente'
    ]
  },
  {
    id: 'eng-software',
    title: 'Engenharia de Software',
    category: 'Tecnologia',
    categoryBadge: 'TECNOLOGIA',
    badge: 'Top 1',
    rating: 5.0,
    duration: '8 semestres',
    students: '15.100 alunos',
    price: 119,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Aprenda desenvolvimento Full Stack, arquitetura de sistemas em nuvem, Inteligência Artificial, metodologias ágeis e engenharia de dados.',
    modality: 'EAD',
    modules: [
      'Algoritmos e Estruturas de Dados Avançadas',
      'Desenvolvimento Web e Mobile (React / Node)',
      'Cloud Computing e Arquitetura Microserviços',
      'Inteligência Artificial e Machine Learning'
    ],
    careerOpportunities: [
      'Desenvolvedor Full Stack',
      'Engenheiro de Software Cloud',
      'Arquiteto de Soluções Tech',
      'Engenheiro de IA e Dados'
    ]
  },
  {
    id: 'ads',
    title: 'Análise e Desenvolvimento de Sistemas',
    category: 'Tecnologia',
    categoryBadge: 'TECNOLOGIA',
    badge: 'Alta Empregabilidade',
    rating: 4.9,
    duration: '5 semestres',
    students: '18.300 alunos',
    price: 97,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    description: 'Curso superior de tecnologia focado em entrada rápida no mercado de TI, programando desde os primeiros semestres.',
    modality: 'EAD',
    modules: [
      'Lógica de Programação e Python',
      'Banco de Dados Relacional e NoSQL',
      'Desenvolvimento Front-end & Back-end',
      'Segurança da Informação e DevOps'
    ],
    careerOpportunities: [
      'Desenvolvedor Front-End / Back-End',
      'Analista de Sistemas',
      'Analista de Banco de Dados',
      'Tester / QA Engineer'
    ]
  },
  {
    id: 'enfermagem',
    title: 'Enfermagem',
    category: 'Saúde',
    categoryBadge: 'SAÚDE',
    badge: 'Reconhecimento MEC 5',
    rating: 4.8,
    duration: '10 semestres',
    students: '6.400 alunos',
    price: 179,
    originalPrice: 380,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    description: 'Formação humanizada e técnica com laboratórios virtuais e práticas supervisionadas para atuar na promoção e assistência à saúde.',
    modality: 'Semipresencial',
    modules: [
      'Anatomia Humana e Fisiologia',
      'Farmacologia Aplicada à Enfermagem',
      'Urgência, Emergência e UTI',
      'Saúde Coletiva e Enfermagem Comunitária'
    ],
    careerOpportunities: [
      'Enfermeiro Hospitalar',
      'Gestor de Unidades de Saúde',
      'Enfermeiro Intensivista',
      'Auditor em Saúde'
    ]
  },
  {
    id: 'contabeis',
    title: 'Ciências Contábeis',
    category: 'Negócios',
    categoryBadge: 'NEGÓCIOS',
    badge: 'MEC Nota 5',
    rating: 4.8,
    duration: '8 semestres',
    students: '11.500 alunos',
    price: 97,
    originalPrice: 230,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    description: 'Domine contabilidade corporativa, auditoria, perícia contábil, planejamento tributário e gestão de finanças públicas e privadas.',
    modality: 'EAD',
    modules: [
      'Contabilidade Geral e Introdutória',
      'Auditoria e Perícia Contábil',
      'Legislação Tributária e Fiscal',
      'Análise de Demonstrações Financeiras'
    ],
    careerOpportunities: [
      'Contador Certificado (CRC)',
      'Auditor Fiscal e Contábil',
      'Perito Judicial',
      'Controller e Consultor Financeiro'
    ]
  },
  {
    id: 'gestao-rh',
    title: 'Gestão de Recursos Humanos',
    category: 'Negócios',
    categoryBadge: 'NEGÓCIOS',
    badge: 'Rápida Formação',
    rating: 4.9,
    duration: '4 semestres',
    students: '14.200 alunos',
    price: 89,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'Tecnólogo em RH com foco em atração de talentos, People Analytics, treinamento, cultura organizacional e legislação trabalhista.',
    modality: 'EAD',
    modules: [
      'Recrutamento, Seleção e Onboarding',
      'People Analytics e Indicadores de RH',
      'Cultura, Clima e Desenvolvimento Humano',
      'Relações Trabalhistas e Departamento Pessoal'
    ],
    careerOpportunities: [
      'Analista ou Gerente de RH',
      'Business Partner (BP)',
      'Especialista em Treinamento & Desenvolvimento',
      'Consultor de Seleção de Talentos'
    ]
  },

  // --- PÓS-GRADUAÇÃO & MBA ---
  {
    id: 'pos-ia',
    title: 'Pós em Inteligência Artificial e Data Science',
    category: 'Tecnologia',
    categoryBadge: 'PÓS-GRADUAÇÃO',
    badge: 'Lançamento',
    rating: 5.0,
    duration: '2 semestres',
    students: '4.800 alunos',
    price: 149,
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Especialização executiva focada em Machine Learning, Deep Learning, Processamento de Linguagem Natural, visão computacional e MLOps.',
    modality: 'EAD',
    modules: [
      'Fundamentos de Machine Learning e Python',
      'Deep Learning e Redes Neurais',
      'LLMs e IA Generativa na Prática',
      'Métricas, MLOps e Governança de IA'
    ],
    careerOpportunities: [
      'Especialista em IA e Machine Learning',
      'Cientista de Dados Sênior',
      'Engenheiro de Prompt e LLMs',
      'Líder de Inovação e Dados'
    ]
  },
  {
    id: 'mba-gestao-estrategica',
    title: 'MBA em Gestão Estratégica e Liderança',
    category: 'Negócios',
    categoryBadge: 'PÓS-GRADUAÇÃO',
    badge: 'Executivo',
    rating: 4.9,
    duration: '2 semestres',
    students: '6.200 alunos',
    price: 139,
    originalPrice: 310,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Desenvolva habilidades de alta liderança, tomada de decisão estratégica sob incerteza, negociação de alto impacto e governança.',
    modality: 'EAD',
    modules: [
      'Liderança Transformacional e Gestão de Pessoas',
      'Planejamento Estratégico e Cenários Prospectivos',
      'Finanças para Tomada de Decisão Executiva',
      'Gestão da Inovação e Transformação Ágil'
    ],
    careerOpportunities: [
      'C-Level (CEO, COO, CFO)',
      'Diretor ou Gerente Geral',
      'Consultor Estratégico',
      'Conselheiro Empresarial'
    ]
  },
  {
    id: 'pos-psicopedagogia',
    title: 'Pós em Psicopedagogia Clínica e Institucional',
    category: 'Educação',
    categoryBadge: 'PÓS-GRADUAÇÃO',
    badge: 'Alta Demanda',
    rating: 4.9,
    duration: '2 semestres',
    students: '5.100 alunos',
    price: 129,
    originalPrice: 280,
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    description: 'Capacitação completa para identificar, intervir e tratar dificuldades e transtornos de aprendizagem em escolas, clínicas e empresas.',
    modality: 'EAD',
    modules: [
      'Fundamentos da Psicopedagogia',
      'Diagnóstico e Avaliação Psicopedagógica',
      'Intervenção nos Transtornos de Aprendizagem (TDAH, Dislexia, TEA)',
      'Neurociência Aplicada à Educação'
    ],
    careerOpportunities: [
      'Psicopedagogo Clínico',
      'Consultor em Instituições Escolares',
      'Assessor Pedagógico Especializado',
      'Coordenador de Inclusão e Acessibilidade'
    ]
  },
  {
    id: 'pos-direito-digital',
    title: 'Pós em Direito Digital, LGPD e Cibersegurança',
    category: 'Jurídico',
    categoryBadge: 'PÓS-GRADUAÇÃO',
    badge: 'Em Alta',
    rating: 4.9,
    duration: '2 semestres',
    students: '3.900 alunos',
    price: 159,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    description: 'Especialize-se na regulação da internet, proteção de dados pessoais (LGPD/GDPR), contratos de tecnologia, crimes cibernéticos e compliance.',
    modality: 'EAD',
    modules: [
      'Marco Civil da Internet e Legislação Digital',
      'LGPD, Governança de Dados e DPO',
      'Segurança da Informação e Gestão de Incidentes',
      'Contratos Tech, IA e Propriedade Intelectual'
    ],
    careerOpportunities: [
      'Encarregado de Dados (DPO)',
      'Advogado Especialista em Direito Digital',
      'Consultor de Compliance e Privacidade',
      'Assessor Jurídico Tech'
    ]
  },
  {
    id: 'pos-gestao-saude',
    title: 'MBA em Gestão Hospitalar e Serviços de Saúde',
    category: 'Saúde',
    categoryBadge: 'PÓS-GRADUAÇÃO',
    badge: 'Gestão',
    rating: 4.8,
    duration: '2 semestres',
    students: '4.300 alunos',
    price: 149,
    originalPrice: 330,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    description: 'Formação executiva para administração de hospitais, clínicas, laboratórios, operadoras de saúde e órgãos públicos do SUS.',
    modality: 'EAD',
    modules: [
      'Gestão da Qualidade e Acreditação Hospitalar (ONA)',
      'Faturamento, Auditoria e Custos em Saúde',
      'Logística e Cadeia de Suprimentos Médicos',
      'Legislação Sanitária e Direito Médico'
    ],
    careerOpportunities: [
      'Administrador Hospitalar',
      'Gerente de Operações Clínicas',
      'Auditor de Contas Médicas',
      'Consultor em Saúde Pública e Privada'
    ]
  },
  {
    id: 'pos-marketing-digital',
    title: 'MBA em Marketing Digital, Growth e Performance',
    category: 'Negócios',
    categoryBadge: 'PÓS-GRADUAÇÃO',
    badge: 'Performance',
    rating: 5.0,
    duration: '2 semestres',
    students: '7.800 alunos',
    price: 139,
    originalPrice: 290,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Domine estratégias de tráfego pago, SEO, funis de vendas, Growth Hacking, automação de marketing e métricas de conversão.',
    modality: 'EAD',
    modules: [
      'Tráfego Pago Avançado (Meta Ads, Google Ads, TikTok Ads)',
      'Growth Hacking e Otimização de Conversão (CRO)',
      'Inbound Marketing, Conteúdo e SEO',
      'Analytics, Attribution Models e Dashboarding'
    ],
    careerOpportunities: [
      'Head de Marketing / Growth Lead',
      'Gestor de Tráfego e Performance',
      'Estrategista de Inbound e CRM',
      'Consultor de Marketing Digital'
    ]
  }
];

export const GRADUATION_COURSES = COURSES_DATA.filter(
  (c) => c.categoryBadge !== 'PÓS-GRADUAÇÃO'
);

export const POSTGRAD_COURSES = COURSES_DATA.filter(
  (c) => c.categoryBadge === 'PÓS-GRADUAÇÃO'
);

export const FEATURED_COURSES: Course[] = ['adm', 'pedagogia', 'farmacia', 'nutricao']
  .map((id) => COURSES_DATA.find((c) => c.id === id))
  .filter((c): c is Course => Boolean(c));

