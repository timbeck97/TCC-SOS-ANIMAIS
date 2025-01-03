import Swal from "sweetalert2";
export const openAlert = (message: string, type:'success'|'warning') => {
  const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: type,
      title: message
    });
}
export const openAlertSuccess = (message: string) => {
    openAlert(message, 'success');
}
export const openAlertWarning = (message:string)=>{
    openAlert(message, 'warning');
}