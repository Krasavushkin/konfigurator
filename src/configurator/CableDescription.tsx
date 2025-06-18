import React from 'react';
import {CableConfigType} from "./cableConfig";
import styles from "./CableDesription.module.css"

type CableDescriptionType = {
    data: CableConfigType
}
export const CableDescription = ({data}: CableDescriptionType) => {
    const description = (data: CableConfigType) => {
        const wire = data.wireType.singleWire ? "однопроволочными" : "многопроволочными";
        const wireClass = data.wireType.singleWire ? 1 : data.wireClass ;
        const tinned = !data.wireType.tinnedWire ? "" : "луженых";
        const twisted = data.twistType === "2" ?
            "парной скрутки" : data.twistType === "3" ?
                "троечной скрутки" : data.twistType === "4"?
                    "четверочной скрутки" : "скрутки в сердечник";
        const sheath = data.sheath === "LS" ?
            "поливинилхлоридного пластиката пониженной пожарной опасности" : data.sheath === "HF" ?
                "полимерной композиции, не содержащей галогенов" : data.sheath === "LSLTx" ?
                    "ПВХ пластиката пониженной пожарной опасности с низкой токсичностью продуктов горения" : "полиуретана безгалогенного термопластичного";
        const isolation = data.additionalOptions.fireResistant ? "керамообразующей кремнийорганической резины" :
            data.additionalOptions.polyethylene ? "сшитого полиэтилена" : sheath;
        const compressed = data.additionalOptions.compressed ? "без внутреннего заполнения, не подходит для применения во взрывоопасных зонах" : "с внутренним заполнением"
        const screen = data.screen === "Эф" ?
            "с общим экраном в виде ламинированной алюминиевой фольги" : data.screen === "Эфм" ?
                "с общим экраном в виде ламинированной медной фольги" : data.screen === "Эо" ?
                    "с общим экраном в виде оплетки из медных луженых проволок" : data.screen === "Эом" ?
                        "с общим экраном в виде оплетки из медных проволок" : data.screen === "Э" ?
                            "с общим экраном в виде ламинированной алюминиевой фольги и оплетки из медных луженых проволок":
                            data.screen === "Эм" ? "с общим экраном в виде ламинированной медной фольги и оплетки из медных проволок": "без общего экрана";
        const individualScreen = data.individualScreen === "эф" ?
            ", с индивидуальным экраном в виде ламинированной алюминиевой фольги" : data.screen === "эфм" ?
                ", с индивидуальным экраном в виде ламинированной медной фольги" : data.screen === "эо" ?
                    ", с индивидуальным экраном в виде оплетки из медных луженых проволок" : data.screen === "эом" ?
                        ", с индивидуальным экраном в виде оплетки из медных проволок" : "";
        const armour = data.armour === "Бc" ? "c броней в виде наложенных спирально стальных оцинкованных лент и с защитным шлангом" :
            data.armour === "Б" ? "c броней в виде наложенной продольно стальной ленты с полимерным покрытием и с защитным шлангом" :
                data.armour === "КГ" ? "c броней в виде оплетки из стальных оцинкованных проволок без защитного шланга":
                    data.armour === "К" ? "c броней в виде оплетки из стальных оцинкованных проволок с защитным шлангом" :
                        data.armour === "Кс" ? "c броней в виде спирального повива из стальных оцинкованных проволок и с защитным шлангом" : "без брони";
        const waterBlock = data.additionalOptions.waterBlock ? ", с водоблокирующей лентой" : "";
        const ex_i = data.additionalOptions.ex_i ? ", для «искробезопасной» цепи с оболочкой синего цвета" : "";
        const coldResistant = data.sheath === "HF" ? "" : data.additionalOptions.coldResistant ? " повышенной морозостойкости" : "";
        const highColdResistant = data.sheath === "У" ? "" : data.additionalOptions.highColdResistant ? ", повышенной тепломорозостойкости" : "";
        const extremeColdResistant = data.additionalOptions.extremeColdResistant ? ", повышенной морозостойкости" : "";
        const getTemperatureRange = (data: CableConfigType) => {
            const { sheath, additionalOptions } = data;
            const { coldResistant, fireResistant, extremeColdResistant, polyethylene, highColdResistant } = additionalOptions;

            if (sheath === "LSLTx") {
                return "температура эксплуатации от -40˚С до +70˚С";
            }

            if (sheath === "LS") {
                if (coldResistant && fireResistant) {
                    return "температура эксплуатации от -70˚С до +90˚С";
                }
                if (coldResistant) {
                    return "температура эксплуатации от -70˚С до +70˚С";
                }
                if (highColdResistant) {
                    return "температура эксплуатации от -75˚С до +125˚С";
                }
                return "температура эксплуатации от -50˚С до +70˚С";
            }

            if (sheath === "HF") {
                if (polyethylene) {
                    return "температура эксплуатации от -70˚С до +125˚С";
                }
                if (extremeColdResistant) {
                    return "температура эксплуатации от -75˚С до +90˚С";
                }
                if (highColdResistant) {
                    return "температура эксплуатации от -75˚С до +125˚С";
                }
                return "температура эксплуатации от -70˚С до +90˚С";
            }

            if (highColdResistant) {
                return "температура эксплуатации от -75˚С до +125˚С";
            }

            return "";
        };

// Использование:
        const temperature = getTemperatureRange(data);
        return (`Кабель универсальный на номинальное переменное напряжение 660 В с ${wire} жилами ${wireClass}
                 класса по ГОСТ 22483 из медных ${tinned} проволок, с номинальным сечением токопроводящих жил ${data.section} мм², ${twisted}${individualScreen}, ${screen},
                 с изоляцией из ${isolation}${highColdResistant}${extremeColdResistant}, ${compressed}, с оболочкой из ${sheath}${coldResistant}${highColdResistant}${extremeColdResistant}, ${armour}, ${temperature} ${waterBlock}${ex_i}. 
                 Гарантийный срок эксплуатации - 6 лет.`)
    }
    return (
        <div>
            <h2 className={styles.h2}>Описание кабеля</h2>
             <p className={styles.p}> {description(data)}</p>
        </div>
    );
};
