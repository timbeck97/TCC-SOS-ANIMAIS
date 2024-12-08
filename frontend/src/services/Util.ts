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