import { Component, OnInit, inject} from '@angular/core';
import { PrestamoService } from '../../services/prestamo.service';
import { FormControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Prestamo } from '../../interfaces/prestamo';
import { LibroService } from '../../services/libro.service';
import { Libro } from '../../interfaces/libro';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import { PrestamoSummary } from '../../interfaces/PrestamoSummary';


@Component({
  selector: 'app-prestamo-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './prestamo-list.component.html'
})
export class PrestamoListComponent implements OnInit {
  private readonly prestamoService = inject(PrestamoService);
  private readonly libroService = inject(LibroService);
  private readonly clienteService = inject(ClienteService);

  private readonly router = inject(Router);

  public prestamoList$!: Prestamo[];
  public clienteList$!: Cliente[];
  public libroList$!: Libro[];
  
  public prestamoSumaryList$!: PrestamoSummary[];

  public editBook!: Prestamo;

  formGroupPrestamo!: UntypedFormGroup;
  idPrestamo = new FormControl('');
  idLibro = new FormControl('');
  idCliente = new FormControl('');
  fechaInicio = new FormControl('');
  fechaFin = new FormControl('');

  isEditLoan= false;
  

  ngOnInit(): void {
    this.initializeFormGroup();
    this.formGroupPrestamo.disable();
    this.getListPrestamos();
    this.getListPrestamoSummary()
    this.getListClientes();
    this.getListLibros();
  }

  initializeFormGroup() {
    this.formGroupPrestamo = new UntypedFormGroup({
      idPrestamo: new UntypedFormControl(''),
      idLibro: new UntypedFormControl(''),
      idCliente: new UntypedFormControl(''),
      fechaInicio: new UntypedFormControl(''),
      fechaFin: new UntypedFormControl(''),      
    });
  }

  getListPrestamoSummary(){
    this.prestamoService.getPrestamoSummaryList().subscribe({
      next: (response) => {
        this.prestamoSumaryList$ = response;
      },
    });
  }

  getListPrestamos() {
    try {
      this.prestamoService.getPrestamoList().subscribe({
        next: (response) => {
          this.prestamoList$ = response;
        },
      });
    } catch (error) {
      console.error(error);
    }
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

  getListLibros() {
    try {
      this.libroService.getLibroList().subscribe({
        next: (response) => {
          this.libroList$ = response;
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  newPrestamo(editPrestamo: boolean) {
    this.limpiarCampos();
    this.isEditLoan = editPrestamo;
  }

  public savePrestamo() {
    const newPrestamo: Prestamo = {
      'idPrestamo': this.idPrestamo.value,
      'idLibro': this.idLibro.value,
      'idCliente': this.idCliente.value,
      'fechaInicio': this.fechaInicio.value,
      'fechaFin': this.fechaFin.value
    };
    try {
      this.prestamoService.savePrestamo(newPrestamo).subscribe ({
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
    this.idPrestamo.setValue('');
    this.idLibro.setValue('');
    this.idCliente.setValue('');
    this.fechaInicio.setValue('');
    this.fechaFin.setValue('');
  }

  getPrestamo(idPrestamo: any) {
    try {
      this.isEditLoan = true;
      this.prestamoService.getPrestamo(idPrestamo).subscribe({
        next: (response) => {
          if(response){
            this.editBook = response;
            this.idPrestamo.setValue(this.editBook.idPrestamo);
            this.idLibro.setValue(this.editBook.idLibro);
            this.idCliente.setValue(this.editBook.idCliente);
            this.fechaInicio.setValue(this.editBook.fechaInicio);
            this.fechaFin.setValue(this.editBook.fechaFin);
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  editPrestamo() {
    const editPrestamo: Prestamo = {
      'idPrestamo': this.idPrestamo.value,
      'idLibro': this.idLibro.value,
      'idCliente': this.idCliente.value,
      'fechaInicio': this.fechaInicio.value,
      'fechaFin': this.fechaFin.value
    };
    try {
      this.prestamoService.editPrestamo(editPrestamo).subscribe({
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

  deletPrestamo(idPrestamo: any) {
    try {
      this.prestamoService.deletePrestamo(idPrestamo).subscribe({
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
