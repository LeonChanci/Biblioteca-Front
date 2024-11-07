import { Component, OnInit, inject} from '@angular/core';
import { LibroXmlService } from '../../services/libroxml.service';
import { ReactiveFormsModule } from '@angular/forms';
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
}
