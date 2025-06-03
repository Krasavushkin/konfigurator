import React from 'react';
import { OptionalParam } from "./cableConfig";
import styles from './SelectorOptional.module.css';


type SelectorOptionalType = {
    title: string;
    data: OptionalParam[];
    value: string;
    onChange: (value: string) => void;
};

export const SelectorOptional = ({ title, data, value, onChange }: SelectorOptionalType) => {
    const handleChange = (selectedValue: string) => {
        // Если уже выбран этот чекбокс - снимаем выбор
        if (value === selectedValue) {
            onChange('');
        } else {
            onChange(selectedValue);
        }
    };

    return (
        <div className={styles.selector}>
            <h3 className={styles.selectorTitle}>{title}</h3>
            <ul className={styles.optionsList}>
                {data.map(item => (
                    <li key={item.name} className={`selector-item ${item.disabled ? 'disabled' : ''}`}>
                        <label className={styles.optionLabel}>
                            <input
                                type="checkbox"
                                checked={value === item.name && !item.disabled}
                                onChange={() => !item.disabled && handleChange(item.name)}
                                //disabled={item.disabled}
                                className={styles.optionInput}
                            />
                            <span className="selector-description">{item.description}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

/* const handleCheckboxChange = (value: string) => {
       // Проверяем, уже есть ли значение в массиве выбранных значений
       if (selectedValues.includes(value)) {
           // Если есть, убираем его
           onChange(value);
       } else {
           // Если нет, добавляем его
           onChange(value);
       }
   };*/