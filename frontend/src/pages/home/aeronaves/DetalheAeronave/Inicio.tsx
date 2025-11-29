import { Navigate, useOutletContext } from "react-router-dom";
import type { Aeronave } from "../../../../utils/types";
import { PecasTable } from "./tables/PecasTable";
import { EtapasTable } from "./tables/EtapasTable";
import { TestesTable } from "./tables/TestesTable";
import { useAuth } from "../../../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { ModalGerarRelatorio } from "./modals/ModalGerarRelatorio";
import { NivelPermissao } from "../../../../utils/enums";

export default function DetalheAeronave() {
  const { aeronave, carregarAeronave } = useOutletContext<{
    aeronave: Aeronave,
    carregarAeronave: () => void
  }>();
  
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false);

  if (!user) return <Navigate to={"/login"} replace />

  return (
    <>
      {
        user.nivel_permissao !== NivelPermissao.Operador && (
          <div className={`ms-auto`}>
            <Button onClick={() => setShowModal(true)}>
              Gerar Relatório
            </Button>
          </div>
        )
      }
      <div className={`d-flex flex-column row-gap-5 my-5`}>
        <div>
          <PecasTable refetch={carregarAeronave} aeronave={aeronave} />
        </div>
        <div>
          <EtapasTable refetch={carregarAeronave} aeronave={aeronave} />
        </div>
        <div>
          <TestesTable refetch={carregarAeronave} aeronave={aeronave} />
        </div>
      </div>
      <ModalGerarRelatorio
        show={showModal}
        onClose={() => setShowModal(false)}
        aeronave={aeronave}
      />
    </>
  );
}
