import PropTypes from "prop-types";
import Product from "./Product";

const Timer = ({ time, children }) => {
    return (
        <>
            {
                time > 0 ?
                    <>{children}</>
                :
                    <div className="alert alert-danger" role="alert">
                        You have run out of time to check out! Please start over
                    </div>
            }
        </>
    )
}

Timer.propTypes = {
    time: PropTypes.number.isRequired,
    children: PropTypes.any,
}

export default Timer;
