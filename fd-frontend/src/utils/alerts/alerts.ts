import Swal from "sweetalert2";

export const alert = Swal.mixin({
  confirmButtonColor: "#1976d2",
});

export const toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const choice = Swal.mixin({
  showCancelButton: true,
  confirmButtonColor: "#1976d2",
  cancelButtonColor: "#d32f2f",
});
