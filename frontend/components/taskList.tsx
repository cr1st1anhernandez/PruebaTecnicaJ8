"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/table";
import { useEffect, useState } from "react";

type Task = {
  key: string;
  name: string;
  description: string;
  startDate: string;
};

const columns = [
  {
    key: "name",
    label: "NOMBRE",
  },
  {
    key: "description",
    label: "DESCRIPCIÓN",
  },
  {
    key: "startDate",
    label: "FECHA DE INICIO",
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/v1/tasks");
      if (response.ok) {
        const data = await response.json();
        const mappedTasks = data.map((task: Task, index: Number) => ({
          ...task,
          key: index.toString(),
        }));
        setTasks(mappedTasks);
      } else {
        console.error("Error al obtener las tareas");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Table aria-label="Lista de tareas">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={tasks}>
        {(task: Task) => (
          <TableRow key={task.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(task, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
