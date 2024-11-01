import { Component, OnInit, inject} from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { FormControl, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Libro } from '../../interfaces/libro';


@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './libro-list.component.html'
})
export class LibroListComponent implements OnInit {
  private readonly libroService = inject(LibroService);
  private readonly router = inject(Router);

  public libroList$!: Libro[];
  public editBook!: Libro;

  formGroupLibro!: UntypedFormGroup;
  idLibro = new FormControl('');
  nombre = new FormControl('');
  descripcion = new FormControl('');
  categoria = new FormControl('');
  autor = new FormControl('');
  ano = new FormControl('');

  isEditBook= false;

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getListLibros();
  }

  initializeFormGroup() {
    this.formGroupLibro = new UntypedFormGroup({
      identificacion: new UntypedFormControl(''),
      telefono: new UntypedFormControl(''),
      nombres: new UntypedFormControl(''),
      apellidos: new UntypedFormControl(''),
      direccion: new UntypedFormControl(''),      
    });
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

  newLibro(editLibro: boolean) {
    this.limpiarCampos();
    this.isEditBook = editLibro;
  }

  public saveLibro() {
    const newLibro: Libro = {
      'idLibro': this.idLibro.value,
      'nombre': this.nombre.value,
      'descripcion': this.descripcion.value,
      'categoria': this.categoria.value,
      'autor': this.autor.value,
      'ano': this.ano.value
    };
    try {
      this.libroService.saveLibro(newLibro).subscribe ({
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
    this.idLibro.setValue('');
    this.nombre.setValue('');
    this.descripcion.setValue('');
    this.categoria.setValue('');
    this.autor.setValue('');
    this.ano.setValue('');
  }

  getLibro(idLibro: any) {
    try {
      this.isEditBook = true;
      this.libroService.getLibro(idLibro).subscribe({
        next: (response) => {
          if(response){
            this.editBook = response;
            this.idLibro.setValue(this.editBook.idLibro);
            this.nombre.setValue(this.editBook.nombre);
            this.descripcion.setValue(this.editBook.descripcion);
            this.categoria.setValue(this.editBook.categoria);
            this.autor.setValue(this.editBook.autor);
            this.ano.setValue(this.editBook.ano);
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  editLibro() {
    const editLibro: Libro = {
      'idLibro': this.idLibro.value,
      'nombre': this.nombre.value,
      'descripcion': this.descripcion.value,
      'categoria': this.categoria.value,
      'autor': this.autor.value,
      'ano': this.ano.value
    };
    try {
      this.libroService.editLibro(editLibro).subscribe({
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

  deletLibro(idLibro: any) {
    try {
      this.libroService.deleteLibro(idLibro).subscribe({
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
