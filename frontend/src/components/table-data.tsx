import { useState } from 'react';

// Props for changing if something is scheduled on a specific day.
interface compProps {
    isScheduled: boolean,
    currentInds: number[],
    changeSchedule: (inds: number[], scheduleBool: boolean) => void
}

const TableData: React.FC<compProps> = (props): JSX.Element => {

    // Use this to fix issue with schedule not holding state. Hopefully.
    const handleMouseDown = (): void => {
        const newBool: boolean = !returnBool;
        setReturnBool(newBool);
        props.changeSchedule(props.currentInds, newBool);
    }

    // Handles if mouse enters element.
    const handleMouseEnter = (e: React.MouseEvent): void => {
        if (e.buttons === 1) {
            const newBool: boolean = !returnBool;
            setReturnBool(newBool);
            props.changeSchedule(props.currentInds, newBool);
        }
    }

    // Use state to track inpended value of passed bool for future reference.
    let [returnBool, setReturnBool] = useState<boolean>(props.isScheduled);

    // Used to set class name for background color.
    const tdClassName: string = returnBool ? 'scheduled' : 'not-scheduled';

    return (
        <td className={tdClassName} 
            onMouseDown={handleMouseDown}
            onMouseEnter={(e) => handleMouseEnter(e)}
        ></td>
    );
}

export default TableData;