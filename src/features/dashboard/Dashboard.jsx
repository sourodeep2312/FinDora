import { useState } from "react";
import Button from "../../ui/Button";
import IncomeForm from "../../ui/IncomeForm";
import Modal from "../../ui/Modal";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div>Dashboard</div>

      <div className="p-8">
        <Button onClick={() => setModalOpen(true)}>Add Expenses</Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <IncomeForm />
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
