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
    extremeColdResistant: boolean,
    polyethylene: boolean
}
export type AdditionalOptionListType = {
    id: string;
    key: keyof AdditionalOptionsType;
    name: string;
    description: string;
    disabled?: boolean;
};
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

export const initialAdditionalOptions: AdditionalOptionsType = {
    waterBlock: false,
    compressed: false,
    ex_i: false,
    fireResistant: false,
    coldResistant: false,
    highColdResistant: false,
    extremeColdResistant: false,
    polyethylene: false
};
export const WireTypes: WiresTypeParam = {
    singleWire: false,
    strandedWire: true,
    tinnedWire: false
}
export const initConfig: CableConfigType = {
    sheath: "LS",
    coreCount: 1,
    twistType: "1",
    twistQuantity: "1",
    wireType: WireTypes,
    section: 0.35,
    wireClass: 3,
    armour: "",
    screen: "",
    individualScreen: "",
    additionalOptions: initialAdditionalOptions
}



export const Sheath: OptionalParam[] = [
    {id: nanoid(), name: "LS", description: "поливинилхлоридный пластикат пониженной пожарной опасности (LS)", disabled: false},
    {id: nanoid(), name: "HF", description: "полимерная композиция, не содержащая галогенов (HF)", disabled: false},
    {id: nanoid(), name: "LSLTx", description: "ПВХ пластикат пониженной пожарной опасности с низкой токсичностью продуктов горения (LSLTx)", disabled: false},
    {id: nanoid(), name: "У", description: "полиуретан безгалогенный термопластичный (У-АХЛ)", disabled: false},
]
export const CoreCount: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 19, 24, 27, 30, 37, 44, 48, 52, 61];

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



export const AdditionalOptionsList: AdditionalOptionListType[] = [
    { id: nanoid(), key: 'fireResistant', name: "FR", description: "огнестойкое исполнение, индекс «FR»", disabled: false },
    { id: nanoid(), key: 'waterBlock', name: "в", description: "водоблокирующий элемент, индекс «в»" },
    { id: nanoid(), key: 'compressed', name: "о", description: "без внутреннего заполнения, индекс «о»" },
    { id: nanoid(), key: 'ex_i', name: "Ex-i", description: "для «искробезопасной» цепи, индекс «Ex-i»" },
    { id: nanoid(), key: 'coldResistant', name: "ХЛ", description: "хладостойкое исполнение, индекс «ХЛ»", disabled: false },
    { id: nanoid(), key: 'highColdResistant', name: "АХЛ", description: "повышенная тепломорозостойкость, индекс «АХЛ»", disabled: false },
    { id: nanoid(), key: 'extremeColdResistant', name: "ЭХЛ", description: "повышенная морозостойкость, индекс «ЭХЛ»", disabled: false },
    { id: nanoid(), key: 'polyethylene', name: "ПС", description: "изоляция из сшитого полиэтилена, индекс «Пс»", disabled: false }
]