import { useMemo } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import type { Peca } from "../../../../../utils/types";
import { normalizarTexto, tirarUnderline } from "../../../../../utils/coisas";

interface props{
  search: string
  filterTipo: string
  filterStatus: string
  pecas: Peca[]
}

export function PecasTableList({search, filterTipo, filterStatus, pecas}: props) {
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<Peca>[]>(
    () => [
      { accessorKey: "nome", header: "Nome" },
      { accessorKey: "tipo", header: "Tipo" },
      { accessorKey: "fornecedor", header: "Fornecedor" },
      { accessorKey: "status", header: "Status", cell: ({ getValue }) => tirarUnderline(String(getValue())) },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return pecas.filter((p) => {
      const matchSearch =
        normalizarTexto(p.nome).includes(normalizarTexto(search));

      const matchTipo =
        filterTipo === "" ||
        normalizarTexto(p.tipo) === normalizarTexto(filterTipo);
        
      const matchStatus =
        filterStatus === "" ||
        normalizarTexto(p.status) === normalizarTexto(filterStatus);

      return matchSearch && matchTipo && matchStatus;
    });
  }, [pecas, search, filterTipo, filterStatus]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <p>Selecione uma Peça</p>
      <table className={`table table-hover`}>
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
              const peca = row.original;
              return (
                <tr style={{cursor: "pointer"}} key={row.id} onClick={() => navigate(`peca/${peca.id_pec}`)}>
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
                Nenhuma Peça encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
