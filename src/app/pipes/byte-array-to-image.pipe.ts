import { Byte } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'byteArrayToImage'
})
export class ByteArrayToImagePipe implements PipeTransform {

  constructor(private sanitizer : DomSanitizer) {}

  transform(value: Byte[]): SafeUrl {
    let objectURL = 'data:image/jpeg;base64,' + value
    return this.sanitizer.bypassSecurityTrustUrl(objectURL)
  }

}
