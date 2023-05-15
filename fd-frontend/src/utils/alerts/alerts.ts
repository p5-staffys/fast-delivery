import Swal from "sweetalert2";

export const alert = Swal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-tasndr-MuiButtonBase-root-MuiButton-root",
    cancelButton: "MuiButton-containedSecondary",
  },
  buttonsStyling: false,
});

export const toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 2000,
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-tasndr-MuiButtonBase-root-MuiButton-root",
  },
  buttonsStyling: false,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
