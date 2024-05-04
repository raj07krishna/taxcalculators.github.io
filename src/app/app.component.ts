import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  openDrawer = false;

  constructor(breakpointObserver: BreakpointObserver, private meta: Meta, private titleService: Title) {
    breakpointObserver
      .observe('(min-width: 800px)')
      .subscribe(result => {
        console.log(result)
        if (result.matches) { this.openDrawer = true } else this.openDrawer = false
      });
  }

  ngOnInit(): void {
    this.meta.addTags([
      { name: 'keywords', content: 'income tax calculator, advance tax caluclator, income tax, tax filing, tax returns, tax deductions, tax exemptions, tax planning, tax credits, tax savings, tax rules, tax laws, tax reforms, tax forms, tax calculators, tax consultants, tax software, efiling tax, income efiling, income tax efiling, efile taxes india, efiling india, india tax efiling, income tax filing minyourtax, minyourtax itr filing, minyourtax itr efiling, itr filing fy 2022-23, income tax filing fy 2022-23, minyourtax' },
      { name: 'description', content: "File your Income Tax Returns (ITR) for the financial year 2022-23 (assessment year 2023-24) quickly, safely, and easily with incometaxcalculators. We handle all types of income, including salary, interest, capital gains, house property, business, and profession. With incometaxcalculators, you can maximize your deductions under Section 80 and beyond, ensuring that you don't miss out on any eligible tax benefits. Our platform is trusted by hundreds of certified accountants and corporations for filing taxes and TDS. Get started with incometaxcalculators today and take control of your tax filing process." },
      { name: 'author', content: 'IncomeTaxCalculators.in' },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.titleService.setTitle('Income Tax Services');
  }
}
