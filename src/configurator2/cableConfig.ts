
import {nanoid} from "nanoid";


export type CableConfigType = {
    sheath: string,
    coreCount: number,
    twistType: string,
    twistQuantity: string,
    wireType: WiresTypeParam,

    section: number,
    wireClass: number,

    armour: string,
    screen: string,
    individualScreen: string,

    additionalOptions: AdditionalOptionsType
}

export type RequiredParam = {
    id: string,
    name: string,
    description: string
}

export type OptionalParam = {
    id: string,
    name: string,
    description: string,
    disabled: boolean
}
export type WiresTypeParam = {
    singleWire: boolean,
    strandedWire: boolean,
    tinnedWire: boolean
}

export type AdditionalOptionsType = {
    waterBlock: boolean,
    compressed: boolean,
    ex_i: boolean,
    fireResistant: boolean,
    coldResistant: boolean,
    highColdResistant: boolean,
    polyethylene: boolean
}

export type AdditionalOptionListType = {
    id: string;
    key: keyof AdditionalOptionsType;
    name: string;
    description: string;
    disabled?: boolean;
};
export const Sheath: OptionalParam[] = [
    {id: nanoid(), name: "нг(A)-LS", description: "поливинилхлоридный пластикат пониженной пожарной опасности", disabled: false},
    {id: nanoid(), name: "нг(A)-HF", description: "полимерная композиция, не содержащая галогенов", disabled: false},
    {id: nanoid(), name: "нг(A)-LSLTx", description: "ПВХ пластикат пониженной пожарной опасности с низкой токсичностью продуктов горения", disabled: false},
    {id: nanoid(), name: "У", description: "полиуретан безгалогенный термопластичный", disabled: false},
]
export const CoreCount: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 19, 24, 27, 30, 37, 44, 48, 52, 61];
export const WireTypes: WiresTypeParam = {
    singleWire: false,
    strandedWire: false,
    tinnedWire: false
}
/*export const WireTypes: RequiredParam[] = [
    {id: nanoid(), name: "Однопроволочная", description: "однопроволочная"},
    {id: nanoid(), name: "Многопроволочная", description: "многопроволочная"},
]*/
export const WiresTwisted: RequiredParam[] = [
    {id: nanoid(), name: "1", description: "В сердечник"},
    {id: nanoid(), name: "2", description: "Парная"},
    {id: nanoid(), name: "3", description: "Троечная"},
    {id: nanoid(), name: "4", description: "Четверочная"}
]

export const WireClass: number[] = [2, 3, 4, 5]
export const SectionCores = [0.35, 0.50, 0.75, 1.0, 1.5, 2.5, 4, 6, 10, 16];
export const SectionTriadCores = [0.35, 0.50, 0.75, 1.0, 1.5, 2.5, 4, 6];
export const SectionQuadCores = [0.35, 0.50, 0.75, 1.0, 1.5, 2.5];

export const Screens: OptionalParam[] = [
    {id:nanoid(), name: "", description: "без общего экрана", disabled: false},
    {id:nanoid(), name: "Эф", description: "общий экран в виде ламинированной алюминиевой фольги", disabled: false},
    {id:nanoid(), name: "Эфм", description: "общий экран в виде ламинированной медной фольги", disabled: false},
    {id:nanoid(), name: "Эо", description: "общий экран в виде оплетки из медных луженых проволок", disabled: false},
    {id:nanoid(), name: "Эом", description: "общий экран в виде оплетки из медных проволок", disabled: false},
    {id:nanoid(), name: "Э", description: "общий экран в виде ламинированной алюминиевой фольги и оплетки из медных луженых проволок", disabled: false},
    {id:nanoid(), name: "Эм", description: "общий экран в виде ламинированной медной фольги и оплетки из медных проволок", disabled: false},
]
export const IndividualScreens: OptionalParam[] = [
    {id:nanoid(), name: "", description: "без индивидуального экрана", disabled: false},
    {id:nanoid(), name: "эф", description: "индивидуальный экран в виде ламинированной алюминиевой фольги", disabled: false},
    {id:nanoid(), name: "эфм", description: "индивидуальный экран в виде ламинированной медной фольги", disabled: false},
    {id:nanoid(), name: "эо", description: "индивидуальный экран в виде оплетки из медных луженых проволок", disabled: false},
    {id:nanoid(), name: "эом", description: "индивидуальный экран в виде оплетки из медных проволок", disabled: false},
]
export const Armour: OptionalParam[] = [
    {id:nanoid(), name: "", description: "без защитного элемента (брони)", disabled: false},
    {id:nanoid(), name: "Бc", description: "в виде наложенных спирально стальных оцинкованных лент и с защитным шлангом", disabled: false},
    {id:nanoid(), name: "Б", description: "в виде наложенной продольно стальной ленты с полимерным покрытием и с защитным шлангом", disabled: false},
    {id:nanoid(), name: "КГ", description: "в виде оплетки из стальных оцинкованных проволок без защитного шланга", disabled: false},
    {id:nanoid(), name: "К", description: "в виде оплетки из стальных оцинкованных проволок с защитным шлангом", disabled: false},
    {id:nanoid(), name: "Кc", description: "в виде спирального повива из стальных оцинкованных проволок и с защитным шлангом", disabled: false},
]


export const initialAdditionalOptions: AdditionalOptionsType = {
    waterBlock: false,
    compressed: false,
    ex_i: false,
    fireResistant: false,
    coldResistant: false,
    highColdResistant: false,
    polyethylene: false
};
export const AdditionalOptionsList: AdditionalOptionListType[] = [
    { id: nanoid(), key: 'waterBlock', name: "в", description: "водоблокирующий элемент" },
    { id: nanoid(), key: 'compressed', name: "о", description: "без внутреннего заполнения" },
    { id: nanoid(), key: 'ex_i', name: "Ex-i", description: "для «искробезопасной» цепи" },
    { id: nanoid(), key: 'fireResistant', name: "FR", description: "огнестойкий" },
    { id: nanoid(), key: 'coldResistant', name: "ХЛ", description: "хладостойкое исполнение" },
    { id: nanoid(), key: 'highColdResistant', name: "АХЛ", description: "повышенная тепломорозостойкость" },
    { id: nanoid(), key: 'polyethylene', name: "ПС", description: "изоляция из сшитого полиэтилена" }
]