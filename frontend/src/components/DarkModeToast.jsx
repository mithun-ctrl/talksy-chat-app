import toast from "react-hot-toast";


export const darkSuccessToast = ({msg}) =>{

    toast.success(msg, {
        style:{
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })
}

export const darkErrorToast = ({msg}) => {

    toast.error(msg, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
    })
}

