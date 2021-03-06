import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IPhoto } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'pic-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: IPhoto[] = [];
  filter: string = '';
  shouldLoadMore: boolean = true;
  currentPage: number = 1;

  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data.photos;
  }

  loadPhotos() {
    const userName = this.activatedRoute.snapshot.params.userName;

    this.photoService.listForUserPaginated(userName, ++this.currentPage).subscribe(photos => {
      this.filter = '';
      this.photos = [...this.photos, ...photos];
      this.shouldLoadMore = photos.length > 0;
    });
  }
}
