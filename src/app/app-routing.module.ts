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
  },  {
    path: 'inicio',
    loadChildren: () => import('./Profesor/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'asignatura',
    loadChildren: () => import('./Profesor/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
