import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './CSVModel';
import { environment } from '../../../environments/environment';

@Injectable()
export class MapService {
  title = 'app';
  public records: any[] = []; 

  constructor(public http: HttpClient) {}

  getCSVData(cb): any {  


    // and then:
    this.http.get(`${environment.apiURL}/home/getData`, {responseType: 'blob'})
    .subscribe(data => {

      let text = [];  
      let files = data;  
    
      let reader = new FileReader();  
      reader.readAsText(files);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
        cb(this.records);
      }

      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      }
    
    });
  }  
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  

    return csvRecordsArray.map((curruntRecord,index) => {
      curruntRecord = curruntRecord.split('\t'); 

      let csvRecord: CSVRecord = new CSVRecord();
      csvRecord.code = curruntRecord[1] != undefined ? curruntRecord[1].trim() : ""; 
      csvRecord.lat = curruntRecord[27] != undefined ? this.ParseDMS(curruntRecord[27].trim()) : ""; 
      csvRecord.long = curruntRecord[28] != undefined ? this.ParseDMS(curruntRecord[28].trim()) : "";
      csvRecord.elevation = curruntRecord[30] != undefined ? curruntRecord[30].trim() : ""; 
      csvRecord.owner = curruntRecord[22] != undefined ? curruntRecord[22].trim() : ""; 
      csvRecord.strucType = curruntRecord[23] != undefined ? curruntRecord[23].trim() : ""; 
      csvRecord.height = curruntRecord[24] != undefined ? curruntRecord[24].trim() : ""; 
      csvRecord.city = curruntRecord[7] != undefined ? curruntRecord[7].trim() : ""; 
      csvRecord.state = curruntRecord[9] != undefined ? curruntRecord[9].trim() : ""; 
      csvRecord.ZIP = curruntRecord[10] != undefined ? curruntRecord[10].trim() : ""; 
      csvRecord.county = curruntRecord[11] != undefined ? curruntRecord[11].trim() : ""; 
      csvRecord.plusCode = curruntRecord[29] != undefined ? curruntRecord[29].trim() : "";
      
      return csvRecord;
    });
  }  

  ParseDMS(input) {
    var parts = input.split(/\s+/);
    return this.ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    // var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
  }

  ConvertDMSToDD(degrees, minutes, seconds, direction) {   
    var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd.toFixed(8);
  }
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split('\t');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
}