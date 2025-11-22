import { useMemo } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import type { Teste } from "../../../../../utils/types";
import { normalizarTexto } from "../../../../../utils/coisas";

interface props{
  filterTipo: string
  filterStatus: string
  testes: Teste[]
}

export function TestesTableList({filterTipo, filterStatus, testes}: props) {
  const columns = useMemo<ColumnDef<Teste>[]>(
    () => [
      { accessorKey: "tipo", header: "Tipo" },
      { accessorKey: "resultado", header: "Resultado" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return testes.filter((t) => {

      const matchTipo =
        filterTipo === "" ||
        normalizarTexto(t.tipo) === normalizarTexto(filterTipo);
        
      const matchStatus =
        filterStatus === "" ||
        normalizarTexto(t.resultado) === normalizarTexto(filterStatus);

      return matchTipo && matchStatus;
    });
  }, [testes, filterTipo, filterStatus]);

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
            table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )}
            )
          ) : (
            <tr>
              <td colSpan={columns.length}>
                Nenhuma Teste encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
