import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  caServices = [
    {
      "title": "Salaried / Self Employed - Basic",
      "description": "Individual Resident having Total Income up to ₹5 lakhs.",
      "servciesList": ["Salary / Pension up to ₹5 lakhs","One House Property","Other sources (Interest, Family Pension, Dividend etc.)","Agricultural Income up to Rs.5,000"],
      "originalPrice": 499,
      "discountedPrice": 99
    },
    {
      "title": "Salaried / Self Employed - Advanced",
      "description": "Individual Resident having Total Income up to ₹50 lakhs.",
      "servciesList": ["Salary / Pension up to ₹50 lakhs","One House Property","Other sources (Interest, Family Pension, Dividend etc.)","Agricultural Income up to Rs.5,000"],
      "originalPrice": 1499,
      "discountedPrice": 499
    },
    {
      "title": "Salaried/ Self Employed with Capital Gains",
      "description": "Individual and Hindu Undivided Family",
      "servciesList": [" Salary / Pension (more than ₹50 lakhs)"," House Property","Other sources","Capital Gain "],
      "originalPrice": 2999,
      "discountedPrice": 1199
    },
    // {
    //   "title": "Salaried Individual with Business Income",
    //   "description": "Individual and Hindu Undivided Family",
    //   "servciesList": ["Salary / Pension","One House Property","Other sources (Interest, Family Pension, Dividend etc.)","Agricultural Income up to Rs. 5,000","Business or Profession (except presumptive basis)"],
    //   "originalPrice": 2999,
    //   "discountedPrice": 1199
    // },
    // {
    //   "title": "ITR-4",
    //   "description": "Individual & Hindu Undivided Family – Resident or Firm (Other than LLP) – Resident Having income from Business or Profession which is computed on a presumptive basis (U/s 44AD / 44ADA / 44AE) and Total Income up to 50 lakhs.",
    //   "servciesList": ["Salary / Pension","One House Property","Other sources (Interest, Family Pension, Dividend etc.)","Agricultural Income up to Rs. 5,000","Business or Profession on a presumptive basis (U/s 44AD / 44ADA / 44AE)"],
    //   "originalPrice": 2999,
    //   "discountedPrice": 1199
    // }
  ]
}
