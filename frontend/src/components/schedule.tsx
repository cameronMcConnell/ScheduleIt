import '../styles/schedule.css';
import '../styles/shared.css';
import '../styles/table-data.css';
import React from 'react';
import TableData from './table-data';
import { useState, useEffect } from 'react';

// Contains data to use for request updates and rendering.
interface compProps {
    username: string,
    password: string,
    schedule: boolean[][],
    onReturn: (newCompNum: number, currUsername: string, currPassword: string, currSchedule: boolean[][]) => void
}

const Schedule: React.FC<compProps> = (props): JSX.Element => {

    // The days which will be table headers for component.
    const days: string[] = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Used to render loading icon.
    let [isSaving, setIsSaving] = useState<boolean>(false);
    
    // Show user that the shedule has been saved successfully;
    // 0 -> default
    // 1 -> success
    // 2 -> failure
    let [isSaved, setIsSaved] = useState<number>(0);
        
    // State used for changing the view of the current schedule on the webpage.
    let [formattedSchedule, setFormattedSchedule] = useState<boolean[][]>(props.schedule);

    // State to set which column/day is editable.
    let [dayToEdit, setDayToEdit] = useState<number>(0);

    // Change the height of the home div.
    useEffect(() => {
        
        let element: HTMLElement | null = document.getElementById('home-div');
        
        if (element) {
            let style: CSSStyleDeclaration = element.style;
            style.height = '100%';
            style.margin = '16px 0';
        }
    })

    // Used for pressing sign out button.
    const signOut = (): void => {

        let element: HTMLElement | null = document.getElementById('home-div');
        
        if (element) {
            let style: CSSStyleDeclaration = element.style;
            style.height = '100vh';
            style.margin = '0';
        }

        props.onReturn(0, '', '', []);
    } 

    // Create times to show at the beginning of each row.
    const createTimeArray = (): string[] => {

        let timeArray: string[] = [];
        const noon: number = 12;
        
        for (let amTime: number = 5; amTime < 12; amTime++) {
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

        for (let amTime: number = 1; amTime < 5; amTime++) {
            for (let mins: number = 0; mins < 4; mins++) {
                let totalMins: number = mins * 15;
                if (!totalMins) {
                    timeArray.push(`${amTime.toString()}:${totalMins.toString()}0 AM`);
                } else {
                    timeArray.push(`${amTime.toString()}:${totalMins.toString()} AM`);
                }
            }
        }

        return timeArray;
    }

    // Used at the start of each row in the table.
    const timeArray: string[] = createTimeArray();

    // On return for table data component.
    const changeSchedule = (inds: number[], scheduleBool: boolean): void => {
        formattedSchedule[inds[0]][inds[1]] = scheduleBool;
        setFormattedSchedule([...formattedSchedule]);
    }

    // Clear the schedule for a specific day.
    const clearScheduleDay = (i: number): void => {

        for (let j: number = 0; j < 96; j++) {
            if (formattedSchedule[j][i]) {
                formattedSchedule[j][i] = false;
            }
        } 

        setFormattedSchedule([...formattedSchedule]);
    }

    // Determine which element to return based on string value.
    const returnTableHeaders = (day: string, i: number): JSX.Element => {
        if (day) {
            return ( 
                    <th key={day}>
                        <button id='trash-icon' onClick={() => clearScheduleDay(i)}><svg 
                        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 
                        0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 
                        0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 
                        47.9-45L416 128z"/></svg></button>
                        {day}
                        <button id='edit-icon' onClick={() => setDayToEdit(i + 1)}><svg xmlns="http://www.w3.org/2000/svg" 
                        height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 
                        51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 
                        6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 
                        15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 
                        96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 
                        0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg></button>
                    </th>

            );
        } else {
            return <th key={day}>{day}</th>;
        }
    }

    // Save user's schedule to db.
    const saveSchedule = async (): Promise<void> => {

        // Update state accordingly.
        setIsSaving(true);
        setIsSaved(0);

        // Map column number of day.
        let dayMap: {[key: number]: string} = Object.fromEntries(days.map((day, ind) => [ind - 1, day]));

        // Update schedule prop to be saved to db.
        for (let i: number = 0; i < 96; i++) {
            for (let j: number = 0; j < 7; j++) {
                if (formattedSchedule[i][j]) {
                    props.schedule[i][j] = true;
                } else { props.schedule[i][j] = false; }
            }
        }

        // Update schedule of signed in account.
        const response = await fetch('http://localhost:5000/save', {
            method: 'POST',
            body: JSON.stringify({
                username: props.username,
                password: props.password,
                schedule: props.schedule
            }),
            headers: {
                'Content-Type': 'application/json' 
            }
        }).catch((err) => {
            console.error(err);
            setIsSaved(2);
        });

        // Update state.
        setIsSaving(false)
        
        // Handle response.
        if (response) {
            let success: any = await response.json();
            setIsSaved(success.reason);
        } else { setIsSaved(2); }
    }

    return (
        <div className='component-container'>
            <p><b>Welcome: </b>{props.username}</p>
            <p><b>Current Selected Day: </b>{days[dayToEdit]}</p>
            <div className='button-container'>
                <button className='button-design' onClick={signOut}>Sign Out</button>
                <button className='button-design' onClick={saveSchedule}>Save Schedule</button>
                {isSaving ? <i className="fa fa-repeat fa-spin"></i> : ''}
                {isSaved === 1 ? <p>Save Successful!</p> : isSaved === 2 ? <p>Error occurred, please try again.</p> : ''}
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
                                currentInds={[i, j]} changeSchedule={changeSchedule} key={`row-${i}-col-${j}`}
                                expectedDay={dayToEdit - 1}></TableData>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;