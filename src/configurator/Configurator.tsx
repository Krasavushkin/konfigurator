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
    const handleAdditionalOptionsChange = (options: AdditionalOptionsType) => {
        setConfig(prev => ({...prev, additionalOptions: options}));
    };
    const handleWiresTypeChange = (options: WiresTypeParam) => {
        setConfig(prev => ({...prev, wireType: options}));
    };
    const resetCableMark = () => {
        setConfig(initConfig)
    }

    const applyDisablingRules = (config: CableConfigType) => {
        const individualScreensDisabled = config.coreCount === 1;
        const coldResistantDisabled = config.additionalOptions.polyethylene
            ? true : config.sheath === "HF" || config.sheath === "У" || config.sheath === "LSLTx";
        const extremeColdResistantDisabled = config.sheath === "LS" || config.sheath === "У" || config.sheath === "LSLTx";
        const highColdResistantDisabled = config.additionalOptions.polyethylene
            ? false
            : config.sheath === "LS" || config.sheath === "У" || config.sheath === "LSLTx";

        return {
            individualScreens: IndividualScreens.map(item => ({
                ...item,
                disabled: individualScreensDisabled
            })),

            addOptions: AdditionalOptionsList.map(item => ({
                ...item,
                disabled:
                    item.key === "coldResistant" ? coldResistantDisabled :
                        item.key === "extremeColdResistant" ? extremeColdResistantDisabled :
                            item.key === "highColdResistant" ? highColdResistantDisabled :
                                item.disabled
            })),

        };
    };
    const numData = config.twistType === '3' ?
        SectionTriadCores : config.twistType === '4' ?
            SectionQuadCores : SectionCores;

    const disabledItems = applyDisablingRules(config);

    const twistedTitle = config.twistType === "2" ? "Количество пар" : config.twistType === "3" ? "Количество троек" : config.twistType === "4" ? "Количество четверок" : "Количество жил"
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
                                          onChange={(e) => updateConfig("sheath", e)}/>

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
                            data={disabledItems.addOptions}
                            selected={config.additionalOptions}
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
