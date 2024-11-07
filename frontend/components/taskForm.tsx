"use client";
import { parseDate } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { DateInput } from "@nextui-org/date-input";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(parseDate("2024-04-04"));
  const [task, setTask] = useState({
    name: "",
    description: "",
    startDate: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (res.ok) {
        toast.success("Tarea registrada");
        onOpenChange();
        setTask({ name: "", description: "", startDate: "" });
      } else {
        toast.error("Hubo un problema al registrar la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.info("Error en la conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="shadow">
        Registrar tarea
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Registrar tarea
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  name="name"
                  placeholder="Ingresa el nombre de la tarea"
                  variant="bordered"
                  value={task.name}
                  onChange={handleChange}
                />
                <Textarea
                  label="Descripcion"
                  name="description"
                  placeholder="Ingresa la descripción"
                  variant="bordered"
                  value={task.description}
                  onChange={handleChange}
                />
                <DateInput
                  label="Fecha de inicio"
                  className="max-w-sm"
                  onChange={setStartDate}
                  value={startDate}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="/tasks" size="sm">
                    Ver lista de tareas
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  {isLoading ? (
                    <>
                      <Spinner size="sm" /> Registrando...
                    </>
                  ) : (
                    "Registrar"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
