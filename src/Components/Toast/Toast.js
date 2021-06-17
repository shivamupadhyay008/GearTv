import { toast } from 'react-toastify';

export function openToast(msg,type){
    type
      ? toast.success(msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      : toast.error(msg, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
}