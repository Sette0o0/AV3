import { useMemo } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { normalizarTexto } from "../../../../../../utils/coisas";
import type { Funcionario } from "../../../../../../utils/types";

interface props{
  search: string
  filterPermissao: string
  funcionarios: Funcionario[]
}

export function FuncionariosTableLista({search, filterPermissao, funcionarios}: props) {
  const columns = useMemo<ColumnDef<Funcionario>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "nome", header: "Nome" },
      { accessorKey: "usuario", header: "Usuário" },
      { accessorKey: "nivelPermissao", header: "Cargo" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return funcionarios.filter((f) => {
      const matchSearch =
        normalizarTexto(f.nome).includes(normalizarTexto(search)) ||
        normalizarTexto(f.usuario).includes(normalizarTexto(search));

      const matchPermissao =
        filterPermissao === "" ||
        String(f.nivel_permissao) === filterPermissao;

      return matchSearch && matchPermissao;
    });
  }, [funcionarios, search, filterPermissao]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <table className={`table`}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={`row-gap-2`}>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                Nenhum funcionário encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
