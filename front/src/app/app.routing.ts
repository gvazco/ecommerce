import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreateCategoriaComponent } from './components/admin/categoria/create-categoria/create-categoria.component';
import { IndexCategoriaComponent } from './components/admin/categoria/index-categoria/index-categoria.component';
import { EditCategoriaComponent } from './components/admin/categoria/edit-categoria/edit-categoria.component';
import { CreateProductoComponent } from './components/admin/producto/create-producto/create-producto.component';
import { CreateMarcaComponent } from './components/admin/marca/create-marca/create-marca.component';
import { IndexMarcaComponent } from './components/admin/marca/index-marca/index-marca.component';
import { EditMarcaComponent } from './components/admin/marca/edit-marca/edit-marca.component';
import { IndexProductoComponent } from './components/admin/producto/index-producto/index-producto.component';
import { EditProductoComponent } from './components/admin/producto/edit-producto/edit-producto.component';
import { GaleriaProductoComponent } from './components/admin/producto/galeria-producto/galeria-producto.component';
import { SelectorProductoComponent } from './components/admin/producto/selector-producto/selector-producto.component';
import { ColorProductoComponent } from './components/admin/producto/color-producto/color-producto.component';
import { PapeleraProductoComponent } from './components/admin/producto/papelera-producto/papelera-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ShowProductoComponent } from './components/show-producto/show-producto.component';
import { CarritoService } from './services/carrito.service';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PerfilComponent } from './components/cuenta/perfil/perfil.component';
import { DireccionesComponent } from './components/cuenta/direcciones/direcciones.component';
import { CuponComponent } from './components/admin/cupon/cupon.component';
import { PostalComponent } from './components/admin/postal/postal.component';
import { IndexOrdenesComponent } from './components/cuenta/ordenes/index-ordenes/index-ordenes.component';
import { TrackOrdenComponent } from './components/cuenta/ordenes/track-orden/track-orden.component';
import { DetalleOrdenComponent } from './components/cuenta/ordenes/detalle-orden/detalle-orden.component';
import { IndexTicketComponent } from './components/cuenta/ordenes/index-ticket/index-ticket.component';
import { ChatTicketComponent } from './components/cuenta/ordenes/chat-ticket/chat-ticket.component';
import { AdminTicketComponent } from './components/admin/ticket/admin-ticket/admin-ticket.component';
import { AdminChatComponent } from './components/admin/ticket/admin-chat/admin-chat.component';
import { IndexCancelacionComponent } from './components/admin/cancelacion/index-cancelacion/index-cancelacion.component';
import { DetalleCancelacionComponent } from './components/admin/cancelacion/detalle-cancelacion/detalle-cancelacion.component';
import { AdminVentasComponent } from './components/admin/ventas/admin-ventas/admin-ventas.component';
import { InvoiceComponent } from './components/admin/ventas/invoice/invoice.component';
import { AdminDetalleventasComponent } from './components/admin/ventas/admin-detalleventas/admin-detalleventas.component';
import { GeneralComponent } from './components/admin/config/general/general.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PromocionComponent } from './components/admin/promocion/promocion.component';
import { ErrorComponent } from './components/error/error.component';
import { ContactoAdminComponent } from './components/admin/contacto-admin/contacto-admin.component';
import { SliderComponent } from './components/admin/config/slider/slider.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { IndexIngresoComponent } from './components/admin/ingreso/index-ingreso/index-ingreso.component';
import { CreateIngresoComponent } from './components/admin/ingreso/create-ingreso/create-ingreso.component';
import { DetalleIngresoComponent } from './components/admin/ingreso/detalle-ingreso/detalle-ingreso.component';
import { RecoveryComponent } from './components/recovery/recovery.component';



const appRoute : Routes = [
    {path: '', redirectTo: 'home', pathMatch : 'full'},
    {path: 'home', component: InicioComponent},
    {path: 'login', component: AuthComponent},
    {path: 'restablecer-contraseña', component: RecoveryComponent},

    {path: 'contacto', component: ContactoComponent},
    {path: 'dashboard', component: DashboardComponent},

    {path: 'productos', component: ProductosComponent},
    {path: 'producto/:slug', component: ShowProductoComponent},
    {path: 'productos/search/:filter', component: ProductosComponent},
    {path: 'productos/:categoria', component: ProductosComponent},
    {path: 'productos/:categoria/subcategoria/:subcategoria', component: ProductosComponent},

    {path: 'cuenta/shop-cart', component: CarritoComponent},
    {path: 'cuenta/perfil', component: PerfilComponent},
    {path: 'cuenta/direcciones', component: DireccionesComponent},
    {path: 'cuenta/ordenes', component: IndexOrdenesComponent},
    {path: 'cuenta/ordenes/tracking/:id', component: TrackOrdenComponent},
    {path: 'cuenta/ordenes/detalles/:id', component: DetalleOrdenComponent},
    {path: 'cuenta/ordenes/tickets/:id', component: IndexTicketComponent},
    {path: 'cuenta/ordenes/chat/:id', component: ChatTicketComponent},

    {path: 'admin', children : [
      {path: 'categorias', component: IndexCategoriaComponent},
      {path: 'categorias/registro', component: CreateCategoriaComponent},
      {path: 'categorias/:id', component: EditCategoriaComponent},

      {path: 'productos', component: IndexProductoComponent},
      {path: 'productos/papelera', component: PapeleraProductoComponent},
      {path: 'productos/registro', component: CreateProductoComponent},
      {path: 'productos/:id', component: EditProductoComponent},
      {path: 'productos/:id/galeria', component: GaleriaProductoComponent},
      {path: 'productos/:id/selector', component: SelectorProductoComponent},
      {path: 'productos/:id/color', component: ColorProductoComponent},

      {path: 'marcas', component: IndexMarcaComponent},
      {path: 'marcas/registro', component: CreateMarcaComponent},
      {path: 'marcas/:id', component: EditMarcaComponent},

      {path: 'cupones', component: CuponComponent},
      {path: 'medios-postales', component: PostalComponent},

      {path: 'tikets/modulo', component: AdminTicketComponent},
      {path: 'tikets/modulo/chat/:id', component: AdminChatComponent},

      {path: 'cancelacion/modulo', component: IndexCancelacionComponent},
      {path: 'cancelacion/modulo/detalle/:id', component: DetalleCancelacionComponent},

      {path: 'ventas/modulo', component: AdminVentasComponent},
      {path: 'ventas/modulo/invoice/:id', component: InvoiceComponent},
      {path: 'ventas/modulo/detalle/:id', component: AdminDetalleventasComponent},

      {path: 'configuracion/general', component: GeneralComponent},
      {path: 'configuracion/promocion', component: PromocionComponent},
      {path: 'mensajes', component: ContactoAdminComponent},
      {path: 'slider', component: SliderComponent},

      {path: 'ingresos', component: IndexIngresoComponent},
      {path: 'ingresos/registro', component: CreateIngresoComponent},
      {path: 'ingresos/detalle/:id', component: DetalleIngresoComponent},
    ]},
    {path: '**', component: ErrorComponent},
    
  /*   { path: '**', redirectTo: '/'} */
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute); 


