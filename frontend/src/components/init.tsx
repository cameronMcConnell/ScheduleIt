import '../styles/init.css';
import '../styles/shared.css';

// Define prop return function for changing component number back in main component.
interface compProps {
    onReturn: (newCompNum: number) => void;
}

const Init: React.FC<compProps> = (props): JSX.Element => {
    return (
        <div>
            <button onClick={() => props.onReturn(1)}>Login</button>
            <button onClick={() => props.onReturn(2)}>Create Account</button>
        </div>
    );
}

export default Init;