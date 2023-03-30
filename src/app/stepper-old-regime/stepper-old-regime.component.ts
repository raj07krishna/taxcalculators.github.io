import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Observable, map, debounceTime, distinctUntilChanged } from 'rxjs';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { OldTaxDetailsTableComponent } from '../components/old-tax-details-table/old-tax-details-table.component';
import { NewTaxDetailsTableComponent } from '../components/new-tax-details-table/new-tax-details-table.component';

@Component({
  selector: 'app-stepper-old-regime',
  templateUrl: './stepper-old-regime.component.html',
  styleUrls: ['./stepper-old-regime.component.scss']
})
export class StepperOldRegimeComponent {
  stepperOrientation: Observable<StepperOrientation>;
  checked = false;
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Dedductions', 'Exemptions', 'Taxable Income'],
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

  constructor(breakpointObserver: BreakpointObserver, private fb: FormBuilder, public dialog: MatDialog) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

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
  newTaxSlab = {
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

  taxForm = new FormGroup({
    salaryIncome: new FormControl<number>(0, [Validators.required]),
    standardDeduction: new FormControl<number>(0, [Validators.required]),
    exemptAllowances: new FormControl<number>(0, [Validators.required]),
    cityOfResidence: new FormControl<string>('non-metro'),
    basicSalary: new FormControl<number>(0),
    rentPaid: new FormControl<number>(0),
    hraReceived: new FormControl<number>(0),
    exemptedHRA: new FormControl<number>(0),
    netTaxableSalary: new FormControl<number>(0),
    rentalIncome: new FormControl<number>(0),
    houseLoanInterest: new FormControl<number>(0, [Validators.max(200000)]),
    netHousePropertyIncome: new FormControl<number>(0),
    businessIncome: new FormControl<number>(0),
    businessExpenses: new FormControl<number>(0),
    netBusinessIncome: new FormControl<number>(0),
    longTermCapitalgain: new FormControl<number>(0),
    shortTermCapitalgain: new FormControl<number>(0),
    totalCapitalGain: new FormControl<number>(0),
    otherIncome: new FormControl<number>(0),
    grossTotalIncome: new FormControl<number>(0),
    investment: new FormControl<number>(0, [Validators.max(150000)]),
    voluntaryPension: new FormControl<number>(0, [Validators.max(50000)]),
    employerPension: new FormControl<number>(0),
    medicalInsurance: new FormControl<number>(0, [Validators.max(25000)]),
    medicalTreatment: new FormControl<number>(0, [Validators.max(40000)]),
    disability: new FormControl<number>(0, [Validators.max(120000)]),
    educationLoanInterest: new FormControl<number>(0),
    savingBankInterest: new FormControl<number>(0, [Validators.max(10000)]),
    otherDeductions: new FormControl<number>(0),
    totalDeduction: new FormControl<number>(0),
    totalDeductionRoundedOff: new FormControl<number>(0),
    netTaxableIncome: new FormControl<number>(0),
    totalOldTax: new FormControl<number>(0),
    oldTaxCess: new FormControl<number>(0),
    newTaxCess: new FormControl<number>(0),
    totalNewTax: new FormControl<number>(0),
    newTaxSlabData: new FormControl<any>(null),
    oldTaxSlabData: new FormControl<any>(null),
    oldTaxSurcharge: new FormControl<number>(0),
    newTaxSurcharge: new FormControl<number>(0),
    npsEmployerContribution: new FormControl<number>(0),
    npsSelfContribution: new FormControl<number>(0),
    incomeFromInterest: new FormControl<number>(0),
    isOtherIncome: new FormControl<boolean>(false)
  });

  ngOnInit(): void {

  }

  calculate(data: any) {
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
    this.calculateCess(this.returnFormcontrolValue('totalNewTax'), 'totalNewTax', 'newTaxCess');
    this.renderChart();
    console.log(this.taxForm.value)
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
      return this.taxForm.get(formControlName)?.value;
    }
    return null
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
    this.taxForm.get('grossTotalIncome')?.patchValue(this.returnFormcontrolValue('netBusinessIncome') + this.returnFormcontrolValue('netTaxableSalary') + this.returnFormcontrolValue('netHousePropertyIncome') + this.returnFormcontrolValue('totalCapitalGain') + this.returnFormcontrolValue('otherIncome') + this.returnFormcontrolValue('incomeFromInterest'), { emitEvent: false })
  }

  calculateNetBusinessIncome(formData: any) {
    if (formData['businessIncome'] !== 0 || formData['businessExpenses'] > 0) {
      let total = this.returnFormcontrolValue('businessIncome') - this.returnFormcontrolValue('businessExpenses')
      this.taxForm.get('netBusinessIncome')?.patchValue(total, { emitEvent: false })
    }
  }

  calculateTotalDeduction(formData: any) {
    if (formData['investment'] > 0 || formData['voluntaryPension'] > 0 || formData['employerPension'] > 0 || formData['medicalInsurance'] > 0 || formData['medicalTreatment'] > 0 || formData['disability'] > 0 || formData['educationLoanInterest'] > 0 || formData['savingBankInterest'] > 0 || formData['otherDeductions'] > 0) {
      let total = this.returnFormcontrolValue('investment') + this.returnFormcontrolValue('voluntaryPension') +
        this.returnFormcontrolValue('employerPension') + this.returnFormcontrolValue('medicalInsurance') +
        this.returnFormcontrolValue('medicalTreatment') + this.returnFormcontrolValue('disability') +
        this.returnFormcontrolValue('educationLoanInterest') + this.returnFormcontrolValue('savingBankInterest') +
        this.returnFormcontrolValue('otherDeductions') + this.returnFormcontrolValue('npsEmployerContribution') +
        this.returnFormcontrolValue('npsSelfContribution')
      this.taxForm.get('totalDeduction')?.patchValue(total, { emitEvent: false })
    }
  }

  calculateTaxableIncome() {
    if (this.returnFormcontrolValue('grossTotalIncome') || this.returnFormcontrolValue('totalDeduction')) {
      let total = this.returnFormcontrolValue('grossTotalIncome') - this.returnFormcontrolValue('totalDeduction')
      this.taxForm.get('netTaxableIncome')?.patchValue(total, { emitEvent: false })
    }
  }
  calculateMaxNpsAllowed(percentage: number) {
    let tax = Math.ceil(this.returnFormcontrolValue('basicSalary') * (percentage / 100));
    return Number(tax).toLocaleString('en-IN')
  }

  calculateOldTax() {
    let totalTax = 0;
    let oldTaxSlabData: any;
    if (this.returnFormcontrolValue('netTaxableIncome') > this.oldTaxSlab.first.maxValue) {
      for (const [key, value] of Object.entries(this.oldTaxSlab)) {
        let computedTax = 0
        if (key === 'last' && this.returnFormcontrolValue('netTaxableIncome') >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let finalSlabAmount = this.returnFormcontrolValue('netTaxableIncome') - value.minValue
          computedTax = finalSlabAmount * taxPercentage;
          totalTax += computedTax;
          let slabKey = `${finalSlabAmount}(${value.minValue}-${this.returnFormcontrolValue('netTaxableIncome')})`
          oldTaxSlabData = {
            ...oldTaxSlabData,
            [`${slabKey}`]: { ...value, computedTax }
          }
        } else if (this.returnFormcontrolValue('netTaxableIncome') >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let maxvalue = value.maxValue > this.returnFormcontrolValue('netTaxableIncome')
            ? this.returnFormcontrolValue('netTaxableIncome')
            : value.maxValue
          let finalSlabAmount = maxvalue - value.minValue
          computedTax = finalSlabAmount * taxPercentage;
          totalTax += computedTax;
          let slabKey = `${value.maxValue}(${value.minValue}-${value.maxValue})`
          oldTaxSlabData = {
            ...oldTaxSlabData,
            [`${slabKey}`]: { ...value, computedTax }
          }
        }

      }
    } else {
      let taxPercentage = 0 / 100;
      let finalSlabAmount = this.returnFormcontrolValue('netTaxableIncome');
      totalTax += finalSlabAmount * taxPercentage;
      for (const [key, value] of Object.entries(this.newTaxSlab)) {
        let computedTax = 0;
        let slabKey = `${value.maxValue}(${value.minValue}-${value.maxValue})`
        oldTaxSlabData = {
          ...oldTaxSlabData,
          [`${slabKey}`]: { ...value, computedTax }
        }
      }
    }
    this.taxForm.get('totalOldTax')?.patchValue(totalTax, { emitEvent: false })
    this.taxForm.get('oldTaxSlabData')?.setValue(oldTaxSlabData, { emitEvent: false })
  }

  calculateNewTax() {
    let totalTax = 0;
    let newTaxSlabData: any;
    let income = this.returnFormcontrolValue('salaryIncome') + this.returnFormcontrolValue('netBusinessIncome') -
      this.returnFormcontrolValue('npsEmployerContribution') - this.returnFormcontrolValue('standardDeduction');
    if (income > this.newTaxSlab.first.maxValue) {
      for (const [key, value] of Object.entries(this.newTaxSlab)) {
        let computedTax = 0
        if (key === 'last' && income >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let finalSlabAmount = income - value.minValue;
          computedTax = finalSlabAmount * taxPercentage;
          totalTax += computedTax;
          let slabKey = `${finalSlabAmount}(${value.minValue}-${income})`
          newTaxSlabData = {
            ...newTaxSlabData,
            [`${slabKey}`]: { ...value, computedTax }
          }
        } else if (income >= value.minValue) {
          let taxPercentage = value.taxPercentage / 100;
          let maxvalue = value.maxValue > income
            ? income
            : value.maxValue
          let finalSlabAmount = maxvalue - value.minValue
          computedTax = finalSlabAmount * taxPercentage;
          totalTax += computedTax;
          let slabKey = `${value.maxValue}(${value.minValue}-${value.maxValue})`
          newTaxSlabData = {
            ...newTaxSlabData,
            [`${slabKey}`]: { ...value, computedTax }
          }
        }

      }
    } else {
      let taxPercentage = 0 / 100;
      let finalSlabAmount = income;
      totalTax += finalSlabAmount * taxPercentage;
      for (const [key, value] of Object.entries(this.newTaxSlab)) {
        let computedTax = 0;
        let slabKey = `${value.maxValue}(${value.minValue}-${value.maxValue})`
        newTaxSlabData = {
          ...newTaxSlabData,
          [`${slabKey}`]: { ...value, computedTax }
        }
      }
    }
    this.taxForm.get('totalNewTax')?.patchValue(totalTax, { emitEvent: false });
    this.taxForm.get('newTaxSlabData')?.setValue(newTaxSlabData, { emitEvent: false })
  }

  calculateSurchargeTax(taxValue: number, taxType: string) {
    let totalSurcharge = 0
    if (this.returnFormcontrolValue('salaryIncome') > this.surchargeValue.first.minValue) {
      for (const [key, value] of Object.entries(this.surchargeValue)) {
        if (
          this.returnFormcontrolValue('netTaxableIncome') >= value.minValue &&
          this.returnFormcontrolValue('netTaxableIncome') <= value.maxValue
        ) {
          let taxPercentage = value.taxPercentage / 100;
          totalSurcharge += taxValue * taxPercentage;
          taxValue += totalSurcharge
          break;
        }
      }
    }
    this.taxForm.get(`${taxType}`)?.patchValue(taxValue, { emitEvent: false })
    if (taxType === 'totalOldTax') {
      this.taxForm.get('oldTaxSurcharge')?.patchValue(totalSurcharge, { emitEvent: false })
    } else {
      this.taxForm.get('newTaxSurcharge')?.patchValue(totalSurcharge, { emitEvent: false })
    }
  }

  calculateCess(taxValue: number, taxType: string, cessType: string) {
    let cess = taxValue * this.cessValue
    taxValue += cess;
    this.taxForm.get(`${taxType}`)?.patchValue(taxValue, { emitEvent: false })
    this.taxForm.get(`${cessType}`)?.patchValue(cess, { emitEvent: false })
  }

  renderChart() {
    this.pieChartData.datasets[0].data = [
      this.returnFormcontrolValue('totalDeduction') + this.returnFormcontrolValue('standardDeduction'),
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

  bestTaxRegime() {
    if (this.returnFormcontrolValue('totalOldTax') > this.returnFormcontrolValue('totalNewTax')) {
      return 'New Tax Regime'
    } else {
      return 'Old Tax Regime'
    }
  }

  checkStep(event: StepperSelectionEvent) {
    if (event.selectedIndex === 3) {
      this.calculate(this.taxForm.value)
    }
  }

  openDialogOldTax(taxType: string): void {
    const dialogRef = this.dialog.open(OldTaxDetailsTableComponent, {
      data: { formValue: this.taxForm.value, taxRegime: taxType },
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openDialogNewTax(taxType: string): void {
    const dialogRef = this.dialog.open(NewTaxDetailsTableComponent, {
      data: { formValue: this.taxForm.value, taxRegime: taxType },
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
