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
        const compressed = data.additionalOptions.compressed ? "без внутреннего заполнения" : "с внутренним заполнением"
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
        const coldResistant = data.additionalOptions.coldResistant ? " повышенной морозостойкости" : "";
        const waterBlock = data.additionalOptions.waterBlock ? ", с водоблокирующей лентой" : "";
        const ex_i = data.additionalOptions.ex_i ? ", для «искробезопасной» цепи с оболочкой синего цвета" : "";
        return (`Кабель универсальный на номинальное переменное напряжение 660 В с ${wire} жилами ${wireClass}
                 класса по ГОСТ 22483 из медных ${tinned} проволок, с номинальным сечением токопроводящих жил ${data.section} мм², ${twisted}${individualScreen}, ${screen},
                 с изоляцией из ${isolation}, ${compressed}, с оболочкой из ${sheath}${coldResistant}, ${armour} ${waterBlock}${ex_i}`)
    }
    return (
        <div>
            <h2 className={styles.h2}>Описание кабеля</h2>
             <p className={styles.p}> {description(data)}</p>
        </div>
    );
};
