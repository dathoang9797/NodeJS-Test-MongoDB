import Swal from "sweetalert2";

export function alertError(message) {
  return Swal.fire({
    icon: "error",
    text: message,
  });
}

export function alertSuccess(message) {
  return Swal.fire({
    position: "center-center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}
