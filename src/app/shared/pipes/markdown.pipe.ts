import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Pipe({
  name: 'markdown',
  pure: true, // Set to false if your content is dynamic and may change
})
export class MarkdownPipe implements PipeTransform {
  constructor(private http: HttpClient) {}

  transform(markdownFile: string): Observable<string> {
    return this.http.get(markdownFile, { responseType: 'text' });
  }
}