import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-old-tax-details-table',
  templateUrl: './old-tax-details-table.component.html',
  styleUrls: ['./old-tax-details-table.component.scss']
})
export class OldTaxDetailsTableComponent {
  formData: any;
  taxType: string;
  constructor(
    public dialogRef: MatDialogRef<OldTaxDetailsTableComponent>,
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
    for (const key of Object.keys(this.formData.oldTaxSlabData)) {
      total += this.formData.oldTaxSlabData[key].computedTax
    }
    return Number(total).toLocaleString('en-IN')
  }
}
