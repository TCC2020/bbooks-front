import Swal, {SweetAlertResult} from 'sweetalert2';

export class Util {

    static loadingForm(): void {
        Swal.fire({
            background: 'rgba(0,0,0,0) repeat scroll',
            showConfirmButton: false,
            showLoaderOnConfirm: false,
            showCancelButton: false,
            showCloseButton: false,
            timer: 20000,
            width: 90,
            padding: '5m',
            backdrop: `
      rgba(-10,-4,221,0.10)
      url("../../../../assets/images/loading.gif")
      center
      no-repeat
      `
        });
    }

    static loadingXLS(): void {
        Swal.fire({
            background: 'rgba(0,0,0,0) repeat scroll',
            showConfirmButton: false,
            showLoaderOnConfirm: true,
            showCancelButton: false,
            showCloseButton: false,
            timer: 20000,
            width: 90,
            padding: '5m',
            backdrop: `
      rgba(-10,-4,221,0.10)
      url("../../../../assets/images/loading.gif")
      center
      no-repeat
      `
        });
        Swal.close();
    }

    static loadingScreen() {
        Swal.fire({
            background: 'rgba(0,0,0,0) repeat scroll',
            showConfirmButton: false,
            showLoaderOnConfirm: false,
            showCancelButton: false,
            showCloseButton: false,
            timer: 5000,
            width: 90,
            padding: '5m',
            backdrop: `
      rgba(255, 255, 255, 0.6)
      url("../../../../assets/images/loading.gif")
      center
      no-repeat
      `
        });
    }

    static stopLoading(): void {
        Swal.close();
    }

    static showSuccessDialog(msg: string): Promise<SweetAlertResult> {
        // @ts-ignore
        return Swal.fire({
            icon: 'success',
            text: msg,
            showConfirmButton: true,
            confirmButtonText: 'Ok',
            showCancelButton: false
        });
    }

    static showErrorDialog(msg: string): Promise<SweetAlertResult> {
        // @ts-ignore
        return Swal.fire({

            icon: 'error',
            text: msg,
            showConfirmButton: true,
            confirmButtonText: 'ok',
            showCancelButton: false,
            cancelButtonText: 'No'
        });
    }

    static showErrorDialogLink(title: string, msg: string, link: string, textLink: string): Promise<SweetAlertResult> {
        const clickLink = `<a href=" ${link} "  target="_blank" > ${textLink} </a>`;
        // @ts-ignore
        return Swal.fire({
            title: title.toString(),
            type: 'error',
            text: msg,
            showConfirmButton: false,
            showCancelButton: false,
            footer: clickLink
        });
    }
}

