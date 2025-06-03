import React, {useState} from 'react';
import {SelectorOptional} from "./SelectorOptional";
import {
    AdditionalOptionsList, AdditionalOptionsType,
    Armour,
    CoreCount,
    IndividualScreens, initialAdditionalOptions,
    Screens,
    SectionCores, SectionQuadCores, SectionTriadCores,
    Sheath, WireClass,
    WiresTwisted, WiresTypeParam, WireTypes,
} from "./cableConfig";
import {CableConfigType} from "./cableConfig";
import {RequiredSelector} from "./RequiredSelector";
import {NumSelector} from "./NumSelector";
import {AdditionalOptionsSelector} from "./AdditionalOptionsSelector";
import styles from './Configurator.module.css';
import {WireTypeSelector} from "./WireTypeSelector";

export const Configurator = () => {
    const [config, setConfig] = useState<CableConfigType>({
        sheath: "нг(A)-LS",
        coreCount: 1,
        twistType: "",
        twistQuantity: "1",
        wireType: WireTypes,
        section: 0.35,
        wireClass: 3,
        armour: "",
        screen: "",
        individualScreen: "",
        additionalOptions: initialAdditionalOptions
    });
    const updateConfig = (key: keyof CableConfigType, value: string | number | boolean) => {
        setConfig(prev => ({...prev, [key]: value}));
        console.log(value)
    };
    const handleAdditionalOptionsChange = (options: AdditionalOptionsType) => {
        setConfig(prev => ({ ...prev, additionalOptions: options }));
    };
    const handleWiresTypeChange = (options: WiresTypeParam) => {
        setConfig(prev => ({ ...prev, wireType: options }));
    };
    function generateCableMark(config: CableConfigType) {
        const { additionalOptions} = config;

        const optionsMark = [
            additionalOptions.waterBlock ? "в" : "",
            additionalOptions.compressed ? "о" : "",
            additionalOptions.ex_i ? "Ex-i" : "",
        ].filter(Boolean).join(" ");

        const fireResistantCondition = config.additionalOptions.fireResistant ? "FR" : "";
        const coldResistantCondition =
            config.sheath === "нг(A)-HF"
                ? (additionalOptions.highColdResistant ? "-АХЛ" : "-ХЛ")
                : additionalOptions.coldResistant ? "-ХЛ"
                    :  config.sheath === "У" ? "-АХЛ" :
                    additionalOptions.highColdResistant ? "-АХЛ"
                        : "";
        const polyethylene = config.additionalOptions.polyethylene ? "Пс" : "";
        const twistTypeCondition = config.twistType === "2" ? "х2" : config.twistType === "3" ?"х3": config.twistType === "4"? "х4": "";
        const sectionCondition = config.section === 1 ? "1,0": config.section.toString().replace('.', ',');
        const wireType = config.wireType.singleWire ? "1" : config.wireClass;
        const tinnedMark = config.wireType.tinnedWire ? "л" : "м";


        return `СКАБ-C${config.screen} 660${config.armour}${polyethylene}${fireResistantCondition}${config.sheath}${coldResistantCondition}
        ${config.coreCount}${twistTypeCondition}${config.individualScreen}х${sectionCondition}
        ${tinnedMark}${wireType} ${optionsMark}`;
    }
        const twistedTitle = config.twistType === "2" ? "Количество пар" : config.twistType === "3" ? "Количество троек" : config.twistType === "4" ? "Количество четверок" : "Количество жил"
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{generateCableMark(config)} </h1>
            <div className={styles.wrapper}>
                <div className={styles.configSections}>
                    <h2 className={styles.sectionTitle}>Основные параметры</h2>
                   <WireTypeSelector title="Тип жилы"
                                     value={config.wireType}
                                     onChange={handleWiresTypeChange}/>

                    {config.wireType.singleWire ? "" :
                        <NumSelector title="Класс гибкости" value={config.wireClass}
                                     data={WireClass}
                                     onChange={(e) => updateConfig("wireClass", Number(e))}/>}

                    <RequiredSelector title="Тип скрутки" data={WiresTwisted} value={config.twistType}
                                      onChange={(e) => updateConfig("twistType", e)}/>

                    <NumSelector title={twistedTitle} value={config.coreCount} data={CoreCount}
                                 onChange={(e) => updateConfig("coreCount", Number(e))}/>

                    <NumSelector title="Сечение"
                                 value={config.section}
                                 data={config.twistType === '3' ?
                                     SectionTriadCores : config.twistType === '4' ?
                                         SectionQuadCores : SectionCores}
                                 onChange={(e) => updateConfig("section", Number(e))}/>

                </div>

                <>
                    <SelectorOptional title="Исполнение" data={Sheath} value={config.sheath}
                                      onChange={(e) => updateConfig("sheath", e)}/>

                    <SelectorOptional title="Общий экран" data={Screens} value={config.screen}
                                      onChange={(e) => updateConfig("screen", e)}/>

                    <SelectorOptional title="Индивидуальный экран" data={IndividualScreens} value={config.individualScreen}
                                      onChange={(e) => updateConfig("individualScreen", e)}/>

                    <SelectorOptional title="Броня" data={Armour} value={config.armour}
                                      onChange={(e) => updateConfig("armour", e)}/>
                    <AdditionalOptionsSelector title="Дополнительные параметры" data={AdditionalOptionsList} selected={config.additionalOptions}
                                               onChange={handleAdditionalOptionsChange}/>
                </>

            </div>
            <div className={styles.info}>

            </div>


        </div>
    );
};
