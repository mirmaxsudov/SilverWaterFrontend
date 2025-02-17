import { toast } from "react-toastify";
import "./toast.css";

export const notify = (message = "Just a message") => {
  return toast(message);
};

export const notifySuccess = (msg) => {
  toast.success(msg, {
    className: "notify-success",
  });
};

export const notifyError = (msg) => {
  toast.error(msg, {
    className: "notify-error",
  });
};

export const notifyInfo = (msg) => {
  toast.info(msg, {
    className: "notify-info",
  });
};
