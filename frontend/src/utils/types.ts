import type { NivelPermissao, ResultadoTeste, StatusEtapa, StatusPeca, TipoAeronave, TipoPeca, TipoTeste } from "./enums";

export interface FormLogintype{
  usuario: string
  senha: string
}

export interface User{
  id: number,
  nome: string,
  usuario: string,
  nivel_permissao: NivelPermissao,
}

export interface AuthContextType {
  user: User | null;
  login: (usuario: FormLogintype) => any;
  logout: () => void;
  loading: boolean;
}

export interface Funcionario{
  id_func: number
  nome: string
  telefone: string
  endereco: string
  usuario: string
  nivel_permissao: NivelPermissao
}

export interface Peca{
  id_pec: number
  nome: string
  tipo: TipoPeca
  fornecedor: string
  status: StatusPeca
}

export interface Etapa{
  nome: string
  prazo: string
  status: StatusEtapa
  funcionarios: Funcionario[]
}

export interface Teste{
  tipo: TipoTeste
  resultado: ResultadoTeste
}

export interface Aeronave{
  id_aero: number
  codigo: string
  modelo: string
  tipo: TipoAeronave
  capacidade: number
  alcance: number
  pecas: Peca[]
  etapas: Etapa[]
  testes: Teste[]
}