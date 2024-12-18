let openModalRef:any = null;
export const setOpenModalRef = (ref:any) => {
    openModalRef = ref;
  };

export const openModalInstance = (content:string, callback:()=>void|undefined) => {
if (openModalRef) {
    openModalRef(content, callback);
}
};