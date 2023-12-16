import { MapsAPILoader } from '@agm/core';
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';

@Directive({
  selector: '[appGoogleAddress]'
})
export class GoogleAddressDirective {

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() filter: string[];
  private element: HTMLInputElement;
  geoCoder: google.maps.Geocoder;

  constructor(elRef: ElementRef, private zone: NgZone, private mapsAPILoader: MapsAPILoader) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    let locationData = [];
    let location_obj = {};
    let latLng_obj = {
      lat: 0,
      lng: 0
    };
    let placeName = {
      name : place.name || ""
    }; 
    latLng_obj.lat = place.geometry.location.lat();
    latLng_obj.lng = place.geometry.location.lng();
    for (let i in place.address_components) {
      let item = place.address_components[i];
      location_obj['formatted_address'] = place.formatted_address;
      if (item['types'].indexOf("locality") > -1) {
        location_obj['locality'] = item['long_name']
      } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
        location_obj['admin_area_l1'] = item['short_name']
      } else if (item['types'].indexOf("street_number") > -1) {
        location_obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf("route") > -1) {
        location_obj['route'] = item['long_name']
      } else if (item['types'].indexOf("country") > -1) {
        location_obj['country'] = item['long_name']
      } else if (item['types'].indexOf("postal_code") > -1) {
        location_obj['postal_code'] = item['short_name']
      }
    }
    Array.prototype.push.apply(locationData, [latLng_obj,location_obj,placeName])
    return locationData;
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      const center = { lat: 40.71, lng: -74.05 };
      let filter
      // Create a bounding box with sides ~30km away from the center point
      const defaultBounds = {
        north: center.lat + 0.2,
        south: center.lat - 0.2,
        east: center.lng + 0.2,
        west: center.lng - 0.2,
      };
      var options = {
        bounds: defaultBounds,
        types: this.filter || ['geocode'], 
        // componentRestrictions: {country: "us"},
        strictBounds: true,
      };
      const autocomplete = new google.maps.places.Autocomplete(this.element, options);
      //Event listener to monitor place changes in the input
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        //Emit the new address object for the updated place
        this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
          // Force change detection manually using NgZone
          this.zone.run(() => {
            // Nothing to do here, just running the change detection
          });
      });
    }
    )
  }


}