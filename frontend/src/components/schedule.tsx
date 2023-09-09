import '../styles/schedule.css';
import '../styles/shared.css';
import '../styles/table-data.css';
import TableData from './table-data';
import { useState, useEffect } from 'react';

// Contains data to use for request updates and rendering.
interface compProps {
    username: string,
    password: string,
    schedule: { [key: string]: boolean[][]}
}

const Schedule: React.FC<compProps> = (props): JSX.Element => {

    // Change the height of the home div;
    useEffect(() => {
        
        let style = document.getElementById('home-div')?.style;
        
        if (style) {
            style.height = '100%';
            style.margin = '16px 0';
        }
    })

    // Format the schedule to render in the component easier.
    const formatScheduleRows = () => {
        
        let formattedSchedule: boolean[][] = [];
        
        for (let i: number = 0; i < 96; i++) {
            formattedSchedule.push([]) 
        }

        let i: number = 0; let j: number = 0;
        for (let k: number = 0; k < 96; k++) {
            if (j === 4) { j = 0; i++; }
            for (const day of days) {
                if (day) {
                formattedSchedule[k].push(props.schedule[day][i][j]);
                }
            }
            j++;
        }
        
        return formattedSchedule;
    }

    // Create times to show at the beginning of each row.
    const createTimeArray = (): string[] => {

        let timeArray: string[] = [];
        const noon: number = 12;
        
        for (let amTime: number = 1; amTime < 12; amTime++) {
            for (let mins: number = 0; mins < 4; mins++) {
                let totalMins: number = mins * 15;
                if (!totalMins) {
                    timeArray.push(`${amTime.toString()}:${totalMins.toString()}0 AM`);
                } else {
                    timeArray.push(`${amTime.toString()}:${totalMins.toString()} AM`);
                }
            }
        }

        for (let mins: number = 0; mins < 4; mins++) {
            let totalMins: number = mins * 15;
            if (!totalMins) {
                timeArray.push(`${noon.toString()}:${totalMins.toString()}0 PM`);
            } else {
                timeArray.push(`${noon.toString()}:${totalMins.toString()} PM`);
            }
        }

        for (let pmTime: number = 1; pmTime < 12; pmTime++) {
            for (let mins: number = 0; mins < 4; mins++) {
                let totalMins: number = mins * 15;
                if (!totalMins) {
                    timeArray.push(`${pmTime.toString()}:${totalMins.toString()}0 PM`);
                } else {
                    timeArray.push(`${pmTime.toString()}:${totalMins.toString()} PM`);
                }
            }
        }

        for (let mins: number = 0; mins < 4; mins++) {
            let totalMins: number = mins * 15;
            if (!totalMins) {
                timeArray.push(`${noon.toString()}:${totalMins.toString()}0 AM`);
            } else {
                timeArray.push(`${noon.toString()}:${totalMins.toString()} AM`);
            }
        }

        return timeArray;
    }

    // On return for table data component.
    const changeSchedule = (inds: number[], scheduleBool: boolean): void => {
        scheduleCopy[inds[0]][inds[1]] = scheduleBool;
        setFormattedSchedule(scheduleCopy);
    }

    // Clear the schedule for a specific day.
    const clearScheduleDay = (i: number): void => {

        for (let j: number = 0; j < 96; j++) {
            console.log(scheduleCopy[j][i], j, i)
            if (scheduleCopy[j][i]) {
                scheduleCopy[j][i] = false;
            }
        } 

        setFormattedSchedule(scheduleCopy);
    }

    // Determine which element to return based on string value.
    const returnTableHeaders = (day: string, i: number): JSX.Element => {
        if (day) {
            return <th key={day}>{day}<button className='button-design' onClick={() => clearScheduleDay(i)}>Clear Schedule</button></th>
        } else {
            return <th key={day}>{day}</th>
        }
    }

    // The days which will be table headers for component.
    const days: string[] = ['', ...Object.keys(props.schedule)];

    // State used for changing the view of the current schedule on the webpage.
    let [formattedSchedule, setFormattedSchedule] = useState<boolean[][]>(formatScheduleRows());

    // Used for setting state.
    let scheduleCopy = formatScheduleRows();

    // Used at the start of each row in the table.
    const timeArray: string[] = createTimeArray();
    
    return (
        <div className='component-container'>
            <p>{'Welcome: ' + props.username}</p>
            <table className='no-select'>
                <tbody>
                    <tr>
                    {days.map((day: string, i: number) => (
                        returnTableHeaders(day, i - 1)
                    ))}
                    </tr>
                    {formattedSchedule.map((row: boolean[], i: number) => (
                        <tr key={`row-${i}`}>
                            <td>{timeArray[i]}</td>
                            {row.map((col: boolean, j: number) => (
                                <TableData isScheduled={col} currentInds={[i, j]} changeSchedule={changeSchedule} key={`row-${i}-col-${j}`}></TableData>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;