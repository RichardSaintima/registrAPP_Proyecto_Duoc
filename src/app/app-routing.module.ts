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
    path: 'profesor-inicio',
    loadChildren: () => import('./profesores/profesor-inicio/profesor-inicio.module').then( m => m.ProfesorInicioPageModule)
  },
  {
    path: 'profesor-asistencia',
    loadChildren: () => import('./profesores/profesor-asistencia/profesor-asistencia.module').then( m => m.ProfesorAsistenciaPageModule)
  },
  {
    path: 'profesor-notas',
    loadChildren: () => import('./profesores/profesor-notas/profesor-notas.module').then( m => m.ProfesorNotasPageModule)
  },
  {
    path: 'profesor-cursos',
    loadChildren: () => import('./profesores/profesor-cursos/profesor-cursos.module').then( m => m.ProfesorCursosPageModule)
  },
  {
    path: 'olvidar-contrasena',
    loadChildren: () => import('./auth/olvidar-contrasena/olvidar-contrasena.module').then( m => m.OlvidarContrasenaPageModule)
  },
  {
    path: 'profesor-alumnos',
    loadChildren: () => import('./profesores/profesor-alumnos/profesor-alumnos.module').then( m => m.ProfesorAlumnosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
