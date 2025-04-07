import { useState, useEffect } from "react";

const CountdownTimer = ({ launchDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(launchDate) - new Date();
        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [launchDate]);

    if (!timeLeft) return <span className="timer">Er afsted</span>;

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <span className="timer">
            {days}d {hours}h {minutes}m {seconds}s
        </span>
    );
};

export default CountdownTimer;
