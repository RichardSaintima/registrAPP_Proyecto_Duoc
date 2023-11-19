import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['home']);
const redirectLoggedInToProfe = () => redirectLoggedInTo(['profesor-inicio']);
const redirectLoggedInToAlumno = () => redirectLoggedInTo(['alumno-inicio']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    // ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alumno-inicio/:id',
    loadChildren: () => import('./alumno-inicio/alumno-inicio.module').then( m => m.AlumnoInicioPageModule),
    // ...canActivate(redirectLoggedInToAlumno)
  },
  {
    path: 'olvidar-contrasena',
    loadChildren: () => import('./auth/olvidar-contrasena/olvidar-contrasena.module').then( m => m.OlvidarContrasenaPageModule)
  },
  {
    path: 'profesor-inicio/:id',
    loadChildren: () => import('./profesor-inicio/profesor-inicio.module').then( m => m.ProfesorInicioPageModule),
    // ...canActivate(redirectLoggedInToProfe)
  },
  {
    path: 'generar-qr/:id' ,
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
