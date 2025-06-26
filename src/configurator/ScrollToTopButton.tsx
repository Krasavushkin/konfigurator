import { useState, useEffect } from 'react';
import styles from './styles/ScrollToTopButton.module.css';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) { // Показывать кнопку после прокрутки 300px
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={`${styles.button} ${isVisible ? styles.visible : ''}`}
             onClick={scrollToTop}
             title="В начало страницы">
             <h3 className={styles.h3}> ▲ </h3>
        </div>
    );
};