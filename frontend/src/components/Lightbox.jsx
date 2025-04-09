import { useRef, useEffect, useState } from "react";
import "./Lightbox.scss";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

const Lightbox = ({ data, starter, onclose }) => {
    const APPSTORAGE = import.meta.env.VITE_APP_STORAGE;
    const LightboxRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(starter);

    const handleBackgroundClick = (e) => {
        if (!LightboxRef.current?.contains(e.target)) {
            onclose();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") {
            setCurrentIndex((prev) => (prev + 1) % data.length);
        } else if (e.key === "ArrowLeft") {
            setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
        } else if (e.key === "Escape") {
            onclose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div id="Lightbox-container" onClick={handleBackgroundClick}>
            <div className="Lightbox">
                <button ref={LightboxRef} className="close-btn" onClick={onclose}><IoMdClose /></button>

                <img
                    src={`${APPSTORAGE}galleri/${data[currentIndex]}`}
                    alt={`${currentIndex}`}
                    className="lightbox-image"
                />

                <div ref={LightboxRef} className="nav">
                    <button onClick={() => setCurrentIndex((currentIndex - 1 + data.length) % data.length)}><IoIosArrowDown /></button>
                    <button onClick={() => setCurrentIndex((currentIndex + 1) % data.length)}><IoIosArrowDown /></button>
                </div>
            </div>
        </div>
    );
};

export default Lightbox;
