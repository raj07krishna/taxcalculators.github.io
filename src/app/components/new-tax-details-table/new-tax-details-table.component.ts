import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-tax-details-table',
  templateUrl: './new-tax-details-table.component.html',
  styleUrls: ['./new-tax-details-table.component.scss']
})
export class NewTaxDetailsTableComponent {
  formData: any;
  taxType: string;
  constructor(
    public dialogRef: MatDialogRef<NewTaxDetailsTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.formData = data.formValue;
    this.taxType = data.taxRegime
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  calculateMaxNpsAllowed(propertyName: string) {
    let value = this.formData[`${propertyName}`]
    return Number(value).toLocaleString('en-IN')
  }

  extractComputedTax(obj: any, key: string) {
    return obj ? obj[`${key}`]: 0;
  }

  calculateTaxFromSlab() {
    let total = 0;
    for (const key of Object.keys(this.formData.newTaxSlabData)) {
      total += this.formData.newTaxSlabData[key].computedTax
    }
    return Number(total).toLocaleString('en-IN')
  }
}

