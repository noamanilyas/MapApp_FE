import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CSVRecord } from './CSVModel';
import { environment } from '../../../environments/environment';

@Injectable()
export class MapService {
  title = 'app';
  public records: any[] = [];

  constructor(public http: HttpClient) { }

  getCSVData(cb): any {


    // and then:
    this.http.get(`${environment.apiURL}/home/getChaptersData`, { responseType: 'blob' })
      .subscribe(data => {

        const text = [];
        const files = data;

        const reader = new FileReader();
        reader.readAsText(files);

        reader.onload = () => {
          const csvData = reader.result;
          const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

          const headersRow = this.getHeaderArray(csvRecordsArray);

          this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          console.log(this.records)
          cb(this.records);
        };

        reader.onerror = function () {
          console.log('error is occured while reading file!');
        };

      });
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    return csvRecordsArray.map((curruntRecord, index) => {
      curruntRecord = curruntRecord.split('\t');
      const csvRecord: CSVRecord = new CSVRecord();
      csvRecord.agency = curruntRecord[1] !== undefined ? curruntRecord[1].trim() : '';
      csvRecord.chapterName = curruntRecord[2] !== undefined ? curruntRecord[2].trim() : '';
      csvRecord.officeType = curruntRecord[3] !== undefined ? curruntRecord[3].trim() : '';
      csvRecord.mainContact = curruntRecord[9] !== undefined ? curruntRecord[9].trim() : '';
      csvRecord.email = curruntRecord[43] !== undefined ? curruntRecord[43].trim() : '';
      csvRecord.address = curruntRecord[19] !== undefined ? curruntRecord[19].trim() : '';
      csvRecord.city = curruntRecord[20] !== undefined ? curruntRecord[20].trim() : '';
      csvRecord.state = curruntRecord[21] !== undefined ? curruntRecord[21].trim() : '';
      csvRecord.ZIP = curruntRecord[22] !== undefined ? curruntRecord[22].trim() : '';
      csvRecord.lat = curruntRecord[23] !== undefined ? this.ParseDMS(curruntRecord[23].trim()) : '';
      csvRecord.long = curruntRecord[24] !== undefined ? this.ParseDMS(curruntRecord[24].trim()) : '';
      csvRecord.elevation = curruntRecord[25] !== undefined ? curruntRecord[25].trim() : '';
      csvRecord.plusCode = curruntRecord[26] !== undefined ? curruntRecord[26].trim() : '';
      csvRecord.phone2 = curruntRecord[30] !== undefined ? curruntRecord[30].trim() : '';
      csvRecord.nnBranch = curruntRecord[31] !== undefined ? curruntRecord[31].trim() : '';
      csvRecord.divsion = curruntRecord[32] !== undefined ? curruntRecord[32].trim() : '';
      csvRecord.chapterLGA = curruntRecord[36] !== undefined ? curruntRecord[36].trim() : '';

      return csvRecord;
    });
  }

  ParseDMS(input) {
    const parts = input.split(/\s+/);
    return this.ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
    // var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
  }

  ConvertDMSToDD(degrees, minutes, seconds, direction) {
    let dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / (60 * 60);

    if (direction === 'S' || direction === 'W') {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd.toFixed(8);
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split('\t');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
}
