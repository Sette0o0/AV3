export interface FormLogintype{
  usuario: string
  senha: string
}

export interface User{
  id: number,
  nome: string,
  usuario: string,
  cargo: number,
}

export interface AuthContextType {
  user: User | null;
  login: (usuario: FormLogintype) => any;
  logout: () => void;
  loading: boolean;
}

export interface Funcionario{
  id: number
  nome: string
  telefone: string
  endereco: string
  usuario: string
  nivelPermissao: number
}

export interface Peca{
  nome: string
  tipo: "Nacional" | "Importada"
  fornecedor: string
  status: "Em Produção" | "Em Transporte" | "Pronta"
}

export interface Etapa{
  nome: string
  prazo: string
  status: "Pendente" | "Em Andamento" | "Concluída"
  funcionarios: Funcionario[]
}

export interface Teste{
  tipo: "Elétrico" | "Hidráulico" | "Aerodinâmico"
  resultado: "Aprovado" | "Reprovado"
}

export interface Aeronave{
  codigo: string
  modelo: string
  tipo: "Comercial" | "Militar"
  capacidade: number
  alcance: number
  pecas: Peca[]
  etapas: Etapa[]
  testes: Teste[]
}