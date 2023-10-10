import { Trash } from "@phosphor-icons/react";
import CheckBox, { ICheckBoxProps } from "../../../../components/CheckBox";

import styles from "./index.module.css";

interface ITaskProps extends ICheckBoxProps {
	id: string;
	onDelete?: (id: string) => void;
}

export default function Task(props: ITaskProps) {
	return (
		<div className={styles.main}>
			<CheckBox {...props} />

			<div className={styles.delete}>
				<Trash
					size={16}
					color="var(--gray-300)"
					weight="thin"
					onClick={() => props.onDelete?.(props.id)}
				/>
			</div>
		</div>
	);
}
