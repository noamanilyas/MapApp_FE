import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './CSVModel';

@Injectable()
export class MapService {
  title = 'app';
  public records: any[] = []; 

  constructor(public http: HttpClient) {}

  getMarkers(): any {  


    // and then:
    this.http.get('http://localhost:8000/users/getData', {responseType: 'blob'})
    .subscribe(data => {

      console.log(data)
      let text = [];  
      let files = data;  
    
      if (this.isValidCSVFile(files)) {  
    
        let reader = new FileReader();  
        reader.readAsText(files);  
    
        reader.onload = () => {  
          let csvData = reader.result;  
          console.log(csvData)  
          let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
    
          let headersRow = this.getHeaderArray(csvRecordsArray);  
    
          this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
          console.log(this.records) 
        };  
    
        reader.onerror = function () {  
          console.log('error is occured while reading file!');  
        };  
    
      } else {  
        console.log("Invalid .csv file.");  
        // this.fileReset();  
      }  

    });
  
      
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();  
        csvRecord.firstName = curruntRecord[1].trim();  
        csvRecord.lastName = curruntRecord[2].trim();  
        csvRecord.age = curruntRecord[3].trim();  
        csvRecord.position = curruntRecord[4].trim();  
        csvRecord.mobile = curruntRecord[5].trim();  
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    if (file.type == "text/csv"){
      return true;
    } else {
      return false;
    }
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
}