import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;
  faTrash = faTrash;
  galleryImages: GalleryImagesModel[] = [];
  uploadedFiles: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllGalleryImages();
  }

  getAllGalleryImages() {
    this.dataService.getAllGalleryImages().subscribe((data) => {
      this.galleryImages = data.images;
    });
  }

  myUploader(event: any) {
    for (let file of event.files) {
      this.uploadedFiles = file;
    }
  }

  clear() {
    this.fileUpload.clear();
    this.uploadedFiles = undefined;
  }

  deleteImage(image: GalleryImagesModel) {}
}
