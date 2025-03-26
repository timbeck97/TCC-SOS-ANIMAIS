import { FORMA_PAGAMENTO, PORTE_ANIMAIS, SITUACOES, TIPO_ANIMAIS } from "./Constantes";

export const formatCpf = (cpf: string) => {
    return cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}


export const formatNumberInput = (v: string) => {
    var negativo = false;
    if (v.charAt(0) === '-') {
        negativo = true;
    }
    v = v.replace(/\D/g, "");

    //Coloca ponto entre o segundo e o terceiro dígitos
    if (v.length > 2) {
        v = v.replace(/([0-9]{2})$/g, ",$1");
    }
    if (v.length > 6) {
        v = v.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    if (v.length > 10) {
        v = v.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3");
    }
    if (v.length > 14) {
        v = v.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4");
    }
    if (v.length > 18) {
        v = v.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3.$4,$5");
    }
    return (negativo ? "-" : "") + v;
}
export const fintNextMonday = () => {

    const now = new Date();
    const daysUntilMonday = (8 - now.getDay()) % 7 || 7;

    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(7, 0, 0, 0);

    const year = nextMonday.getFullYear();
    const month = String(nextMonday.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const day = String(nextMonday.getDate()).padStart(2, '0');
    const hours = String(nextMonday.getHours()).padStart(2, '0');
    const minutes = String(nextMonday.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
export const parseDate = (date: string) => {
    const dateArray = date.split('/')
    return new Date(parseInt(dateArray[2]), parseInt(dateArray[1]) - 1, parseInt(dateArray[0]))
}
export const formatDate = (date: Date | string) => {
    console.log(date)
    if (!date) {
        return ''
    }
    if (typeof date === 'string') {
        date = new Date(date)
    }
    //format date to dd/mm/yyyy
    return date.toLocaleDateString('pt-BR')
}
export const formatDateWithHour = (date: Date | string) => {
    if (!date) {
        return ''
    }
    if (typeof date === 'string') {
        date = new Date(date)
    }
    //format date to dd/mm/yyyy hh:mm
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR')

}
export const formatPorteAnimal = (porte: string | undefined) => {
    if (!porte) {
        return ''
    }
    for (let i = 0; i < PORTE_ANIMAIS.length; i++) {
        if (PORTE_ANIMAIS[i].value === porte) {
            return PORTE_ANIMAIS[i].label
        }
    }
    return porte;
}
export const formatTipoAnimal = (tipo: string | undefined) => {
    if (!tipo) {
        return ''
    }
    for (let i = 0; i < TIPO_ANIMAIS.length; i++) {
        if (TIPO_ANIMAIS[i].value === tipo) {
            return TIPO_ANIMAIS[i].label
        }
    }
    return tipo;
}
export const formatSituacao = (situacao?: string) => {
    if (!situacao) {
        return ''
    }
    for (let i = 0; i < SITUACOES.length; i++) {
        if (SITUACOES[i].value === situacao) {
            return SITUACOES[i].label
        }
    }
    return situacao
}
export const formatFormaPagamento = (formaPagamento: string | undefined) => {
    if (!formaPagamento) {
        return ''
    }
    for (let i = 0; i < FORMA_PAGAMENTO.length; i++) {
        if (FORMA_PAGAMENTO[i].value === formaPagamento) {
            return FORMA_PAGAMENTO[i].label
        }
    }
    return formaPagamento;
}
export const isEmpty = (value: any) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
    );
}
export const getYearsCombobox = () => {
    const anos = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 2; i < currentYear; i++) {
        anos.push({ id: i.toString(), label:i.toString() });
    }
    for (let i = currentYear; i < currentYear + 5; i++) {
        anos.push({ id: i.toString(), label: i.toString() });
    }
    return anos;
}
export const getInitialMonth = (next: boolean) => {
    let month = new Date().getMonth();
    if (next) {
        month += 1;
    }
    if (month <= 9) {
        return '0' + month;
    }
    return String(month);
}
export const formatValorMoeda=(valor:number)=>{
    if(Number.isNaN(valor))return '0,0'
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
}