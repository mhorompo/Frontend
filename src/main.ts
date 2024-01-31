import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

document.addEventListener('DOMContentLoaded', () => {
  const preloader = $('.preloader');

  $(window).on('load', () => {
    preloader.fadeOut('slow', () => {
      preloader.remove();
    });
  });
});