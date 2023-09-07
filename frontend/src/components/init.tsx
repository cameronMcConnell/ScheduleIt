import '../styles/init.css';
import '../styles/shared.css';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number, currUsername: string, currPassword: string, currSchedule: {[key: string]: boolean[][]}) => void;
}

const Init: React.FC<compProps> = (props): JSX.Element => {
    return (
        <div className='component-container'>
            <p>
                ScheduleIt is a scheduling application that lets you create an account, 
                save your weekly schedule to it, and view it next time you need to log in.
                Backend implemented using Expo.js, Node.js, MongoDB and frontend with
                React.js.
            </p>
            <div className='button-container'>
                <button className='button-design' onClick={() => props.onReturn(1, '', '', {})}>Login</button>
                <button className='button-design' onClick={() => props.onReturn(2, '', '', {})}>Create Account</button>
            </div>
        </div>
    );
}

export default Init;