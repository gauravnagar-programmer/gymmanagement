import {toast} from "react-toastify"

const SuccessMessage = (msg) =>{
  toast.success(msg,{
    autoClose:1500
  })

}

const WarningMessage = (msg) =>{
  toast.warning(msg,{
    autoClose:1500
  })

}

const ErrorMessage = (msg) =>{
  toast.error(msg,{
    autoClose:1500
  })

}

export {SuccessMessage,WarningMessage,ErrorMessage}