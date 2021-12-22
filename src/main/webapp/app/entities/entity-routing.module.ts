import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'book',
        data: { pageTitle: 'Books' },
        loadChildren: () => import('./book/book.module').then(m => m.BookModule),
      },
      {
        path: 'author',
        data: { pageTitle: 'Authors' },
        loadChildren: () => import('./author/author.module').then(m => m.AuthorModule),
      },
      {
        path: 'measure',
        data: { pageTitle: 'Measures' },
        loadChildren: () => import('./measure/measure.module').then(m => m.MeasureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
