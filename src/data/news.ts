import { NewsArticle } from '../types';

export const NEWS_DATA: NewsArticle[] = [
  {
    id: 'vestibular-2025',
    category: 'Vestibular',
    badge: 'Vestibular',
    badgeColor: 'yellow',
    title: 'Inscrições abertas para o Vestibular 2025/2 da Cruzeiro do Sul Virtual',
    summary: 'Mais de 500 vagas disponíveis em cursos de graduação e pós-graduação com mensalidades a partir de R$ 97. Inscreva-se agora e garanta sua vaga.',
    content: `A Cruzeiro do Sul Virtual anunciou nesta semana a abertura oficial das inscrições para o Vestibular 2025/2. Com centenas de opções entre bacharelados, licenciaturas, tecnólogos e pós-graduações, a instituição reforça seu compromisso com o ensino de excelência e acessível a estudantes de todo o território nacional.

Os candidatos poderão realizar a prova 100% online de forma gratuita ou utilizar a nota do ENEM para ingresso direto com bolsas de estudo de até 100% de desconto. Além disso, as mensalidades promocionais de abertura de semestre iniciam em apenas R$ 97 por mês.

"Nosso modelo de ensino combina flexibilidade total de horários com laboratórios virtuais de última geração e tutoria individualizada", destacou a diretoria acadêmica.

As inscrições ficam abertas até o final do mês pelo portal oficial ou com a ajuda direta da equipe de consultores educacionais via WhatsApp.`,
    date: '14 Abr 2025',
    readTime: '3 min de leitura',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    author: {
      name: 'Comitê Acadêmico',
      role: 'Processo Seletivo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Vestibular', 'Inscrições', 'Graduação', 'Bolsas']
  },
  {
    id: 'plataforma-ai',
    category: 'Tecnologia',
    badge: 'Inovação',
    title: 'Nova plataforma de ensino EAD é lançada com recursos de inteligência artificial',
    summary: 'A nova versão do ambiente virtual conta com tutor inteligente 24/7, suporte a resumos em áudio e trilhas personalizadas de aprendizagem.',
    content: `A Cruzeiro do Sul Virtual lança sua plataforma de estudos totalmente reformulada, integrando modelos de Inteligência Artificial generativa para apoiar os estudantes 24 horas por dia, 7 dias por semana.

O novo ambiente inteligente se adapta ao ritmo e estilo de estudo de cada aluno, sugerindo exercícios práticos personalizados, diagnósticos de fixação e sanando dúvidas teóricas instantaneamente enquanto o estudante assiste às videoaulas.

Entre os principais recursos lançados estão:
- Tutor Virtual com respostas embasadas nas bibliografias recomendadas pelos professores;
- Gerador de resumos estruturados e podcasts de áudio para quem estuda em trânsito;
- Dashboard analítico de desempenho com métricas claras de evolução acadêmica.`,
    date: '10 Abr 2025',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Equipe EdTech',
      role: 'Inovação Digital',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Tecnologia', 'IA', 'EAD', 'Ambiente Virtual']
  },
  {
    id: 'profissoes-alta-2025',
    category: 'Carreira',
    badge: 'Carreira',
    title: 'As 10 profissões em alta mais demandadas pelo mercado de trabalho em 2025',
    summary: 'Setores de Tecnologia da Informação, Gestão Financeira, Saúde e Direito Digital lideram as contratações com os maiores salários médios.',
    content: `Com as transformações no mercado de trabalho e o avanço da automação, novas competências profissionais passaram a ser altamente valorizadas pelas empresas. Áreas como Análise de Dados, Engenharia de Software, Gestão de Recursos Humanos Estratégica e Cibersegurança lideram o ranking de contratações no Brasil.

De acordo com o levantamento do Observatório do Ensino Superior, profissionais formados com sólida base técnica e habilidades comportamentais (soft skills) têm taxa de empregabilidade superior a 87% nos primeiros seis meses após a conclusão do curso.

Cursos como Análise e Desenvolvimento de Sistemas, Gestão Financeira, Biomedicina e Administração continuam no topo do interesse dos recrutadores.`,
    date: '05 Abr 2025',
    readTime: '5 min de leitura',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Mariana Duarte',
      role: 'Especialista em Carreiras',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Carreira', 'Mercado', 'Empregabilidade', 'Salários']
  },
  {
    id: 'rotina-produtividade-ead',
    category: 'Dicas de Estudo',
    badge: 'Dicas de Estudo',
    title: 'Guia definitivo: como organizar sua rotina de estudos no EAD sem procrastinar',
    summary: 'Confira técnicas comprovadas de gestão de tempo como Pomodoro, blocos de tempo e criação de ambiente adequado para render mais.',
    content: `Estudar a distância oferece autonomia ímpar, mas exige disciplina e organização para manter o foco constante.

Para ajudar você a alcançar o melhor rendimento, nossos tutores pedagógicos reuniram as 5 práticas mais eficazes:

1. **Defina horários fixos de estudo**: Mesmo sem precisar se deslocar até um campus físico, ter um compromisso diário na sua agenda ajuda o cérebro a entrar no estado de concentração.
2. **Método Pomodoro**: Estude em blocos de 25 minutos seguidos por 5 minutos de pausa. Isso previne o cansaço mental e melhora a retenção.
3. **Crie um espaço livre de distrações**: Reserve uma mesa silenciosa, deixe o celular no modo foco e organize os materiais de apoio com antecedência.
4. **Participe dos fóruns e grupos de mentoria**: Tirar dúvidas logo que surgem acelera o aprendizado e evita o acúmulo de matérias.
5. **Faça resumos com as próprias palavras**: A síntese ativa é uma das técnicas mais comprovadas pela neurociência para consolidação da memória.`,
    date: '02 Abr 2025',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Profª. Beatriz Ramos',
      role: 'Pedagogia & Tutoria',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Dicas de Estudo', 'Produtividade', 'Foco', 'EAD']
  },
  {
    id: 'parceria-empresas',
    category: 'Parcerias',
    badge: 'Parcerias',
    title: 'Cruzeiro do Sul Virtual firma parceria com empresas do Fortune 500 para estágios',
    summary: 'Alunos de Tecnologia, Administração e Engenharia terão acesso direto a programas de mentoria e contratação acelerada em multinacionais.',
    content: `Estudantes matriculados nos cursos de graduação e pós-graduação EAD da Cruzeiro do Sul Virtual agora contam com o programa exclusivo de aceleração de carreiras em parceria com corporações multinacionais líderes de mercado.

O convênio garante:
- Acesso preferencial a bancos de vagas de estágio remunerado e vagas de trainee;
- Mentorias exclusivas com executivos e engenheiros seniores;
- Desafios práticos e hackathons universitários com premiações e certificados corporativos;
- Aulas magnas gratuitas sobre as principais demandas do mercado global.`,
    date: '28 Mar 2025',
    readTime: '3 min de leitura',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Núcleo de Relações Corporativas',
      role: 'Parcerias Estratégicas',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Parcerias', 'Estágio', 'Carreira', 'Fortune 500']
  },
  {
    id: 'recredenciamento-mec-nota-maxima',
    category: 'Educação',
    badge: 'Excelência',
    title: 'Cruzeiro do Sul Virtual recebe nota máxima em recredenciamento institucional do MEC',
    summary: 'Avaliação rigorosa do Ministério da Educação consagra corpo docente qualificado, estrutura tecnológica e projeto pedagógico inovador.',
    content: `Em recente portaria publicada no Diário Oficial da União, o Ministério da Educação (MEC) concedeu a nota máxima à Cruzeiro do Sul Virtual em seu processo de recredenciamento institucional.

A comissão de avaliadores do MEC analisou mais de 40 indicadores de qualidade acadêmica, destacando:
- A qualificação de mais de 80% do corpo docente formado por Mestres e Doutores;
- A modernidade e estabilidade do ambiente virtual de aprendizagem;
- A infraestrutura dos polos de apoio presencial espalhados por todo o país;
- Os programas de apoio psicopedagógico e acessibilidade para estudantes com deficiência.

O resultado reafirma o posicionamento da instituição entre as melhores universidades de educação a distância do Brasil.`,
    date: '20 Mar 2025',
    readTime: '3 min de leitura',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Reitoria Acadêmica',
      role: 'Qualidade do Ensino',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Educação', 'MEC', 'Nota Máxima', 'Qualidade']
  },
  {
    id: 'diploma-ead-igual-presencial',
    category: 'Educação',
    badge: 'Mitos & Fatos',
    title: 'O diploma de graduação EAD tem o mesmo valor que o presencial? Entenda a legislação',
    summary: 'Entenda como a Lei de Diretrizes e Bases da Educação garante total equivalência de validade jurídica, acadêmica e profissional.',
    content: `Uma das dúvidas mais comuns entre quem está pensando em começar uma faculdade online é sobre a validade do diploma. A resposta da legislação brasileira é categórica: **Sim, o diploma EAD tem exatamente o mesmo valor do diploma presencial**.

Conforme a Lei de Diretrizes e Bases da Educação Nacional (Lei nº 9.394/96) e os decretos regulamentadores do MEC:
- No documento emitido ao final da graduação **não há qualquer menção à modalidade de ensino** (se presencial ou a distância);
- O diploma confere plenos direitos para atuação profissional, inscrição em órgãos de classe (como OAB, CRA, CREA, COREN, etc.);
- É válido para a realização de concursos públicos de nível superior em todas as esferas;
- Permite ingresso em cursos de pós-graduação, mestrado e doutorado em instituições públicas ou privadas no Brasil e no exterior.`,
    date: '15 Mar 2025',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Assessoria Jurídico-Acadêmica',
      role: 'Regulação do Ensino Superior',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Educação', 'Diploma', 'MEC', 'Concurso']
  },
  {
    id: 'bolsas-enem-2025',
    category: 'Vestibular',
    badge: 'Bolsas & Descontos',
    title: 'Como usar a sua nota do ENEM para conseguir bolsas de até 100% no EAD',
    summary: 'Descubra a tabela progressiva de descontos conforme sua pontuação no Exame Nacional do Ensino Médio.',
    content: `Você realizou o ENEM em edições anteriores? Sabia que a sua nota vale bolsas automáticas na Cruzeiro do Sul Virtual sem necessidade de prestar novo vestibular?

A instituição oferece uma tabela progressiva de descontos de acordo com a média aritmética das cinco notas do exame:
- **Acima de 800 pontos**: Bolsa de 100% de desconto durante todo o curso;
- **De 700 a 799 pontos**: Bolsa de 70% de desconto;
- **De 600 a 699 pontos**: Bolsa de 50% de desconto;
- **A partir de 300 pontos (sem zerar a redação)**: Bolsa de até 40% de desconto.

A validação é feita de forma simples e 100% online através do envio do Boletim de Desempenho Individual do INEP.`,
    date: '10 Mar 2025',
    readTime: '3 min de leitura',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Central de Bolsas',
      role: 'Atendimento ao Candidato',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Vestibular', 'ENEM', 'Bolsas', 'Desconto']
  },
  {
    id: 'mercado-ti-ead',
    category: 'Tecnologia',
    badge: 'Mercado Tech',
    title: 'Crescimento do setor de tecnologia abre mais de 100 mil novas vagas em 2025',
    summary: 'Profissionais de desenvolvimento de software, inteligência artificial e segurança da informação estão entre os mais disputados.',
    content: `O relatório anual da Associação das Empresas de Tecnologia da Informação e Comunicação (Brasscom) aponta um déficit de mais de 500 mil talentos na área de tecnologia até o ano de 2027 no Brasil.

Para suprir essa demanda urgente, a Cruzeiro do Sul Virtual desenvolveu matrizes curriculares alinhadas com as principais certificações internacionais (como AWS, Microsoft Azure e Oracle).

Cursos como Engenharia de Software, Ciência da Computação, Análise e Desenvolvimento de Sistemas e Inteligência Artificial contam com projetos práticos semestrais em repositórios reais de código (GitHub), permitindo que o aluno construa um portfólio profissional antes mesmo de se formar.`,
    date: '04 Mar 2025',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Coordenação de Tecnologia',
      role: 'Cursos de TI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    tags: ['Tecnologia', 'Mercado de TI', 'Programação', 'Carreiras']
  }
];
