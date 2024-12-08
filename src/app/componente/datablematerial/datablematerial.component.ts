
import { Component, ViewChild, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Servicio } from '../../servicio/servicio';
import { TooltipPosition, MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService, AuthenticationService } from '../../servicio';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-datablematerial',
  templateUrl: './datablematerial.component.html',
  styleUrls: ['./datablematerial.component.css']
})
export class DatablematerialComponent implements OnInit {
  @Input() titulo_modulo = '';
  @Input() columnas: any = [];
  @Input() filasource: MatTableDataSource<any> = new MatTableDataSource();
  @Input() nombrecolumna: any = [];
  @Input() url_eliminar = '';
  @Input() url_nuevo = '';
  @Input() url_editar = '';
  columntem: any = [];
  options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  constructor(private route: ActivatedRoute,
    private router: Router, private _snackBar: MatSnackBar, private authenticationService: AuthenticationService, public dialog: MatDialog, public servicio: Servicio) {
    // Assign the data to the data source for the table to render
    //  this.filasource = new MatTableDataSource(users1);
  }
  ngAfterViewInit() {
  }
  openDialog(id: string) {
    const dialogRef = this.dialog.open(EliminarModalComponent);
    let _this = this;
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'si') {
        //  alert("eliminar");
        let tempfile = this.filasource.data;
        tempfile = tempfile.filter(((item) => item.id != id));
        this.filasource = new MatTableDataSource(tempfile);
        let _this = this;
        let usuario: any = this.authenticationService.currentUserValue;
        console.log(usuario['Token']);
        const token = usuario['Token'].toString();
        this.servicio.enviar_seguro(this.url_eliminar, { 'id': id }, token).pipe().subscribe(
          (data: any) => {
            _this._snackBar.open(data["mensaje"], '', {
              duration: 2 * 1000,
            });

            _this.filasource.paginator = this.paginator;
            _this.filasource.sort = this.sort;
            // _this.dataSource = new MatTableDataSource(data["lista_concepto"]);

          });

      }
      // this.animal = result;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    //onsole.log(changes['inputValue'].currentValue);
    console.log(changes['filasource'].currentValue.data.length);
    if (changes['filasource'].currentValue.data.length > 0) {
      console.log(this.filasource);
      this.filasource.paginator = this.paginator;
      this.filasource.sort = this.sort;
    }
  }
  ngOnInit() {
    //  this.columntem.pushAll(this.columnas);
    let _this = this;
    this.columnas.forEach((element: any) => {
      _this.columntem.push(element);
    });
    console.log(this.columntem);

    this.columnas.unshift('id');
    this.columnas.push('opcion');

    //this._service.success('nat','dndnnd',this.options);
  }
  // dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.filasource.filter = filterValue;
  }
  editarboton(id: string) {
    //window.alert(id);
    this.router.navigate([this.url_editar + id]);
  }
  eliminarboton(id: string) {
    //window.alert(id);
    this.openDialog(id);
  }
}
@Component({
  selector: 'eliminar-modal',
  templateUrl: 'eliminar.component.html',
})
export class EliminarModalComponent { }
import { MatPaginatorIntl } from '@angular/material/paginator';
const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return `${startIndex + 1} - ${endIndex} van ${length}`;
}


export function getDutchPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Elementos por página';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Anterior página';
  paginatorIntl.getRangeLabel = dutchRangeLabel;
  return paginatorIntl;
}