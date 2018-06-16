
import { Injectable } from "@angular/core";
import { AppConfig } from "../app/app.config";

import { Camera } from "@ionic-native/camera";
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { UtilsService } from "./utils.service";
import { Platform } from "ionic-angular";
import {Observable} from "rxjs/Observable";

declare let cordova;


@Injectable()
export class UploadImageService {

  constructor(
    private camera: Camera,
    private transfer: Transfer,
    public utilsService: UtilsService,
    private file: File,
    private filePath: FilePath,
    public platform: Platform,
  ) {

  }

  /**
   * Take picture and select camera options
   *
   * @param sourceType
   * @returns {string}
   */
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    let options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    let imageFileName = this.createFileName();
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, imageFileName);
          });
      } else {
        let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, imageFileName);
      }
    }, (err) => {
      this.utilsService.presentToast('Error while selecting image : ' + err);
      imageFileName = "";
    });
    return imageFileName;
  }

  /**
   * Create a new name for the image using the date
   *
   * @returns {string}
   */
  public createFileName() {
    let d = new Date(),
      n = d.getTime();

    return n + ".jpg";
  }

  /**
   * Copy the image to a temporary local cordova folder
   *
   * @param namePath
   * @param currentName
   * @param newFileName
   */

  public copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(success => {
      }, error => {
        this.utilsService.presentToast('Error while storing file: '+ error);
      });
  }

  /**
   * Upload image to server
   *
   */
  public uploadImage(path) {
    // Returned String
    let imagePath= String();
    // Destination URL
    let url = AppConfig.SERVER_URL+"/upload";
    // File for Upload
    let targetPath = this.pathForImage(path);
    // File name only
    let filename = path;

    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params : {'fileName': filename}
    };
    const fileTransfer: TransferObject = this.transfer.create();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {
      imagePath = data.response;
    }, err => {
      this.utilsService.presentToast('Error while uploading file: '+ err);
    });
  }

  /**
   * Method to return the temporary path of the image in cordova directory
   *
   * @param img
   * @returns {any}
   */
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
}
