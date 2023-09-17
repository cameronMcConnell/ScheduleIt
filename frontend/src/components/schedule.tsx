import '../styles/schedule.css';
import '../styles/shared.css';
import '../styles/table-data.css';
import TableData from './table-data';
import { useState, useEffect } from 'react';

// Contains data to use for request updates and rendering.
interface compProps {
    username: string,
    password: string,
    schedule: { [key: string]: boolean[][]},
    onReturn: (newCompNum: number, currUsername: string, currPassword: string, currSchedule: {[key: string]: boolean[][]}) => void
}

const Schedule: React.FC<compProps> = (props): JSX.Element => {

    // Change the height of the home div.
    useEffect(() => {
        
        let style = document.getElementById('home-div')?.style;
        
        if (style) {
            style.height = '100%';
            style.margin = '16px 0';
        }
    })

    // Used for pressing sign out button.
    const signOut = (): void => {
        let style = document.getElementById('home-div')?.style;
        
        if (style) {
            style.height = '100vh';
            style.margin = '0';
        }

        props.onReturn(0, '', '', {});
    } 

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
        formattedSchedule[inds[0]][inds[1]] = scheduleBool;
        setFormattedSchedule([...formattedSchedule]);
        console.log(formattedSchedule);
    }

    // Clear the schedule for a specific day.
    const clearScheduleDay = (i: number): void => {

        for (let j: number = 0; j < 96; j++) {
            if (formattedSchedule[j][i]) {
                formattedSchedule[j][i] = false;
            }
        } 

        setFormattedSchedule([...formattedSchedule]);
        console.log(formattedSchedule);
    }

    // Determine which element to return based on string value.
    const returnTableHeaders = (day: string, i: number): JSX.Element => {
        if (day) {
            return ( 
                    <th key={day}>{day}
                        <button className='trash-icon' onClick={() => clearScheduleDay(i)}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
                    </th>

            );
        } else {
            return <th key={day}>{day}</th>;
        }
    }

    // The days which will be table headers for component.
    const days: string[] = ['', ...Object.keys(props.schedule)];

    // State used for changing the view of the current schedule on the webpage.
    let [formattedSchedule, setFormattedSchedule] = useState<boolean[][]>(formatScheduleRows());

    // Used at the start of each row in the table.
    const timeArray: string[] = createTimeArray();

    return (
        <div className='component-container'>
            <p>{'Welcome: ' + props.username}</p>
            <div className='button-container'>
                <button className='button-design' onClick={signOut}>Sign Out</button>
                <button className='button-design'>Save Schedule</button>
            </div>
            <table className='no-select'>
                <tbody>
                    <tr>
                    {days.map((day: string, i: number) => (
                        returnTableHeaders(day, i - 1)
                    ))}
                    </tr>
                    {formattedSchedule.map((row: boolean[], i: number) => (
                        <tr key={`row-${i}`}>
                            <td style={{whiteSpace: 'nowrap'}}>{timeArray[i]}</td>
                            {row.map((col: boolean, j: number) => (
                                <TableData tdClassName={col ? 'scheduled' : 'not-scheduled'} isScheduled={col} 
                                currentInds={[i, j]} changeSchedule={changeSchedule} key={`row-${i}-col-${j}`}></TableData>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;