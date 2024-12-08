import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoClienteModal } from 'src/app/modal/nuevocliente/nuevocliente.component';
import { Detalle } from 'src/app/modelo/Detalle';
import { Pedido } from 'src/app/modelo/Pedido';
import { Producto } from 'src/app/modelo/ProductoVenta';
import { Servicio } from 'src/app/servicio/servicio';

@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'modalclientes.component.html',
    styleUrls:["./modalcliente.css"]
  })
  export class ModalServicioCliente {
  formulario!: FormGroup; 
  nombreMembresia: any = "";
  clientesSeleccionados = new MatTableDataSource<any>([]);
  
  displayedColumns: string[] = ['documentoIdentidad','nombre',  'accion'];
  public ajaxOptions: any;
  form: FormGroup;
  public formControl = new FormControl();
  clientesFiltrados: any[] = [];
  base_url = "";
  detalle_producto!: Pedido;
    

  constructor(
    public dialogRef: MatDialogRef<Detalle>,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    public servicio: Servicio,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.base_url = this.data.url;
    this.form = this._formBuilder.group({
      cliente: ['', [Validators.required,]],
      busqueda: new FormControl(''),
      //secondFormGroup:this.formbuilder.group({ tipo_comprobante: new FormControl(''), })
    });
    // Inicializa los clientes actuales si existen
    if (this.data.clientesActuales) {
      this.clientesSeleccionados.data = [...this.data.clientesActuales];
    }
  }

  ngOnInit(): void { 
    this.nombreMembresia = this.data.nombre_servicio;
    this.formulario = this._formBuilder.group({
      cliente: ['', Validators.required],
      busqueda: new FormControl(''),
    });
  
    this.formulario.get('busqueda')?.valueChanges.subscribe((valor: string) => {
      this.buscarClientes(valor);
    });
    let _this = this;

    this.ajaxOptions = {
      url: this.servicio.url_global + "Membresias/buscar_cliente_servicios",
      dataType: 'json',
      delay: 500,
      cache: false,
      data: (params: any) => {
        return {

          search: params.term,
          gotoPage: params.page,
          id: _this.form.value["tipo_comprobante"],
          tipo_pago: 1
        };
      },
      processResults: (data: any, params: any) => {
        params.page = params.page || 1;
        //  console.log(data);
        return {

          results: data,
        };
      }
    };

    this.options = {
      dropdownParent: document.querySelector('.mat-dialog-container'), // Contenedor del modal
      ajax: this.ajaxOptions,
      templateResult: this.templateResult,
      language: {
        searching: function () {
          return "Buscando...";
        },
        errorLoading: function () {
          return "Error en el resultado de la busqueda"
        }, noResults: function () {
          return "No se obtuvo resultados"
        },
      },
    };
  }

  options: any = {};

  public templateResult = (state: any): HTMLElement | string => {
    if (!state.documento) {
      return state.text;
    }
  
    // Crear un contenedor dinámicamente
    const container = document.createElement('span');
  
    // Crear el elemento para el texto principal
    const mainText = document.createElement('b');
    mainText.textContent = state.text;
  
    // Crear el elemento para el subtítulo (documento)
    const subText = document.createElement('h6');
    subText.style.fontSize = '12px';
    subText.textContent = state.documento;
  
    // Añadir los elementos al contenedor
    container.appendChild(mainText);
    container.appendChild(subText);
  
    return container;
  };

  public valueChanged(event: any) {
    console.log('value changed: ' + event);
    // alert();
    setTimeout(() => { 
    }, 100);

  }
  nuevocliente() {
    this.modalService.open(NuevoClienteModal, { size: 'lg' });
  }

  buscarClientes(nombre: string): void { 
    
    console.log(this.data.token)
    this.servicio
      .enviar_seguro('Membresias/buscar_cliente_servicios', { nombre }, this.data.token)
      .pipe()
      .subscribe((response: any) => {
        if (response && response.success) {
          this.clientesFiltrados = response.data;
        } else {
          this.clientesFiltrados = [];
        }
      });
  }

  agregarCliente(cliente: any): void {
    //if (!this.clientesSeleccionados.some((c) => c.id === cliente.id)) {
    //  this.clientesSeleccionados.push(cliente);
    //}
  }

 

enviar(): void {
  if (this.clientesSeleccionados.data.length === 0) {
    alert('Debe seleccionar al menos un cliente.');
    return;
  }

  const detallesPedidos = this.clientesSeleccionados.data.map((cliente) => {
    return new Pedido(
      cliente.id, // ID del cliente
      cliente.nombre, // Nombre del cliente
      cliente.documentoIdentidad, // Documento de identidad (o campo adicional)
      50, // Precio (usa un valor adecuado para el producto)
      1, // Cantidad seleccionada
      1, // Estado o algún indicador adicional
      cliente.direccion // Dirección o cualquier otra información del cliente
    );
  });

  console.log('Detalles de pedidos:', detallesPedidos);

  // Cerrar el diálogo pasando los detalles de los pedidos
  this.dialogRef.close(detallesPedidos);
}

  onImgError1(event: any): void {
    event.target.src = this.servicio.url_global + '/public/default.jpg';
  }

  onClienteSeleccionado(event: any): void {
    if (event && event.length > 0) {
      const partes = event.split('/');
      if (partes.length >= 5) {
        const clienteSeleccionado = {
          id: partes[0],
          documentoIdentidad: partes[1],
          nombre: partes[2],
          campoNuevo: partes[3],
          direccion: partes.slice(4).join('/'),
        };
  
        // Verificar si ya se alcanzó el máximo de clientes seleccionados
        if (this.clientesSeleccionados.data.length >= this.data.cantidadRegistros) {
          alert(`Solo se permiten seleccionar hasta ${this.data.cantidadRegistros} clientes.`);
          return;
        }
  
        // Verificar duplicados y agregar al data source
        if (!this.clientesSeleccionados.data.some((cliente) => cliente.id === clienteSeleccionado.id)) {
          this.clientesSeleccionados.data = [
            ...this.clientesSeleccionados.data,
            clienteSeleccionado,
          ];
        } else {
          alert('El cliente ya está seleccionado.');
        }
      }
    }
  }


  obtenerColorFondo(): string {
    const seleccionados = this.clientesSeleccionados.data.length;
    const cantidadTotal = this.data.cantidadRegistros;

    if (seleccionados === 0) {
      return 'gray'; 
    } else if (seleccionados < cantidadTotal) {
      return 'white'; 
    } else {
      return 'green'; 
    }
  }

  eliminarCliente(cliente: any): void {
    // Filtrar clientes seleccionados para excluir el cliente a eliminar
    this.clientesSeleccionados.data = this.clientesSeleccionados.data.filter(
      (c) => c.id !== cliente.id
    );
  
    // Opcional: Confirmar la eliminación
    console.log(`Cliente con ID ${cliente.id} eliminado.`);
  }
}