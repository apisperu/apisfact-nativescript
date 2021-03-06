import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ListPresenter } from './list.presenter';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-product-list',
  moduleId: module.id,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ListPresenter],
})
export class ListComponent implements OnInit {
  productList = [];

  constructor(
    private _page: Page,
    private _presenter: ListPresenter,
    private _router: RouterExtensions
  ) {
    this._presenter.setView(this);
  }

  ngOnInit(): void {
    this._page.actionBarHidden = true;
    this._presenter.getProductList();
  }

  setProductList(productList) {
    this.productList = productList;
  }

  onBackTapped() {
    this._router.back();
  }

  onAddButtonTapped() {
    this._router.navigate(['product/new']);
  }
}
