import '../styles/schedule.css';
import '../styles/shared.css';
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
    
    // The days which will be table headers for component.
    const days: string[] = ['', ...Object.keys(props.schedule)];

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

    // Create times to show at the beginning of each row;
    const createTimeArray = (): string[] => {

        let timeArray: string[] = [];
        for (let amTime: number = 1; amTime < 13; amTime++) {
            for (let mins: number = 0; mins < 4; mins++) {
                let totalMins: number = mins * 15;
                if (!totalMins) {
                    timeArray.push(amTime.toString() + ':' + totalMins.toString() + '0' + ' AM');
                } else {
                    timeArray.push(amTime.toString() + ':' + totalMins.toString() + ' AM');
                }
            }
        }

        for (let pmTime: number = 1; pmTime < 13; pmTime++) {
            for (let mins: number = 0; mins < 4; mins++) {
                let totalMins: number = mins * 15;
                if (!totalMins) {
                    timeArray.push(pmTime.toString() + ':' + totalMins.toString() + '0' + ' PM');
                } else {
                    timeArray.push(pmTime.toString() + ':' + totalMins.toString() + ' PM');
                }
            }
        }

        return timeArray;
    }

    // State used for changing the view of the current schedule on the webpage.
    let [formattedSchedule, setFormattedSchedule] = useState<boolean[][]>(formatScheduleRows());

    // Used at the start of each row in the table.
    const timeArray: string[] = createTimeArray();
    
    return (
        <div className='component-container'>
            <p>{'Welcome: ' + props.username}</p>
            <table>
                <tbody>
                    <tr>
                    {days.map((day: string) => (
                        <th>{day}</th>
                    ))}
                    </tr>
                    {formattedSchedule.map((row: boolean[], i: number) => (
                        <tr>
                            <td>{timeArray[i]}</td>
                            {row.map((col: boolean, j: number) => (
                                <td>{col ? 'yes' : 'no'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Schedule;