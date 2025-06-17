import React, {useState} from 'react';
import {SelectorOptional} from "./SelectorOptional";
import {
    AdditionalOptionsList, AdditionalOptionsType,
    Armour,
    CoreCount,
    IndividualScreens, initConfig,
    Screens,
    SectionCores, SectionQuadCores, SectionTriadCores,
    Sheath, WireClass,
    WiresTwisted, WiresTypeParam,
} from "./cableConfig";
import {CableConfigType} from "./cableConfig";
import {RequiredSelector} from "./RequiredSelector";
import {NumSelector} from "./NumSelector";
import {AdditionalOptionsSelector} from "./AdditionalOptionsSelector";
import styles from './Configurator.module.css';
import {WireTypeSelector} from "./WireTypeSelector";
import {CableDescription} from "./CableDescription";
import {GeneratorCableMark} from "./GeneratorCableMark";


export const Configurator = () => {

    const [config, setConfig] = useState<CableConfigType>(initConfig);
    const updateConfig = (key: keyof CableConfigType, value: string | number | boolean) => {
        setConfig(prev => ({...prev, [key]: value}));

    };

    const handleSheathChange = (key: keyof CableConfigType, value: string) => {
        console.log(value)
        if (value === "") {
            value = "LS"
        }
        setConfig(prev => {
            const updated = {...prev, [key]: value};

            // Для HF сразу включаем coldResistant
            if (value === "HF") {
                updated.additionalOptions = {
                    ...updated.additionalOptions,
                    coldResistant: true,
                    highColdResistant: false,
                    extremeColdResistant: false
                };
            }
            // Для LSLTx сбрасываем параметры
            else if (value === "LSLTx") {
                updated.additionalOptions = {
                    ...updated.additionalOptions,
                    highColdResistant: false,
                    coldResistant: false,
                    extremeColdResistant: false,
                    polyethylene: false
                };
            }
            else if (value === "У") {
                updated.additionalOptions = {
                    ...updated.additionalOptions,
                    highColdResistant: true,
                    coldResistant: false,
                    extremeColdResistant: false,
                    polyethylene: false
                };
            }
            else if (value === "LS") {
                updated.additionalOptions = {
                    ...updated.additionalOptions,
                    highColdResistant: false,
                    coldResistant: false,
                    extremeColdResistant: false,
                    polyethylene: false
                };
            }
            return updated;
        });
    };

    const handleAdditionalOptionsChange = (newOptions: AdditionalOptionsType) => {
        setConfig(prev => {
            const { polyethylene: wasPE, highColdResistant: wasHCR, coldResistant: wasCR } = prev.additionalOptions;
            const { polyethylene: newPE, highColdResistant: newHCR } = newOptions;
            const { sheath } = prev;

            let updated = { ...newOptions };

            // Логика для LS оболочки
            if (sheath === "LS") {
                if (!wasPE && newPE) {
                    updated.highColdResistant = true;
                    updated.coldResistant = false;
                    updated.extremeColdResistant = false;
                }
                else if (wasHCR && !newHCR) {
                    updated.polyethylene = false;
                }
                else if (wasPE && !newPE) {
                    updated.highColdResistant = false;
                }
            }

            // Обработка полиэтилена для HF
            if (sheath === "HF" && !wasPE && newPE) {
                updated.highColdResistant = false;
                updated.extremeColdResistant = false;
            }

            // Взаимоисключения температурных опций
            const activeTempOption = ['coldResistant', 'highColdResistant', 'extremeColdResistant']
                .find(option => updated[option as keyof AdditionalOptionsType]);

            if (activeTempOption) {
                ['coldResistant', 'highColdResistant', 'extremeColdResistant']
                    .filter(option => option !== activeTempOption)
                    .forEach(option => {
                        updated[option as keyof AdditionalOptionsType] = false;
                    });
            }

            return { ...prev, additionalOptions: updated };
        });
    };
    const handleWiresTypeChange = (options: WiresTypeParam) => {
        setConfig(prev => ({...prev, wireType: options}));
    };
    const resetCableMark = () => {
        setConfig(initConfig)
    }


    const applyDisablingRules = (config: CableConfigType) => {
        const { sheath, additionalOptions: { polyethylene } } = config;
        const disabledSheaths = ["У", "LSLTx"];
        const tempRestrictedSheaths = ["LS", "У", "LSLTx"];

        return {
            individualScreens: IndividualScreens.map(item => ({
                ...item,
                disabled: config.coreCount === 1
            })),
            addOptions: AdditionalOptionsList.map(item => ({
                ...item,
                disabled:
                    item.key === "coldResistant" ? (polyethylene || disabledSheaths.includes(sheath)) :
                        item.key === "extremeColdResistant" ? (sheath === "HF" && polyethylene) || tempRestrictedSheaths.includes(sheath) :
                            item.key === "highColdResistant" ? (sheath === "HF" && polyethylene) || (!polyethylene && tempRestrictedSheaths.includes(sheath)) :
                                item.key === "polyethylene" ? disabledSheaths.includes(sheath) :
                                    item.disabled
            }))
        };
    };
    const disabledItems = applyDisablingRules(config);

    const numData = config.twistType === '3' ?
        SectionTriadCores : config.twistType === '4' ?
            SectionQuadCores : SectionCores;

    const twistedTitle = config.twistType === "2" ?
        "Количество пар" : config.twistType === "3" ?
            "Количество троек" : config.twistType === "4" ?
                "Количество четверок" : "Количество жил"
    return (
        <div>
            <h1 className={styles.header}> Конфигуратор кабеля марки СКАБ-С </h1>
            <div className={styles.container}>

                <div className={styles.wrapper}>
                    <div className={styles.configSections}>

                        <WireTypeSelector title="Тип жилы"
                                          value={config.wireType}
                                          onChange={handleWiresTypeChange}/>
                        <div className={styles.wireContainer}>

                            <RequiredSelector title="Тип скрутки"
                                              data={WiresTwisted}
                                              value={config.twistType}
                                              onChange={(e) => updateConfig("twistType", e)}/>

                            <NumSelector title={twistedTitle}
                                         value={config.coreCount}
                                         data={CoreCount}
                                         onChange={(e) => updateConfig("coreCount", Number(e))}/>

                            <NumSelector title="Сечение жилы, мм²"
                                         value={config.section}
                                         data={numData}
                                         onChange={(e) => updateConfig("section", Number(e))}/>
                            {config.wireType.singleWire ? "" :
                                <NumSelector title="Класс гибкости" value={config.wireClass}
                                             data={WireClass}
                                             onChange={(e) => updateConfig("wireClass", Number(e))}/>}

                        </div>


                    </div>

                    <>
                        <SelectorOptional title="Исполнение"
                                          data={Sheath}
                                          value={config.sheath}
                                          onChange={(e) => handleSheathChange("sheath", e)}/>

                        <SelectorOptional title="Общий экран"
                                          data={Screens}
                                          value={config.screen}
                                          onChange={(e) => updateConfig("screen", e)}/>

                        <SelectorOptional title="Индивидуальный экран"
                                          data={disabledItems.individualScreens}
                                          value={config.individualScreen}
                                          onChange={(e) => updateConfig("individualScreen", e)}/>

                        <SelectorOptional title="Броня"
                                          data={Armour}
                                          value={config.armour}
                                          onChange={(e) => updateConfig("armour", e)}/>
                        <AdditionalOptionsSelector
                            title="Дополнительные параметры (возможен выбор нескольких параметров)"
                            value={config.additionalOptions}
                            data={disabledItems.addOptions}
                            onChange={handleAdditionalOptionsChange}/>
                    </>

                </div>
                <div className={styles.info}>
                    <GeneratorCableMark data={config}/>
                    <button className={styles.reset} onClick={resetCableMark}>Сброс конфигурации</button>
                    <CableDescription data={config}/>
                </div>


            </div>
        </div>

    );
};
