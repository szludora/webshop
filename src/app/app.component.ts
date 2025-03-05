import { Component, inject, TemplateRef } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NgbOffcanvas, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'webshop';
  private offcanvasService = inject(NgbOffcanvas);

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'top' });
  }
}
