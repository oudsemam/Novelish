import { Component, Input, OnInit } from '@angular/core';
import { faDumpsterFire } from "@fortawesome/free-solid-svg-icons"
import { NovelishBackendService } from '../novelish-backend.service';
import { OpenLibraryService } from '../open-library.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  faDumpsterFire = faDumpsterFire;
  ibsn: string = ''
  OLSubscription: Subscription | null = null
  NBSubscription: Subscription | null = null
  constructor(private backend: NovelishBackendService, private OLService: OpenLibraryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.OLSubscription = this.activatedRoute.paramMap
			.pipe(switchMap(p => this.OLService.getBook(p.get('ibsn'))))
			.subscribe((ibsn) => this.ibsn = ibsn);

    // this.NBSubscription = 
  }

}
