import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  pageUrl!: string

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.pageUrl = '/' + this.activatedRoute.snapshot.url.join('/');
  }
}
