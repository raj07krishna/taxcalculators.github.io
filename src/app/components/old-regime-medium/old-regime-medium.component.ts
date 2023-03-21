import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-old-regime-medium',
  templateUrl: './old-regime-medium.component.html',
  styleUrls: ['./old-regime-medium.component.scss']
})
export class OldRegimeMediumComponent implements OnInit {

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Deductions', 'Taxable Income', 'Tax Liability'],
    datasets: [{
      data: [0, 0, 0]
    }]
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  standardDeduction = 50000;
  cessValue = 0.04;
  oldTaxSlab = {
    first: {
      minValue: 250000,
      maxValue: 500000,
      taxPercentage: 5
    },
    1000000: {
      minValue: 500000,
      maxValue: 1000000,
      taxPercentage: 20
    },
    last: {
      minValue: 1000000,
      maxValue: Number.MAX_VALUE,
      taxPercentage: 30
    }
  }
  NewTaxSlab = {
    first: {
      minValue: 250000,
      maxValue: 500000,
      taxPercentage: 5
    },
    750000: {
      minValue: 500000,
      maxValue: 750000,
      taxPercentage: 10
    },
    1000000: {
      minValue: 750000,
      maxValue: 1000000,
      taxPercentage: 15
    },
    1250000: {
      minValue: 1000000,
      maxValue: 1250000,
      taxPercentage: 20
    },
    1500000: {
      minValue: 1250000,
      maxValue: 1500000,
      taxPercentage: 25
    },
    last: {
      minValue: 1500000,
      maxValue: Number.MAX_VALUE,
      taxPercentage: 30
    }
  }
  surchargeValue = {
    first: {
      minValue: 5000000,
      maxValue: 10000000,
      taxPercentage: 10
    },
    10000000: {
      minValue: 10000000,
      maxValue: 20000000,
      taxPercentage: 15
    },
    20000000: {
      minValue: 20000000,
      maxValue: 50000000,
      taxPercentage: 25
    },
    50000000: {
      minValue: 50000000,
      maxValue: 100000000,
      taxPercentage: 37
    },
    last: {
      minValue: 100000000,
      maxValue: Number.MAX_VALUE,
      taxPercentage: 37
    }
  }

  taxForm = this.fb.nonNullable.group({
    salaryIncome: [0, Validators.required],
    standardDeduction: [0, Validators.required],
    exemptAllowances: [0, Validators.required],
    cityOfResidence: ['non-metro'],
    basicSalary: [0],
    rentPaid: [0],
    hraReceived: [0],
    exemptedHRA: [0],
    netTaxableSalary: [0],
    rentalIncome: [0],
    houseLoanInterest: [0, Validators.max(200000)],
    netHousePropertyIncome: [0],
    businessIncome: [0],
    businessExpenses: [0],
    netBusinessIncome: [0],
    longTermCapitalgain: [0],
    shortTermCapitalgain: [0],
    totalCapitalGain: [0],
    otherIncome: [0],
    grossTotalIncome: [0],
    investment: [0, Validators.max(150000)],
    voluntaryPension: [0, Validators.max(50000)],
    employerPension: [0],
    medicalExpenditure: [0, Validators.max(25000)],
    medicalTreatment: [0, Validators.max(40000)],
    disability: [0, Validators.max(120000)],
    educationLoanInterest: [0],
    savingBankInterest: [0, Validators.max(10000)],
    otherDeductions: [0],
    totalDeduction: [0],
    netTaxableIncome: [0],
    totalOldTax: [0],
    oldTaxCess: [0],
    NewTaxCess: [0],
    totalNewTax: [0]
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taxForm.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(100),
    ).subscribe(
      data => {
        console.log(data);
        this.calculateStandardDeduction();
        if (data['basicSalary'] && data['basicSalary'] > 0 &&
          data['rentPaid'] && data['rentPaid'] > 0 &&
          data['hraReceived'] && data['hraReceived'] > 0
        ) {
          this.calculateHRA(data)
        }
        this.calculateNetTaxableSalary(data);
        this.calculateNetHousePropertyInccome(data);
        this.calculateNetBusinessIncome(data);
        this.calculateTotalCapitalGain(data);
        this.calculateGrossTotalIncome(data);
        this.calculateTotalDeduction(data);
        this.calculateTaxableIncome()
        this.calculateOldTax();
        this.calculateNewTax();
        this.calculateSurchargeTax(this.returnFormcontrolValue('totalOldTax'), 'totalOldTax');
        this.calculateCess(this.returnFormcontrolValue('totalOldTax'), 'totalOldTax', 'oldTaxCess');
        this.calculateSurchargeTax(this.returnFormcontrolValue('totalNewTax'), 'totalNewTax');
        this.calculateCess(this.returnFormcontrolValue('totalNewTax'), 'totalNewTax', 'NewTaxCess');
        this.renderChart();
        console.log(this.taxForm.value)
      }
    )
  }

  calculateStandardDeduction() {
    if (this.returnFormcontrolValue('salaryIncome') > 50000) {
      this.taxForm.get('standardDeduction')?.patchValue(this.standardDeduction, { emitEvent: false })
    } else {
      this.taxForm.get('standardDeduction')?.patchValue(isNaN(this.returnFormcontrolValue('salaryIncome')) ? 0 : this.returnFormcontrolValue('salaryIncome'), { emitEvent: false })
    }
  }

  returnFormcontrolValue(formControlName: string) {
    if (this.taxForm.get(formControlName)) {
      return parseInt(this.taxForm.get(formControlName)?.value);
    }
    return 0
  }

  calculateHRA(formData: any) {
    let basicSalary = 0
    if (formData['cityOfResidence'] === 'metro') {
      basicSalary = formData['basicSalary'] * 0.5;
    } else {
      basicSalary = formData['basicSalary'] * 0.4;
    }
    let rentPaid = formData['rentPaid'] - (0.1 * formData['basicSalary']);
    let hraReceived = formData['hraReceived'];
    let exmptedHra = Math.min(basicSalary, rentPaid, hraReceived)
    this.taxForm.get('exemptedHRA')?.patchValue(exmptedHra > 0 ? exmptedHra : 0, { emitEvent: false })
  }


  calculateNetTaxableSalary(formData: any) {
    if (formData['salaryIncome'] > 0 || formData['exemptAllowances'] > 0 || formData['exemptedHRA'])
      this.taxForm.get('netTaxableSalary')?.patchValue(this.returnFormcontrolValue('salaryIncome') - this.returnFormcontrolValue('exemptAllowances') - this.returnFormcontrolValue('exemptedHRA') - this.returnFormcontrolValue('standardDeduction'), { emitEvent: false })
  }

  calculateNetHousePropertyInccome(formData: any) {
    if (formData['rentalIncome'] > 0 || formData['houseLoanInterest'] > 0)
      this.taxForm.get('netHousePropertyIncome')?.patchValue(this.returnFormcontrolValue('rentalIncome') - this.returnFormcontrolValue('houseLoanInterest'), { emitEvent: false })
  }

  calculateTotalCapitalGain(formData: any) {
    if (formData['longTermCapitalgain'] !== 0 || formData['shortTermCapitalgain'] !== 0)
      this.taxForm.get('totalCapitalGain')?.patchValue(this.returnFormcontrolValue('longTermCapitalgain') + this.returnFormcontrolValue('shortTermCapitalgain'), { emitEvent: false })
  }

  calculateGrossTotalIncome(formData: any) {
    this.taxForm.get('grossTotalIncome')?.patchValue(this.returnFormcontrolValue('netBusinessIncome') + this.returnFormcontrolValue('netTaxableSalary') + this.returnFormcontrolValue('netHousePropertyIncome') + this.returnFormcontrolValue('totalCapitalGain') + this.returnFormcontrolValue('otherIncome'), { emitEvent: false })
  }

  calculateNetBusinessIncome(formData: any) {
    if (formData['businessIncome'] !== 0 || formData['businessExpenses'] > 0) {
      let total = this.returnFormcontrolValue('businessIncome') - this.returnFormcontrolValue('businessExpenses')
      this.taxForm.get('netBusinessIncome')?.patchValue(total, { emitEvent: false })
    }
  }

  calculateTotalDeduction(formData: any) {
    if (formData['investment'] > 0 || formData['voluntaryPension'] > 0 || formData['employerPension'] > 0 || formData['medicalExpenditure'] > 0 || formData['medicalTreatment'] > 0 || formData['disability'] > 0 || formData['educationLoanInterest'] > 0 || formData['savingBankInterest'] > 0 || formData['otherDeductions'] > 0) {
      let total = this.returnFormcontrolValue('investment') + this.returnFormcontrolValue('voluntaryPension') + this.returnFormcontrolValue('employerPension') + this.returnFormcontrolValue('medicalExpenditure') + this.returnFormcontrolValue('medicalTreatment') + this.returnFormcontrolValue('disability') + this.returnFormcontrolValue('educationLoanInterest') + this.returnFormcontrolValue('savingBankInterest') + this.returnFormcontrolValue('otherDeductions')
      this.taxForm.get('totalDeduction')?.patchValue(total, { emitEvent: false })
    }
  }

  calculateTaxableIncome() {
    if (this.returnFormcontrolValue('grossTotalIncome') || this.returnFormcontrolValue('totalDeduction')) {
      let total = this.returnFormcontrolValue('grossTotalIncome') - this.returnFormcontrolValue('totalDeduction')
      this.taxForm.get('netTaxableIncome')?.patchValue(total, { emitEvent: false })
    }
  }

  calculateOldTax() {
    let totalTax = 0;
    if (this.returnFormcontrolValue('netTaxableIncome') > this.oldTaxSlab.first.maxValue) {
      for (const [key, value] of Object.entries(this.oldTaxSlab)) {
        if (key === 'last' && this.returnFormcontrolValue('netTaxableIncome') >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let finalSlabAmount = this.returnFormcontrolValue('netTaxableIncome') - value.minValue
          totalTax += finalSlabAmount * taxPercentage;
        } else if (this.returnFormcontrolValue('netTaxableIncome') >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let maxvalue = value.maxValue > this.returnFormcontrolValue('netTaxableIncome')
            ? this.returnFormcontrolValue('netTaxableIncome')
            : value.maxValue
          let finalSlabAmount = maxvalue - value.minValue
          totalTax += finalSlabAmount * taxPercentage;
        }
      }
    } else {
      let taxPercentage = 0 / 100;
      let finalSlabAmount = this.returnFormcontrolValue('netTaxableIncome');
      totalTax += finalSlabAmount * taxPercentage;
    }
    this.taxForm.get('totalOldTax')?.patchValue(totalTax, { emitEvent: false })
  }

  calculateNewTax() {
    let totalTax = 0;
    if (this.returnFormcontrolValue('netTaxableIncome') > this.NewTaxSlab.first.maxValue) {
      for (const [key, value] of Object.entries(this.NewTaxSlab)) {
        if (key === 'last' && this.returnFormcontrolValue('netTaxableIncome') >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let finalSlabAmount = this.returnFormcontrolValue('netTaxableIncome') - value.minValue
          totalTax += finalSlabAmount * taxPercentage;
        } else if (this.returnFormcontrolValue('netTaxableIncome') >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let maxvalue = value.maxValue > this.returnFormcontrolValue('netTaxableIncome')
            ? this.returnFormcontrolValue('netTaxableIncome')
            : value.maxValue
          let finalSlabAmount = maxvalue - value.minValue
          totalTax += finalSlabAmount * taxPercentage;
        }
      }
    } else {
      let taxPercentage = 0 / 100;
      let finalSlabAmount = this.returnFormcontrolValue('netTaxableIncome');
      totalTax += finalSlabAmount * taxPercentage;
    }
    this.taxForm.get('totalNewTax')?.patchValue(totalTax, { emitEvent: false })
  }

  calculateSurchargeTax(taxValue: number, taxType: string) {
    if (this.returnFormcontrolValue('netTaxableIncome') > this.surchargeValue.first.minValue) {
      for (const [key, value] of Object.entries(this.surchargeValue)) {
        if (
          this.returnFormcontrolValue('netTaxableIncome') >= value.minValue &&
          this.returnFormcontrolValue('netTaxableIncome') <= value.maxValue
        ) {
          let taxPercentage = value.taxPercentage / 100;
          taxValue += taxValue * taxPercentage;
          break;
        }
      }
    }
    this.taxForm.get(`${taxType}`)?.patchValue(taxValue, { emitEvent: false })
  }

  calculateCess(taxValue: number, taxType: string, cessType: string) {
    taxValue += taxValue * this.cessValue;
    this.taxForm.get(`${taxType}`)?.patchValue(taxValue, { emitEvent: false })
    this.taxForm.get(`${cessType}`)?.patchValue(taxValue, { emitEvent: false })
  }

  renderChart() {
    this.pieChartData.datasets[0].data = [
      this.returnFormcontrolValue('totalDeduction'),
      this.returnFormcontrolValue('netTaxableIncome'),
      this.returnFormcontrolValue('totalOldTax'),
    ]
    this.chart?.update();
  }

  showChart() {
    if (
      this.returnFormcontrolValue('netTaxableIncome')
    ) {
      return true
    }
    return false
  }

}
