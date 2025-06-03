import React from 'react';
import {WiresTypeParam} from "./cableConfig";
import styles from "./WireTypeSelector.module.css"

type WireTypeSelectorProps = {
    title: string;
    value: WiresTypeParam;
    onChange: (newConfig: WiresTypeParam) => void;
};

export const WireTypeSelector = ({title, value, onChange }: WireTypeSelectorProps) => {
    const handleWireTypeChange = (type: keyof WiresTypeParam) => {
        if (type === 'singleWire' || type === 'strandedWire') {
            const newConfig = {
                ...value,
                singleWire: type === 'singleWire',
                strandedWire: type === 'strandedWire'
            };
            onChange(newConfig);
        } else {
            // Для tinnedWire просто переключаем состояние
            onChange({
                ...value,
                [type]: !value[type]
            });
        }
    };

    return (
        <div>
            <h3> {title} </h3>

            <div  className={styles.wireTypeGroup}>
                <label>
                    <input
                        type="checkbox"
                        name="wireType"
                        checked={value.singleWire}
                        onChange={() => handleWireTypeChange('singleWire')}
                    />
                    <span>Однопроволочная</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        name="wireType"
                        checked={value.strandedWire}
                        onChange={() => handleWireTypeChange('strandedWire')}
                    />
                    <span>Многопроволочная</span>
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={value.tinnedWire}
                        onChange={() => handleWireTypeChange('tinnedWire')}
                    />
                    <span>Луженая</span>
                </label>

            </div>



        </div>
    );
};