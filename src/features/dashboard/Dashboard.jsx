import { useState } from "react";
import Button from "../../ui/Button";
import Charts from "../../ui/Charts";
import IncomeForm from "../../ui/IncomeForm";
import Modal from "../../ui/Modal";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="text-3xl font-extrabold mb-4 mt-5">Dashboard</div>

      <Charts />
      <div className="flex flex-col p-8">
        <Button
          onClick={() => setModalOpen(true)}
          className={" justify-center items-end"}
        >
          Add Expenses
        </Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <IncomeForm mode="create" onClose={() => setModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
}

export default Dashboard;
