import {Component, Input} from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {ProfileComponent} from '../profile.component';


@Component({
  selector: 'app-banner-editor',
  standalone: true,
  imports: [
    ImageCropperComponent
  ],
  templateUrl: './banner-editor.component.html',
  styleUrl: './banner-editor.component.css'
})

export class BannerEditorComponent {
  imageChangedEvent: Event | null = null;
  croppedImage: string  = '';
  @Input() aspectRatio!: number;
  @Input() oggetto!: string;
  maxHeight: number = 500;


  constructor(
    private profile: ProfileComponent,
  ) {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != null) {
      this.croppedImage = event.objectUrl;
    }
  }

  imageLoaded(image: LoadedImage) {
    const originalHeight = image.original.size.height;
    const originalWidth = image.original.size.width;

    if (originalHeight > this.maxHeight) {
      const scale = this.maxHeight / originalHeight;

      const newWidth = originalWidth * scale;

      const cropperElement = document.querySelector('image-cropper') as HTMLElement;
      if (cropperElement) {
        cropperElement.style.height = `${this.maxHeight}px`;
        cropperElement.style.width = `${newWidth}px`;
      }
    }
  }
  cropperReady() {
  }
  loadImageFailed() {
  }

  closePopup() {
    this.profile.denyAll();
  }

  confirmSelection(){
    switch(this.oggetto){
      case "Banner": {
        this.profile.setBanner(this.croppedImage);
        break;
      }
      case "Foto Profilo": {
        this.profile.setProPic(this.croppedImage);
        break;
      }
    }
    this.profile.closeBanner(this.croppedImage,this.oggetto);
  }

}
