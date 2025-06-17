import React from 'react';
import {CableConfigType} from "./cableConfig";
import styles from "./GeneratorCableMark.module.css";

type GeneratorCableMarkType = {
    data: CableConfigType
}


export const GeneratorCableMark = ({ data }: GeneratorCableMarkType) => {

    const generateCableMark = (config: CableConfigType) => {
        const { additionalOptions } = data;

        const optionsMark = [
            additionalOptions.waterBlock ? "в" : "",
            additionalOptions.compressed ? "о" : "",
            additionalOptions.ex_i ? "Ex-i" : "",
        ].filter(Boolean).join(" ");

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
        ${config.coreCount}${twistTypeCondition}${config.individualScreen}х${sectionCondition}
        ${tinnedMark}${wireType} ${optionsMark}`;
    }

    return (
        <>
            <h2 className={styles.cableMark}>{generateCableMark(data)}</h2>
        </>
    );
};
