import {Component, Input} from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

import {ProfileComponent} from '../profile.component';
import {DatabaseService} from '../../database.service';


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
    private database: DatabaseService
  ) {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != null) {
      this.croppedImage = event.objectUrl;
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    const originalHeight = image.original.size.height;
    const originalWidth = image.original.size.width;

    if (originalHeight > this.maxHeight) {
      const scale = this.maxHeight / originalHeight;

      // Calcola le nuove dimensioni
      const newWidth = originalWidth * scale;

      // Applica lo stile dinamico al cropper (se necessario)
      const cropperElement = document.querySelector('image-cropper') as HTMLElement;
      if (cropperElement) {
        cropperElement.style.height = `${this.maxHeight}px`;
        cropperElement.style.width = `${newWidth}px`;
      }
    }
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  closePopup() {
    this.profile.closeBanner();
  }

  async confirmSelection(){
    switch(this.oggetto){
      case "Banner": {
        this.profile.setBanner(this.croppedImage);
        await this.database.setBgImage("giorgio", this.base64ToBlob(this.croppedImage, "image/png"));
        break;
      }
      case "Foto Profilo": {
        this.profile.setProPic(this.croppedImage);
        await this.database.setProPic("giorgio", this.base64ToBlob(this.croppedImage, "image/png"));
        break;
      }
    }
    this.profile.closeBanner();
  }

  base64ToBlob(base64: string, contentType: string = ''): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: contentType});
  }
}