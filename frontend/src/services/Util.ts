export const formatCpf = (cpf: string) => {
    return cpf.replace(/\D/g, '') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') ;
}


export const formatNumberInput = (v:string)=>{
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
    var d = new Date();
    var day = d.getDay();
    var diff = 8 - day; // days until next monday
    d.setDate(d.getDate() + diff);
    d.setUTCHours(7, 30, 0, 0);
    const isoString = d.toISOString(); // Ex: "2018-06-12T19:30:00.000Z"
    let result=isoString.slice(0, 16)
    return result;
}
export const parseDate = (date: string) => {
    const dateArray = date.split('/')
    return new Date(parseInt(dateArray[2]), parseInt(dateArray[1])-1, parseInt(dateArray[0]))
}
