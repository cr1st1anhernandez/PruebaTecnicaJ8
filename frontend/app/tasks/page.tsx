import TaskList from "@/components/taskList";
import { Link } from "@nextui-org/link";

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h2 className="text-6xl font-bold">Lista de Tareas</h2>
      <TaskList />
      <Link href="/" underline="always" color="primary">
        Registrar tarea
      </Link>
    </section>
  );
}
