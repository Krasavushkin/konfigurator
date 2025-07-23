import React, {useRef, useState} from 'react';
import {SelectorOptional} from "./SelectorOptional";
import {
    AdditionalOptionsList, AdditionalOptionsType,
    Armour,
    CoreCount,
    IndividualScreens, initConfig,
    Screens,
    SectionCores, SectionQuadCores, SectionTriadCores,
    Sheath, WireClass, WireClassForSection,
    WiresTwisted, WiresTypeParam,
} from "./cableConfig";
import {CableConfigType} from "./cableConfig";
import {RequiredSelector} from "./RequiredSelector";
import {NumSelector} from "./NumSelector";
import {AdditionalOptionsSelector} from "./AdditionalOptionsSelector";
import styles from './styles/Configurator.module.css';
import {WireTypeSelector} from "./WireTypeSelector";
import {CableDescription} from "./CableDescription";
import {GeneratorCableMark} from "./GeneratorCableMark";
import {Header} from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//git push second-repo main

export const Configurator = () => {
    const notificationShown = useRef(false);
    const [config, setConfig] = useState<CableConfigType>(initConfig);
    const updateConfig = (key: keyof CableConfigType, value: string | number | boolean) => {
        setConfig(prev => ({...prev, [key]: value}));

    };
    const handleSectionChange = (key: keyof CableConfigType, value: number) => {
        setConfig(prev => {
            const update = {...prev, [key]: value};
            if (value === 0.35) {
                update.wireClass = 4;
            }
            return update
    })}
    const handleSheathChange = (key: keyof CableConfigType, value: string) => {
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
            if (value === "FR") {
                if (updated.individualScreen === "эо") {
                    updated.individualScreen = "эф";
                } else if (updated.individualScreen === "эом") {
                    updated.individualScreen = "эфм";
                }
            }

            return updated;
        });
    };

    const handleAdditionalOptionsChange = (newOptions: AdditionalOptionsType) => {
        setConfig(prev => {
            const { polyethylene: wasPE, highColdResistant: wasHCR, fireResistant: wasFR  } = prev.additionalOptions;
            const { polyethylene: newPE, highColdResistant: newHCR, fireResistant: newFR  } = newOptions;
            const { sheath, individualScreen } = prev;

            let updated = { ...newOptions };
            let updatedIndividualScreen = individualScreen;

            if (newFR && !wasFR) {
                if (individualScreen === "эо") {
                    updatedIndividualScreen = "эф";
                } else if (individualScreen === "эом") {
                    updatedIndividualScreen = "эфм";
                }
            }
            if (newFR && !wasFR && !notificationShown.current) {
                if (individualScreen === "эо" || individualScreen === "эом") {
                    notificationShown.current = true;
                    setTimeout(() => {
                        toast.info('Индивидуальный экран изменён с оплётки на фольгу для огнестойкого исполнения', {
                            toastId: 'screen-change',
                            position: "top-center",
                            autoClose: 3000,
                            style: {
                                color: `black`,
                                fontSize: '20px',
                                borderRadius: '8px',
                                border: `1px solid black`,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }
                        });
                        notificationShown.current = false;
                    }, 1);
                }
            }
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


            return { ...prev, additionalOptions: updated,  individualScreen: updatedIndividualScreen };
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
            individualScreens: IndividualScreens.map(item => {
                const { fireResistant, polyethylene } = config.additionalOptions;
                const { coreCount } = config;

                if (fireResistant && polyethylene) {
                    return { ...item, disabled: false };
                }

                let disabled = item.disabled;
                switch (item.name) {
                    case "эо":
                    case "эом":
                        disabled = coreCount === 1 || fireResistant;
                        break;
                    case "эф":
                    case "эфм":
                        disabled = coreCount === 1;
                        break;
                }

                return { ...item, disabled };
            }),
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
            <Header />
            <ToastContainer />
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
                                         onChange={(e) => handleSectionChange("section", Number(e))}/>
                            {config.wireType.singleWire ? "" :
                                <NumSelector title="Класс гибкости" value={config.wireClass}
                                             data={config.section === 0.35 ? WireClassForSection : WireClass}
                                             onChange={(e) => updateConfig("wireClass", Number(e))}/>}

                        </div>


                    </div>

                    <>
                        <SelectorOptional title="Тип оболочки"
                                          data={Sheath}
                                          value={config.sheath}
                                          onChange={(e) => handleSheathChange("sheath", e)}/>

                        <SelectorOptional title="Индивидуальный экран"
                                          data={disabledItems.individualScreens}
                                          value={config.individualScreen}
                                          onChange={(e) => updateConfig("individualScreen", e)}/>

                        <SelectorOptional title="Общий экран"
                                          data={Screens}
                                          value={config.screen}
                                          onChange={(e) => updateConfig("screen", e)}/>

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
