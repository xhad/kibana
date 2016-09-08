import _ from 'lodash';
import L from 'leaflet';
import VislibVisualizationsMarkerTypesBaseMarkerProvider from 'ui/vislib/visualizations/marker_types/base_marker';
export default function GeohashGridMarkerFactory(Private) {

  const BaseMarker = Private(VislibVisualizationsMarkerTypesBaseMarkerProvider);

  /**
   * Map overlay: rectangles that show the geohash grid bounds
   *
   * @param map {Leaflet Object}
   * @param geoJson {geoJson Object}
   * @param params {Object}
   */
  class GeohashGridMarker extends BaseMarker {
    constructor(map, geoJson, params) {
      super(map, geoJson, params);

      // super min and max from all chart data
      const min = this.geoJson.properties.allmin;
      const max = this.geoJson.properties.allmax;

      this._createMarkerGroup({
        pointToLayer: function (feature, latlng) {
          const geohashRect = feature.properties.rectangle;
          // get bounds from northEast[3] and southWest[1]
          // corners in geohash rectangle
          const corners = [
            [geohashRect[3][0], geohashRect[3][1]],
            [geohashRect[1][0], geohashRect[1][1]]
          ];
          return L.rectangle(corners);
        }
      });
    }
  }

  return GeohashGridMarker;
};
