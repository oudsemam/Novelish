import { Component, Input, OnInit } from '@angular/core';
import { Shelf } from '../shelf';
import { ShelvesService } from '../shelves.service';


@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.css']
})
export class ShelvesComponent implements OnInit {

  @Input() shelves: Shelf[] = [];


  constructor(private shelfService: ShelvesService) { }



  ngOnInit(): void {

  }

}
