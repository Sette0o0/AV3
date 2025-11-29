import { useMemo } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { normalizarTexto } from "../../../../utils/coisas";
import type { Aeronave } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";

interface props{
  aeronaves: Aeronave[] | null
  search: string
  filterTipo: string
}

export function AeronavesTableLista({ aeronaves, search, filterTipo}: props) {
  const navigate = useNavigate();

  const columns = useMemo<ColumnDef<Aeronave>[]>(
    () => [
      { accessorKey: "codigo", header: "Código" },
      { accessorKey: "modelo", header: "Modelo" },
      { accessorKey: "capacidade", header: "Capacidade" },
      { accessorKey: "alcance", header: "Alcance" },
      { accessorKey: "tipo", header: "Tipo" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return aeronaves?.filter((a) => {
      const matchSearch =
        normalizarTexto(a.codigo).includes(normalizarTexto(search)) ||
        normalizarTexto(a.modelo).includes(normalizarTexto(search));

      const matchTipo =
        filterTipo === "" ||
        a.tipo === filterTipo;

      return matchSearch && matchTipo;
    }) ?? [];
  }, [aeronaves, search, filterTipo]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <p>Selecione uma aeronave</p>
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
              const aeronave = row.original;
              return (
                <tr style={{cursor: "pointer"}} key={row.id} onClick={() => navigate(`/aeronaves/${aeronave.codigo}`)}>
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
                Nenhuma aeronave encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
