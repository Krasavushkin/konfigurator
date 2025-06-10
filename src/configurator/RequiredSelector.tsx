import React from 'react';
import {RequiredParam} from "./cableConfig";
import styles from "./RequiredSelector.module.css";

type SelectorRequiredType = {
    title: string;
    data: RequiredParam[];
    value: string;
    onChange: (value: string) => void;
};
export const RequiredSelector = ({title, data, value, onChange}: SelectorRequiredType) => {
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
            {data.map(data => (
                <label className={styles.optionLabel}>
                    <input
                        type="checkbox"
                        checked={value === data.name }
                        onChange={() => handleChange(data.name)}
                        //disabled={data.disabled}
                        className={styles.checkbox}
                    />
                    <span className="selector-description">{data.description}</span>
                </label>
            ))}
        </div>
    );
};

