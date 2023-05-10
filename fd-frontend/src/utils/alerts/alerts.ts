import Swal from "sweetalert2";

export const alert = Swal.mixin({
  customClass: {
    confirmButton:
      "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-fullWidth css-tasndr-MuiButtonBase-root-MuiButton-root",
  },
  buttonsStyling: false,
});
