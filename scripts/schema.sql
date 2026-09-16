CREATE TABLE IF NOT EXISTS cursos (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('graduacao', 'pos')),
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  categoria_raw TEXT,
  category_badge TEXT NOT NULL,
  sobre TEXT,
  imagem TEXT,
  url_path TEXT,
  formacao TEXT,
  duracao TEXT,
  modalidade TEXT,
  preco NUMERIC,
  meta_title TEXT,
  meta_description TEXT,
  img_alt TEXT,
  mercado_trabalho TEXT,
  area_atuacao_texto TEXT,
  indicacao_texto TEXT,
  aprendizados JSONB NOT NULL DEFAULT '[]'::jsonb,
  indicacoes JSONB NOT NULL DEFAULT '[]'::jsonb,
  areas_atuacao JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS curso_ofertas (
  id SERIAL PRIMARY KEY,
  curso_id INTEGER NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
  chave TEXT,
  duracao TEXT,
  parcelas INTEGER,
  modalidade TEXT,
  formacao TEXT,
  valor NUMERIC
);

CREATE INDEX IF NOT EXISTS idx_cursos_tipo ON cursos (tipo);
CREATE INDEX IF NOT EXISTS idx_cursos_slug ON cursos (slug);
CREATE INDEX IF NOT EXISTS idx_curso_ofertas_curso ON curso_ofertas (curso_id);
