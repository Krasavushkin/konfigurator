import React, { useState } from 'react';
import { OptionalParam } from "./cableConfig";
import styles from './styles/OptionsSelector.module.css';

type SelectorOptionalType = {
    title: string;
    data: OptionalParam[];
    value: string;
    onChange: (value: string) => void;
    defaultOpen?: boolean; // Опциональный параметр для начального состояния
};

export const SelectorOptional = ({
                                     title,
                                     data,
                                     value,
                                     onChange,
                                     defaultOpen = false
                                 }: SelectorOptionalType) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const handleChange = (selectedValue: string) => {
        if (value === selectedValue) {
            onChange('');
        } else {
            onChange(selectedValue);
        }
    };

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.selector} ${isOpen ? styles.open : ''}`}>
            <h3
                className={styles.selectorTitle}
                onClick={toggleOpen}
            >
                {title}
                <span className={styles.arrowIcon}>
                    {isOpen ? '▼' : '►'}
                </span>
            </h3>

            {isOpen && (
                <ul className={styles.optionsList}>
                    {data.map(item => (
                        <li key={item.name} className={`${styles.optionItem} ${item.disabled ? styles.disabled : ''}`}>
                            <label className={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    checked={value === item.name && !item.disabled}
                                    onChange={() => !item.disabled && handleChange(item.name)}
                                    className={styles.checkbox}
                                    disabled={item.disabled}
                                />
                                <span className={styles.optionDescription}>{item.description}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};