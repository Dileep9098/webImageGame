import { toast } from "sonner";

export const showSuccessMgs = (message) => {
    toast.success(message)
}
export const showErrorMgs = (message) => {
    toast.error(message)
}
export const showInfoMgs = (message) => {
    toast.info(message)
}