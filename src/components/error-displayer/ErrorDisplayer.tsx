import classes from './ErrorDisplayer.module.css';

interface ErrorDisplayerProps {
    error: string | undefined;
}

const ErrorDisplayer = ({error}: ErrorDisplayerProps) => {
    return (
        <div className={classes["error-displayer"]}>
            <h3>{error ? error: "something went wrong"}</h3>
        </div>
    )
}

export default ErrorDisplayer;