import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { NovelishBackendService } from '../novelish-backend.service';
import { OpenLibraryService } from '../open-library.service';
import { AuthService } from '../shared/services/auth.service';
import { Shelf } from '../shelf';



@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.css']
})
export class ShelvesComponent implements OnInit {

  faChevronDown = faChevronDown;
  shelves: any[] = [];
  subscription: Subscription | null = null
  // emailsubscription: Subscription | null = null
  
 
  constructor(private NBService: NovelishBackendService, private AuthService: AuthService) { }



  ngOnInit(): void {
    
    this.subscription = this.NBService.getShelvesByUser().subscribe((s)=>{
      console.log(s)
      this.shelves = s
    })
  }
    // this.emailsubscription = this.NBService.getUserId(this.user.email).subscribe((id) =>{
    //   this.userId = id
    //   this.subscription = this.NBService.getShelvesByUser(this.userId).subscribe((s)=>{
    //     console.log(s)
    //     this.shelves = s
    //   })
    // })
    
    // toggle(value: boolean | null, i: number) {
    //   if(this.shelves[i].value !== value) {
    //     this.shelves[i].value = value;
    //   } else {
    //     this.shelves[i].value = null;
    //   }
    // } 


}
