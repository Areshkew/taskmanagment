import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

// Unique Name Validator
export function uniqueNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const personsArray = control as FormArray;
        const names = new Set<string>();

        for (let i = 0; i < personsArray.length; i++) {
            const personGroup = personsArray.at(i);

            const name = personGroup.get('name')?.value;

            if (name && names.has(name)) {
                return { duplicateName: true };
            }
            names.add(name);
        }

        return null;
    };
}
