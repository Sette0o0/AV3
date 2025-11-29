import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { normalizarTexto } from "../../../../utils/coisas";
import { ModalFuncionario } from "../modals/ModalFuncionario";
import type { Funcionario } from "../../../../utils/types";

interface props{
  funcionarios: Funcionario[] | null
  search: string
  filterPermissao: string
}

export function FuncionariosTableLista({funcionarios, search, filterPermissao}: props) {
  const [ funcionarioSelecionado, setFuncionarioSelecionado ] = useState<Funcionario | null>(null)
  const [ showModal, setShowModal ] = useState(false)

  function abrirModalFuncInfo(funcionario: Funcionario){
    setFuncionarioSelecionado(funcionario)
    setShowModal(true)
  }

  const columns = useMemo<ColumnDef<Funcionario>[]>(
    () => [
      { accessorKey: "id_func", header: "ID" },
      { accessorKey: "nome", header: "Nome" },
      { accessorKey: "usuario", header: "Usuário" },
      { accessorKey: "nivel_permissao", header: "Cargo" },
    ],
    []
  );

  const filteredData = useMemo(() => {
    return funcionarios?.filter((f) => {
      const matchSearch =
        normalizarTexto(f.nome).includes(normalizarTexto(search)) ||
        normalizarTexto(f.usuario).includes(normalizarTexto(search));

      const matchPermissao =
        filterPermissao === "" ||
        String(f.nivel_permissao) === filterPermissao;

      return matchSearch && matchPermissao;
    }) ?? [];
  }, [funcionarios, search, filterPermissao]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <p>Selecione um funcionário</p>
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
            table.getRowModel().rows.map((row) => (
              <tr style={{cursor: "pointer"}} key={row.id} onClick={() => abrirModalFuncInfo(row.original)}>
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

      <ModalFuncionario
        funcionario={funcionarioSelecionado}
        show={showModal}
        onClose={() => setShowModal(false)}/>
    </>
  );
}
