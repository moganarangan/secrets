import { FormGroup } from '@angular/forms';

export class ConfirmPinValidator {
    static MatchPin(userForm: FormGroup) {
        const pin = userForm.controls.pin.value;
        const confirmPin = userForm.controls.confirmPin.value;

        if (confirmPin.length <= 0) {
            return null;
        }

        if (confirmPin !== pin) {
            return {
                pinNotMatch: true
            };
        }

        return null;
    }
}
