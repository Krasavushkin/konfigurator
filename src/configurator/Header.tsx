import React from 'react';
import styles from "./Configurator.module.css";

export const Header = () => {
    return (
        <header className={styles.headerContainer}> {/* Используем semantic HTML */}
            <div className={styles.headerLogo}>
                <a
                    href="https://spetskabel.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.headerLogo}
                    aria-label="Перейти на основной сайт СПЕЦКАБЕЛЬ"
                >
                    <h2>Кабельный завод <br/>СПЕЦКАБЕЛЬ</h2>
                </a>
            </div>
            <h1 className={styles.headerTitle}>Конфигуратор кабеля марки СКАБ-С</h1>
        </header>
    );
};

