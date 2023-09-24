import React from 'react';
import { useState } from 'react';

// Props for changing if something is scheduled on a specific day.
interface compProps {
    isScheduled: boolean,
    currentInds: number[],
    tdClassName: string,
    expectedDay: number
    changeSchedule: (inds: number[], scheduleBool: boolean) => void
}

const TableData: React.FC<compProps> = (props): JSX.Element => {

    // Use this to fix issue with schedule not holding state. Hopefully.
    const handleMouseDown = (): void => {
        if (props.currentInds[1] === props.expectedDay) {
            const newBool: boolean = !returnBool;
            setReturnBool(newBool);
            props.changeSchedule(props.currentInds, newBool);
        }
    }

    // Handles if mouse enters element.
    const handleMouseEnter = (e: React.MouseEvent): void => {
        if (props.currentInds[1] === props.expectedDay && e.buttons === 1) {
            const newBool: boolean = !returnBool;
            setReturnBool(newBool);
            props.changeSchedule(props.currentInds, newBool);
        }
    }

    // Use state to track inpended value of passed bool for future reference.
    let [returnBool, setReturnBool] = useState<boolean>(props.isScheduled);

    return (
        <td className={props.tdClassName} 
            onMouseDown={handleMouseDown}
            onMouseEnter={(e) => handleMouseEnter(e)}
        ></td>
    );
}

export default TableData;