import '../styles/create.css';
import '../styles/shared.css';
import { useState } from 'react';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number, currUsername: string, currPassword: string, currSchedule: {[key: string]: boolean[][]}) => void;
}

const Create: React.FC<compProps> = (props): JSX.Element => {

    // Users entered username.
    let [username, setUsername] = useState<string>('');

    // Users entered password.
    let [password, setPassword] = useState<string>('');

    // Flag for showing no password was included.
    let [noPassword, setNoPassword] = useState<boolean>(false);

    // Flag for showing no unsername was included.
    let [noUsername, setNoUsername] = useState<boolean>(false);

    // Flag for showing an error occured when calling backend.
    let [errorOccurred, setErrorOccurred] = useState<boolean>(false);

    // Flag for showing if username already exists in database.
    let [usernameExists, setUsernameExists] = useState<boolean>(false);

    // Need to implement a couple of possibilites.
    // 1. Username already exists.
    // 2. No username supplied.
    // 3. No password supplied.
    const createAccount = async () => {

        // Call helper function to validate user input.
        if (!validateInput()) { return; }

        // Reset state.
        setNoPassword(false);
        setNoUsername(false);

        // Create array that will be used in schedule object.
        const createScheduleArray = (): boolean[][] => {
            let scheduleArray: boolean[][] = [];
            for (let i: number = 0; i < 24; i++) {
                scheduleArray.push([]);
                for (let j: number = 0; j < 4; j++) {
                    scheduleArray[i].push(false);
                }
            }
            return scheduleArray;
        }

        // Schedule array used to do deep copies for object.
        let scheduleArray: boolean[][] = createScheduleArray();

        // Schedule object.
        const schedule = {
            'Monday': [...scheduleArray],
            'Tueday': [...scheduleArray],
            'Wednesday': [...scheduleArray],
            'Thursday': [...scheduleArray],
            'Friday': [...scheduleArray],
            'Saturday': [...scheduleArray],
            'Sunday': [...scheduleArray]
        }
 
        // Send data and await response.
        const response = await fetch('http://localhost:5000/create', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                schedule: schedule
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((err) => { 
            console.error(err);
            setErrorOccurred(true); 
        })

        // If not null, parse the json.
        if (response) { 
            var success = await response.json();
            setErrorOccurred(false);  
        } else { return; }

        // Check to see if account was created successfully.
        if (success.bool) {
            setUsernameExists(false);
            props.onReturn(3, username, password, success.schedule);
        } else {
            // Change state to reflect accurate error.
            switch (success.reason) {
                case 1:
                    setErrorOccurred(true);
                    break;
                case 2:
                    setUsernameExists(true);
                    break;
                default: 
                    break;
            }
        }
    }

    // Checks to see if user entered username and password.
    const validateInput = (): boolean => {
        // Code to handle parts of the UI to render.
        let flag = true;

        if (!username) {
            setNoUsername(true);
            flag = false;
        }
        if (!password) {
            setNoPassword(true);
            flag = false;
        }

        return flag;
    }

    return (
        <div className='component-container'>
            {errorOccurred ? <p>An error occured, please try again.</p> : ''}
            {usernameExists ? <p> Username already exists. Please use a different username.</p> : ''}
            <form className='form-container'>
                <label className='label-container'>
                    Username:
                    <input onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                {noUsername ? <p>Please input a username.</p> : ''}
                <label className='label-container'>
                    Password:
                    <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                {noPassword ? <p>Please input a password.</p> : ''}
            </form>
            <div className='button-container'>
                <button className='button-design' onClick={() => props.onReturn(0, '', '', {})}>Return to Home</button>
                <button className='button-design' onClick={() => createAccount()}>Create Account</button>
            </div>
        </div>
    );
}

export default Create;