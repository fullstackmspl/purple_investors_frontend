import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { FilterPipe } from './filter.pipe';
import { SearchPipe } from './search.pipe';
import { ShortNamePipe } from './short-name.pipe';
import { MarkdownPipe } from './markdown.pipe';

@NgModule({
  declarations:[FilterPipe, SearchPipe, ShortNamePipe,MarkdownPipe],
  imports:[CommonModule],
  exports:[FilterPipe, SearchPipe, ShortNamePipe,MarkdownPipe]
})

export class PipeModule{}
