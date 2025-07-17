import React, {useState} from 'react';
import {CableConfigType} from "./cableConfig";
import styles from "./styles/GeneratorCableMark.module.css";

type GeneratorCableMarkType = {
    data: CableConfigType
}


export const GeneratorCableMark = ({ data }: GeneratorCableMarkType) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    const handleCopy = async () => {
        const mark = generateCableMark(data);
        try {
            await navigator.clipboard.writeText(mark);
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        } catch (err) {
            // ... fallback логика ...
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
    };


    const generateCableMark = (config: CableConfigType) => {
        const { additionalOptions } = data;

        const optionsMark = [
            additionalOptions.waterBlock ? "в" : "",
            additionalOptions.compressed ? "о" : "",
            additionalOptions.ex_i ? "Ex-i" : "",
        ].filter(Boolean).join(" ");
        const individualScreen = config.individualScreen
        const fireResistantCondition = config.sheath === "У"? "" : config.additionalOptions.fireResistant ? "FR" : "";
        const sheath = config.sheath === "У" && config.additionalOptions.fireResistant ? "Унг(А)-FRLS" : config.sheath
        const coldResistantCondition =
            config.sheath === "HF"
                ? (additionalOptions.highColdResistant ? "-АХЛ" : additionalOptions.extremeColdResistant ? "-ЭХЛ" : "-ХЛ")
                : additionalOptions.coldResistant ? "-ХЛ"
                    :  config.sheath === "У" ? "-АХЛ" :
                        additionalOptions.highColdResistant ? "-АХЛ"
                            : additionalOptions.extremeColdResistant ? "-ЭХЛ" : "";
        const polyethylene = config.additionalOptions.polyethylene ? "Пс" : "";
        const twistTypeCondition = config.twistType === "2" ? "х2" : config.twistType === "3" ?"х3": config.twistType === "4"? "х4": "";
        const sectionCondition = config.section === 1 ? "1,0": config.section.toString().replace('.', ',');
        const wireType = config.wireType.singleWire ? "1" : config.wireClass;
        const tinnedMark = config.wireType.tinnedWire ? "л" : "м";
        const groupResist = config.sheath === "У" ? "" : "нг(A)-"

        return `СКАБ-C${config.screen} 660${config.armour}${polyethylene}${groupResist}${fireResistantCondition}${sheath}${coldResistantCondition}
        ${config.coreCount}${twistTypeCondition}${individualScreen}х${sectionCondition}
        ${tinnedMark}${wireType} ${optionsMark}`.replace(/\s+/g, ' ').trim(); // Убираем лишние переносы
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.cableMark} onClick={handleCopy}>
                {generateCableMark(data)}
                <div className={styles.tooltip}>
                    {copyStatus === 'copied' ? 'Скопировано!' : 'Кликните для копирования'}
                </div>
            </h2>
        </div>
    );
};