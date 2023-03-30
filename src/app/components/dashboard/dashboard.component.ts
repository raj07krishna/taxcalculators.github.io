import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private meta: Meta, private titleService: Title) { }

  ngOnInit(): void {
    this.meta.addTags([
      { name: 'keywords', content: 'income tax calculator, advance tax caluclator, income tax, tax filing, tax returns, tax deductions, tax exemptions, tax planning, tax credits, tax savings, tax rules, tax laws, tax reforms, tax forms, tax calculators, tax consultants, tax software, efiling tax, income efiling, income tax efiling, efile taxes india, efiling india, india tax efiling, income tax filing minyourtax, minyourtax itr filing, minyourtax itr efiling, itr filing fy 2022-23, income tax filing fy 2022-23, minyourtax' },
      { name: 'description', content: 'File Income Tax Returns ( ITR ) for FY 2022-23 (AY 2023-24) online with IncomeTaxCalculators. Maximize your tax savings and simplify your tax filing process with our comprehensive income tax tool. IncomeTaxCalculators is fast, safe and easy for ITR E-Filing. IncomeTaxCalculators handles all cases of Income from Salary, Interest Income, Capital Gains, House Property, Business and Profession. Maximize your deductions by handling all deductions under Section 80 & the rest.' },
      { name: 'author', content: 'IncomeTaxCalculators.in' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.titleService.setTitle('Income Tax Calculator');
  }

}
