import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: any,searchTerm:string): any{
    if(value.length===0){
      return value
    }
    return value.filter(function(search){
      return search?.name?.toLowerCase()?.indexOf(searchTerm?.toLowerCase())>-1 || search?.heading?.toLowerCase()?.indexOf(searchTerm?.toLowerCase())>-1 
      || search?.subheading?.toLowerCase()?.indexOf(searchTerm?.toLowerCase())>-1 ||
      search?.tags?.toLowerCase()?.indexOf(searchTerm?.toLowerCase())>-1
    })
  }

}
