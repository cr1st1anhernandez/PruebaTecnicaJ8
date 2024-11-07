import TaskForm from "@/components/taskForm";
import { Link } from "@nextui-org/link";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Toaster theme="dark" />
      <h1 className="text-6xl font-bold">¡Bienvenido!</h1>
      <TaskForm />
      <Link href="/tasks" underline="always" color="primary">
        Ver todas las tareas
      </Link>
    </section>
  );
}
