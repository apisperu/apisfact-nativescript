import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { RouterExtensions } from 'nativescript-angular/router';
import { IProduct } from '~/app/product/models/product.model';
import { ProductService } from '~/app/core/services/product.service';
import {
  IProductExtended,
  ProductExtended,
} from '~/app/product/models/product-extended.model';
import { CompanyService } from '~/app/core/services/company.service';

@Component({
  moduleId: module.id,
  templateUrl: './product-selector-modal.component.html',
  styleUrls: ['./product-selector-modal.component.css'],
})
export class ProductSelectorModalComponent {
  productList: IProductExtended[];
  constructor(
    private params: ModalDialogParams,
    private router: RouterExtensions,
    private productService: ProductService,
    private companyService: CompanyService
  ) {
    this.companyService.getActiveCompany().subscribe((data) => {
      this.getProducts(data.ruc);
    });
  }

  onAddButtonTapped(): void {
    const finalProductList = this.productList.filter((item) => {
      return item.cantidad > 0;
    });
    this.params.closeCallback(this.parseResponse(finalProductList));
  }

  getProducts(companyRuc: string) {
    this.productService.getList(companyRuc).subscribe((data: IProduct[]) => {
      this.productList = data.map((item) => {
        return new ProductExtended({ ...item, cantidad: 0, active: false });
      });
    });
  }

  parseResponse(productList: IProductExtended[]) {
    return productList.map((item) => {
      return {
        active: item.active,
        codProducto: item.codProducto,
        descripcion: item.descripcion,
        unidad: item.unidad,
        cantidad: parseInt(`${item.cantidad}`, 10),
        mtoValorUnitario: parseFloat(`${item.mtoValorUnitario}`),
      } as IProductExtended;
    });
  }

  onBack(): void {
    this.router.back();
  }
  onClose(): void {
    this.params.closeCallback('return value');
  }
}
