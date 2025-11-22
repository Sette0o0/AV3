export const NivelPermissao = {
  Administrador: 1,
  Engenheiro: 2,
  Operador: 3,
} as const;

export type NivelPermissao = typeof NivelPermissao[keyof typeof NivelPermissao];

export function getPermissaoNome(nivel: number): string {
  const entry = Object.entries(NivelPermissao).find(([_, value]) => value === nivel);
  return entry ? entry[0] : "Desconhecido";
}

export function getPermissaoNumero(nome: string): number {
  const entry = Object.entries(NivelPermissao).find(([key]) => key.toLowerCase() === nome.toLowerCase());
  return entry ? entry[1] : 0;
}
