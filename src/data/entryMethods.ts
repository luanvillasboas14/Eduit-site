import { EntryMethod } from '../types';

export const ENTRY_METHODS_DATA: EntryMethod[] = [
  {
    id: 'enem',
    title: 'ENEM',
    badge: 'Bolsas até 100%',
    description: 'Use sua nota do ENEM para ingressar sem prestar vestibular e garanta descontos especiais nas suas mensalidades.',
    highlight: 'Sem Prova de Vestibular',
    iconName: 'Award'
  },
  {
    id: 'vestibular',
    title: 'Vestibular',
    badge: '100% Online e Gratuito',
    description: 'Faça sua prova online de onde estiver, no horário que preferir, com resultado rápido e sem custo.',
    highlight: 'Prova Online Gratuita',
    iconName: 'Laptop'
  },
  {
    id: 'transferencia',
    title: 'Transferência',
    badge: 'Aproveite suas Matérias',
    description: 'Traga seus estudos de outra faculdade, elimine disciplinas já cursadas e continue com descontos exclusivos.',
    highlight: 'Aproveitamento de Estudos',
    iconName: 'ArrowRightLeft'
  },
  {
    id: 'segunda-graduacao',
    title: '2ª Graduação',
    badge: 'Portadores de Diploma',
    description: 'Se você já possui um diploma de ensino superior, entre sem vestibular e termine sua segunda faculdade mais rápido.',
    highlight: 'Dispensa de Vestibular',
    iconName: 'GraduationCap'
  }
];
