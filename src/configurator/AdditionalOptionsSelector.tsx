import React, {useState} from 'react';
import {AdditionalOptionListType, AdditionalOptionsType} from "./cableConfig";
import styles from './AdditionalOtionsSelector.module.css';

type AdditionalOptionsSelectorProps = {
    title: string;
    data: AdditionalOptionListType[];
    onChange: (options: AdditionalOptionsType) => void;
    value: AdditionalOptionsType;
    defaultOpen?: boolean;
};

export const AdditionalOptionsSelector = ({
                                              title,
                                              data,
                                              onChange,
                                              value,
                                              defaultOpen = false
                                          }: AdditionalOptionsSelectorProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleOptionChange = (key: keyof AdditionalOptionsType) => {
        const newValue = !value[key];
        const updatedOptions = {...value, [key]: newValue};

        if (key === 'coldResistant' && newValue) {
            updatedOptions.highColdResistant = false;
            updatedOptions.extremeColdResistant = false;
        } else if (key === 'highColdResistant' && newValue) {
            updatedOptions.coldResistant = false;
            updatedOptions.extremeColdResistant = false;
        } else if (key === 'extremeColdResistant' && newValue) {
            updatedOptions.coldResistant = false;
            updatedOptions.highColdResistant = false;
        }

        onChange(updatedOptions);
    };

    return (
        <div className={`${styles.selector} ${isOpen ? styles.open : ''}`}>
            <h3 className={styles.selectorTitle} onClick={toggleOpen}>
                {title}
                <span className={styles.arrowIcon}>{isOpen ? '▼' : '►'}</span>
            </h3>
            {isOpen && (
                <ul className={styles.optionsList}>
                    {data.map(option => (
                        <li
                            key={option.id}
                            className={`${styles.optionItem} ${option.disabled ? styles.disabled : ''}`}
                        >
                            <label className={styles.optionLabel}>
                                <input
                                    type="checkbox"
                                    checked={value[option.key]}
                                    onChange={() => !option.disabled && handleOptionChange(option.key)}
                                    disabled={option.disabled}
                                    className={styles.checkbox}
                                />
                                <span className={styles.optionDescription}>
                                    {option.description}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};