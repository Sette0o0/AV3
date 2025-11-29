export function normalizarTexto(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function formatarTelefone(numero: string = ""): string{
  numero = numero.replace(/\D/g, "");

  numero = numero.slice(0, 11);
  numero = numero.replace(/^(\d{2})(\d)/g, '($1) $2');
  numero = numero.replace(/(\d{5})(\d)/, '$1-$2');

  return numero;
}

export function tirarUnderline(text: string = ""): string{
  return text
    .replaceAll("_", " ")
}

export function formatarData(dataIso: string): string{
  const data = dataIso.split("T")[0].split(" ")[0];

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}