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
  id_eta: number
  nome: string
  prazo: string
  status: StatusEtapa
  funcionario: Funcionario[]
}

export interface Teste{
  id_tes: number
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