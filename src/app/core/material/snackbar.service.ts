import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    private duration = 5000;
    private text = "Close";

    constructor(private snackBar: MatSnackBar) { }
    success(message: string) {
        this.snackBar.open(message, this.text, {
            duration: this.duration,
            panelClass: ['mat-toolbar', 'mat-primary']
        });
    }

    error(message: string) {
        this.snackBar.open(message, this.text, {
            duration: this.duration,
            panelClass: ['mat-toolbar', 'mat-warn']
        });
    }

    info(message: string) {
        this.snackBar.open(message, this.text, {
            duration: this.duration
        });
    }
}
