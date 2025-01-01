import { Component } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

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
  croppedImage: SafeUrl  = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl != null) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
