import { useState } from "react";
import { CheckCircle, Circle } from "@phosphor-icons/react";

import styles from "./index.module.css";

export interface ICheckBoxProps {
	label: string;
	value: boolean;
	onCheck?: (value: boolean) => void;
}

export default function CheckBox(props: ICheckBoxProps) {
	const [done, setDone] = useState(props.value);

	function handlerOnCheck(value: boolean) {
		setDone(value);
		props.onCheck?.(value);
	}

	return (
		<div className={styles.main}>
			<div>
				{done ? (
					<CheckCircle
						className={styles.checkDone}
						size={17}
						weight="fill"
						onClick={() => handlerOnCheck(false)}
					/>
				) : (
					<Circle
						className={styles.checkToDo}
						size={17}
						weight="bold"
						onClick={() => handlerOnCheck(true)}
					/>
				)}
			</div>

			<span className={done ? styles.taskDone : undefined}>{props.label}</span>
		</div>
	);
}
