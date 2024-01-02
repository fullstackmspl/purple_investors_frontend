import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { MarkdownPipe } from './markdown.pipe';
import { TimeConvertPipe } from './time-convert.pipe';
import { DaysfilterPipe } from './daysFilter.pipe';
import { DateDifferencePipe } from './date-difference.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe,MarkdownPipe,TimeConvertPipe,DaysfilterPipe,DateDifferencePipe],
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe,MarkdownPipe,TimeConvertPipe,DaysfilterPipe,DateDifferencePipe],
  providers: [DatePipe, TimeConvertPipe,DaysfilterPipe,DateDifferencePipe]
})

export class PipeModule{}
