import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alumno-inicio',
    loadChildren: () => import('./alumno-inicio/alumno-inicio.module').then( m => m.AlumnoInicioPageModule)
  },
  {
    path: 'olvidar-contrasena',
    loadChildren: () => import('./auth/olvidar-contrasena/olvidar-contrasena.module').then( m => m.OlvidarContrasenaPageModule)
  },
  {
    path: 'profesor-inicio',
    loadChildren: () => import('./profesor-inicio/profesor-inicio.module').then( m => m.ProfesorInicioPageModule)
  },
  {
    path: 'generar-qr/:nombre' ,
    loadChildren: () => import('./generar-qr/generar-qr.module').then( m => m.GenerarQRPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
