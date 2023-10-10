import { ClipboardText, PlusCircle } from "@phosphor-icons/react";
import styles from "./index.module.css";
import { FormEvent, useMemo, useState } from "react";
import Logo from "../../assets/Logo.svg";
import uuid from "react-uuid";
import Task from "./components/Task";

interface ITask {
	id: string;
	name: string;
	done: boolean;
}

export function Todo() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [taskName, setTaskName] = useState("");
	const created = useMemo(() => tasks.length, [tasks]);
	const concluded = useMemo(() => tasks.filter(t => t.done).length, [tasks]);

	function handlerOnSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setTasks(prevState => [
			...prevState,
			{
				id: uuid(),
				name: taskName,
				done: false,
			},
		]);
		setTaskName("");
	}

	function handlerOnCheckTask(id: string, value: boolean) {
		setTasks(prevState => {
			const item = prevState[prevState.findIndex(i => i.id === id)];
			item.done = value;
			return [...prevState];
		});
	}

	function handlerOnDeleteTask(id: string) {
		setTasks(tasks.filter(t => t.id !== id));
	}

	return (
		<div className={styles.content}>
			<header className={styles.header}>
				<img src={Logo} alt="logo" />
			</header>
			<main className={styles.main}>
				<form className={styles.contentAdd} onSubmit={handlerOnSubmit}>
					<input
						type="text"
						required
						placeholder="Adicione uma nova tarefa"
						value={taskName}
						onChange={e => setTaskName(e.target.value)}
					/>

					<button type="submit">
						<span>Criar</span>
						<PlusCircle size={20} color="#fcfcfc" weight="thin" />
					</button>
				</form>
				<div className={styles.counter}>
					<div className={styles.countCreated}>
						Tarefas criadas
						<span>{created}</span>
					</div>
					<div className={styles.countConcluded}>
						Concluídas
						<span>{`${concluded} de ${created}`}</span>
					</div>
				</div>
				{tasks.length === 0 ? (
					<div className={styles.noTasks}>
						<ClipboardText size={45} weight="thin" />
						<span>Você ainda não tem tarefas cadastradas</span>
						<span>Crie tarefas e organize seus itens a fazer</span>
					</div>
				) : (
					<div className={styles.tasks}>
						{tasks.map(t => (
							<Task
								key={t.id}
								id={t.id}
								value={t.done}
								label={t.name}
								onCheck={value => handlerOnCheckTask(t.id, value)}
								onDelete={handlerOnDeleteTask}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
