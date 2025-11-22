import { useMemo } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import type { Etapa } from "../../../../../utils/types";
import { normalizarTexto } from "../../../../../utils/coisas";

interface props{
  search: string
  filterStatus: string
  etapas: Etapa[]
}

export function EtapasTableList({search, filterStatus, etapas}: props) {
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<Etapa>[]>(
    () => [
      { accessorKey: "nome", header: "Nome" },
      { accessorKey: "prazo", header: "prazo" },
      { accessorKey: "status", header: "Status" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return etapas.filter((e) => {
      const matchSearch =
        normalizarTexto(e.nome).includes(normalizarTexto(search));

      const matchStatus =
        filterStatus === "" ||
        normalizarTexto(e.status) === normalizarTexto(filterStatus);

      return matchSearch && matchStatus;
    });
  }, [etapas, search, filterStatus]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <p>Selecione uma Etapa</p>
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
              const etapa = row.original;
              return (
                <tr style={{cursor: "pointer"}} key={row.id} onClick={() => navigate(`etapa/${etapa.nome}`)}>
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
                Nenhuma Etapa encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
