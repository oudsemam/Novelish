import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NovelishBackendService } from '../novelish-backend.service';
import { OpenLibraryService } from '../open-library.service';
import { Shelf } from '../shelf';



@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.css']
})
export class ShelvesComponent implements OnInit {

  shelves: Shelf[] = [];
  subscription: Subscription | null = null
  userId: number | null = null
  constructor(private NBService: NovelishBackendService) { }



  ngOnInit(): void {
    this.subscription = this.NBService.getShelvesByUser(this.userId).subscribe((s)=>{
      console.log(s)
      this.shelves = s
    })
  }

}
