import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { normalizarTexto } from "../../../../utils/coisas";
import { ModalFuncionario } from "../modals/ModalFuncionario";
import type { Funcionario } from "../../../../utils/types";
import { useAuth } from "../../../../hooks/useAuth";
import api from "../../../../utils/api";

interface props{
  refetch: () => void
  funcionarios: Funcionario[] | null
  search: string
  filterPermissao: string
}

export function FuncionariosTableLista({ refetch, funcionarios, search, filterPermissao}: props) {
  const [ funcionarioSelecionado, setFuncionarioSelecionado ] = useState<Funcionario | null>(null)
  const [ showModal, setShowModal ] = useState(false)
  const { user, logout } = useAuth()

  function abrirModalFuncInfo(funcionario: Funcionario){
    setFuncionarioSelecionado(funcionario)
    setShowModal(true)
  }

  async function excluirFuncionario(id: number){
    const same = user?.id === id
    if (same) alert("Se você apagar esse funcionário você será deslogado")

    if (confirm("Deseja excluír usuario de id: " + id)){
      try {
        const res = await api.delete("/funcionario/" + id)

        refetch()
        alert(res.data.mensagem)
        if (same) {
          logout()
        }

      } catch (error: any) {
        console.error(error.message)
        alert(error.response.data.erro)
      }
    }
  }

  const columns = useMemo<ColumnDef<Funcionario>[]>(
    () => [
      { accessorKey: "id_func", header: "ID" },
      { accessorKey: "nome", header: "Nome" },
      { accessorKey: "usuario", header: "Usuário" },
      { accessorKey: "nivel_permissao", header: "Cargo" },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          const funcionario = row.original;
          return (
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                excluirFuncionario(funcionario.id_func);
              }}
            >
              Excluir
            </button>
          );
        }
      }
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
