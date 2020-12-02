import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from "@angular/common/http";

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing,appRoutingProviders } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavComponent } from './components/nav/nav.component';
import { FootComponent } from './components/foot/foot.component';
import { AsideComponent } from './components/aside/aside.component';
import { CreateCategoriaComponent } from './components/admin/categoria/create-categoria/create-categoria.component';
import { IndexCategoriaComponent } from './components/admin/categoria/index-categoria/index-categoria.component';
import { EditCategoriaComponent } from './components/admin/categoria/edit-categoria/edit-categoria.component';
import { CreateProductoComponent } from './components/admin/producto/create-producto/create-producto.component';
/* import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; */
import { NgxTinymceModule } from 'ngx-tinymce';
import { MenuComponent } from './components/menu/menu.component';
import { CreateMarcaComponent } from './components/admin/marca/create-marca/create-marca.component';
import { IndexMarcaComponent } from './components/admin/marca/index-marca/index-marca.component';
import { EditMarcaComponent } from './components/admin/marca/edit-marca/edit-marca.component';
import { IndexProductoComponent } from './components/admin/producto/index-producto/index-producto.component';
import { EditProductoComponent } from './components/admin/producto/edit-producto/edit-producto.component';
import { GaleriaProductoComponent } from './components/admin/producto/galeria-producto/galeria-producto.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SelectorProductoComponent } from './components/admin/producto/selector-producto/selector-producto.component';
import { ColorProductoComponent } from './components/admin/producto/color-producto/color-producto.component';
import { PapeleraProductoComponent } from './components/admin/producto/papelera-producto/papelera-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ShowProductoComponent } from './components/show-producto/show-producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PerfilComponent } from './components/cuenta/perfil/perfil.component';
import { AsideCuentaComponent } from './components/cuenta/aside-cuenta/aside-cuenta.component';
import { DireccionesComponent } from './components/cuenta/direcciones/direcciones.component';
import { CuponComponent } from './components/admin/cupon/cupon.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

import { PostalComponent } from './components/admin/postal/postal.component';
import { IndexOrdenesComponent } from './components/cuenta/ordenes/index-ordenes/index-ordenes.component';
import { TrackOrdenComponent } from './components/cuenta/ordenes/track-orden/track-orden.component';
import { NgxLoadingModule } from 'ngx-loading';
import { DetalleOrdenComponent } from './components/cuenta/ordenes/detalle-orden/detalle-orden.component';
import { IndexTicketComponent } from './components/cuenta/ordenes/index-ticket/index-ticket.component';
import { ChatTicketComponent } from './components/cuenta/ordenes/chat-ticket/chat-ticket.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { AdminTicketComponent } from './components/admin/ticket/admin-ticket/admin-ticket.component';
import { AdminChatComponent } from './components/admin/ticket/admin-chat/admin-chat.component';
import { IndexCancelacionComponent } from './components/admin/cancelacion/index-cancelacion/index-cancelacion.component';
import { DetalleCancelacionComponent } from './components/admin/cancelacion/detalle-cancelacion/detalle-cancelacion.component';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminVentasComponent } from './components/admin/ventas/admin-ventas/admin-ventas.component';
import { InvoiceComponent } from './components/admin/ventas/invoice/invoice.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AdminDetalleventasComponent } from './components/admin/ventas/admin-detalleventas/admin-detalleventas.component';
import { JumboComponent } from './components/admin/jumbo/jumbo.component';
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


import { HttpClient } from '@angular/common/http';
import { RecoveryComponent } from './components/recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AuthComponent,
    NavComponent,
    FootComponent,
    AsideComponent,
    CreateCategoriaComponent,
    IndexCategoriaComponent,
    EditCategoriaComponent,
    CreateProductoComponent,
    MenuComponent,
    CreateMarcaComponent,
    IndexMarcaComponent,
    EditMarcaComponent,
    IndexProductoComponent,
    EditProductoComponent,
    GaleriaProductoComponent,
    SelectorProductoComponent,
    ColorProductoComponent,
    PapeleraProductoComponent,
    ProductosComponent,
    ShowProductoComponent,
    CarritoComponent,
    PerfilComponent,
    AsideCuentaComponent,
    DireccionesComponent,
    CuponComponent,
    PostalComponent,
    IndexOrdenesComponent,
    TrackOrdenComponent,
    DetalleOrdenComponent,
    IndexTicketComponent,
    ChatTicketComponent,
    DateAgoPipe,
    AdminTicketComponent,
    AdminChatComponent,
    IndexCancelacionComponent,
    DetalleCancelacionComponent,
    AdminVentasComponent,
    InvoiceComponent,
    AdminDetalleventasComponent,
    JumboComponent,
    GeneralComponent,
    ContactoComponent,
    PromocionComponent,
    ErrorComponent,
    ContactoAdminComponent,
    SliderComponent,
    DashboardComponent,
    IndexIngresoComponent,
    CreateIngresoComponent,
    DetalleIngresoComponent,
    RecoveryComponent
    
  ],
  imports: [
 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule, 
    NgbAlertModule,
    NgxTinymceModule.forRoot({
      baseURL: '../../assets/tinymce/',
    }),
    NgxDropzoneModule,
    SocialLoginModule,
    NgxLoadingModule,
    CarouselModule ,
    BrowserAnimationsModule,
    PdfViewerModule,
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '642497549666-k6drjppnds0hnb80nput14b40f45hh5f.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('320641725625303'),
          }
         
        ],
      } as SocialAuthServiceConfig,
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
