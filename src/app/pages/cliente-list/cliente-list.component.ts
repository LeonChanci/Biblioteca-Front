import { Component, OnInit, inject} from '@angular/core';
import { Cliente } from '../../interfaces/cliente';
import { ClienteService } from '../../services/cliente.service';
import { FormControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-list.component.html'
})
export class ClienteListComponent implements OnInit {
  private readonly clienteService = inject(ClienteService);
  private readonly router = inject(Router);

  public clienteList$!: Cliente[];
  public editClient!: Cliente;

  formGroupCliente!: UntypedFormGroup;
  identificacion = new FormControl('');
  nombres = new FormControl('');
  apellidos = new FormControl('');
  edad = new FormControl('');
  direccion = new FormControl('');
  telefono = new FormControl('');

  isEditClient = false;

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getListClientes();
  }

  initializeFormGroup() {
    this.formGroupCliente = new UntypedFormGroup({
      identificacion: new UntypedFormControl(''),
      telefono: new UntypedFormControl(''),
      nombres: new UntypedFormControl(''),
      apellidos: new UntypedFormControl(''),
      direccion: new UntypedFormControl(''),      
    });
  }

  getListClientes() {
    try {
      this.clienteService.getClienteList().subscribe({
        next: (response) => {
          this.clienteList$ = response;
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  newCliente(editClient: boolean) {
    this.limpiarCampos();
    this.isEditClient = editClient;
  }

  public saveCliente() {
    const newClient: Cliente = {
      'idCliente': this.identificacion.value,
      'nombres': this.nombres.value,
      'apellidos': this.apellidos.value,
      'edad': this.edad.value,
      'direccion': this.direccion.value,
      'telefono': this.telefono.value,
    };
    try {
      this.clienteService.saveCliente(newClient).subscribe ({
        next: (response) => {
          if(response){
            this.limpiarCampos();
            window.location.reload();
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  limpiarCampos() {
    this.identificacion.setValue('');
    this.nombres.setValue('');
    this.apellidos.setValue('');
    this.edad.setValue('');
    this.direccion.setValue('');
    this.telefono.setValue('');
  }

  getCliente(idCliente: any) {
    try {
      this.isEditClient = true;
      this.clienteService.getCliente(idCliente).subscribe({
        next: (response) => {
          if(response){
            this.editClient = response;
            this.identificacion.setValue(this.editClient.idCliente);
            this.nombres.setValue(this.editClient.nombres);
            this.apellidos.setValue(this.editClient.apellidos);
            this.edad.setValue(this.editClient.edad);
            this.direccion.setValue(this.editClient.direccion);
            this.telefono.setValue(this.editClient.telefono);
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  editCliente() {
    const editClient: Cliente = {
      'idCliente': this.identificacion.value,
      'nombres': this.nombres.value,
      'apellidos': this.apellidos.value,
      'edad': this.edad.value,
      'direccion': this.direccion.value,
      'telefono': this.telefono.value,
    };
    try {
      this.clienteService.editCliente(editClient).subscribe ({
        next: (response) => {
          if(response){
            window.location.reload();
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  deletCliente(idCliente: any) {
    try {
      this.clienteService.deleteCliente(idCliente).subscribe({
        next: (response) => {
          window.location.reload();
          if(response){
            window.location.reload();
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
