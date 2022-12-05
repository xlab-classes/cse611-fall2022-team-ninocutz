import { Component, OnInit, ViewChild } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { GalleryImagesModel } from 'src/app/core/models/gallery-images.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [MessageService],
})
export class GalleryComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: any;
  faTrash = faTrash;
  galleryImages: GalleryImagesModel[] = [];
  uploadedFiles: any;
  loading = false;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllGalleryImages();
  }

  getAllGalleryImages() {
    this.loadGalleryImages();
  }

  myUploader(event: any) {
    for (let file of event.files) {
      this.uploadedFiles = file;
    }
  }

  loadGalleryImages() {
    this.dataService.getAllGalleryImages().subscribe((data) => {
      this.galleryImages = data.images;
    });
  }

  clear() {
    this.fileUpload.clear();
    this.uploadedFiles = undefined;
  }

  uploadImage() {
    this.loading = true;
    this.dataService
      .addNewGalleryImage(this.uploadedFiles)
      .subscribe((data) => {
        this.clear();
        this.loading = false;
        this.loadGalleryImages();
        this.showAddSuccess();
      });
  }

  showAddSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Image',
    });
  }

  showDeleteSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Deleted Image',
    });
  }

  deleteImage(image: GalleryImagesModel) {
    this.dataService.deleteGalleryImage(image.Id).subscribe((data) => {
      this.loadGalleryImages();
      this.showDeleteSuccess();
    });
  }

  getGalleryDeleteImageDivId(gal: GalleryImagesModel): string {
    return 'galleryImageDelete-' + this.galleryImages.indexOf(gal);
  }
}
