import { Routes } from '@angular/router';
import { LibroListComponent } from './pages/libro-list/libro-list.component';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { PrestamoListComponent } from './pages/prestamos-list/prestamo-list.component';

export const routes: Routes = [  
    {path : 'libros', component: LibroListComponent},
    {path : 'clientes', component: ClienteListComponent},
    {path : 'prestamos', component: PrestamoListComponent},
    {path : '', redirectTo: '/libros', pathMatch : 'full'},
];
