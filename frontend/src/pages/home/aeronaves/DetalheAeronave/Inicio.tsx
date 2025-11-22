import { useOutletContext } from "react-router-dom";
import type { Aeronave } from "../../../../utils/types";
import { PecasTable } from "./tables/PecasTable";
import { EtapasTable } from "./tables/EtapasTable";
import { TestesTable } from "./tables/TestesTable";
import { NivelPermissao } from "../../../../utils/permissions";
import { useAuth } from "../../../../hooks/useAuth";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { ModalGerarRelatorio } from "./modals/ModalGerarRelatorio";

export default function DetalheAeronave() {
  const aeronave = useOutletContext<Aeronave>();
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {
        user?.cargo !== NivelPermissao.Operador && (
          <div className={`ms-auto`}>
            <Button onClick={() => setShowModal(true)}>
              Gerar Relatório
            </Button>
          </div>
        )
      }
      <div className={`d-flex flex-column row-gap-5 my-5`}>
        <div>
          <PecasTable aeronave={aeronave} />
        </div>
        <div>
          <EtapasTable aeronave={aeronave} />
        </div>
        <div>
          <TestesTable aeronave={aeronave} />
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
