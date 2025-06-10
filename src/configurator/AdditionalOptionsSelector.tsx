import React, {useCallback} from 'react';
import {AdditionalOptionListType, AdditionalOptionsType} from "./cableConfig";
import styles from './AdditionalOtionsSelector.module.css';


type AdditionalOptionsSelectorProps = {
    title: string;
    data: AdditionalOptionListType[];
    selected: AdditionalOptionsType;
    onChange: (options: AdditionalOptionsType) => void;
};

export const AdditionalOptionsSelector = ({
                                              title,
                                              data,
                                              selected,
                                              onChange
                                          }: AdditionalOptionsSelectorProps) => {
    const handleOptionChange = useCallback((key: keyof AdditionalOptionsType) => {
        const newValue = !selected[key];

        const updatedOptions = { ...selected, [key]: newValue };

        // Обработка взаимоисключающих вариантов
        if (key === 'coldResistant' && newValue) {
            updatedOptions.highColdResistant = false;
            updatedOptions.extremeColdResistant = false
        } else if (key === 'highColdResistant' && newValue) {
            updatedOptions.coldResistant = false;
            updatedOptions.extremeColdResistant = false
        } else if (key === 'extremeColdResistant' && newValue) {
            updatedOptions.coldResistant = false;
            updatedOptions.highColdResistant = false;
        }
        onChange(updatedOptions);
    }, [selected, onChange]);

    return (
        <div className={styles.selector}>
            <h3 className={styles.selectorTitle}>{title}</h3>
                <ul className={styles.optionsList}>
                {data.map(option => (
                    <li>
                    <label key={option.id} className={styles.optionLabel}>
                        <input
                            type="checkbox"
                            checked={selected[option.key]}
                            onChange={() => handleOptionChange(option.key)}
                            disabled={option.disabled}
                            className={styles.checkbox}
                        />
                        <span className="option-desc">{option.description}</span>
                    </label>
                    </li>
                ))}
                </ul>
        </div>
    );
};