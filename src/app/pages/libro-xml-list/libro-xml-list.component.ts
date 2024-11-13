import { Component, OnInit, inject} from '@angular/core';
import { LibroXmlService } from '../../services/libroxml.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LibroXml } from '../../interfaces/libroxml';


@Component({
  selector: 'app-libro-xml-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './libro-xml-list.component.html'
})
export class LibroXmlListComponent implements OnInit {
  private readonly libroXmlService = inject(LibroXmlService);
  private readonly router = inject(Router);

  public libroXmlList$!: LibroXml[];
  public total!: number;
  public percetage!: number;

  anoBusqueda = new FormControl('');

  isEditBook= false;

  ngOnInit(): void {
    this.getListLibros();
  }

  getListLibros() {
    try {
      this.libroXmlService.getLibroXmlList().subscribe({
        next: (response) => {
          this.libroXmlList$ = response;
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  getInforme() {
    try {
      this.libroXmlService.getTotalBooksWithMoreOneCategory().subscribe({
        next: (response) => {
          console.log(response);
          this.total = response;
        },
      });
      this.libroXmlService.getPercentageBooksAfterYear2000().subscribe({
        next: (response) => {
          console.log(response);
          this.percetage = response;
        },
      });

    } catch (error) {
      console.error(error);
    }
  }

  getFiltro() {
    try {
      this.libroXmlService.getLibrosXmlByFilter(Number(this.anoBusqueda.value)).subscribe({
        next: (response) => {
          console.log(response);
          this.libroXmlList$ = response;
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}
