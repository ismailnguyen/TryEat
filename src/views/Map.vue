<template>
    <div>
        <h1 class="ui header">
            Map
        </h1>

        <div id="map" class="map"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import RestaurantItem from '../components/RestaurantItem.vue'

    export default {
        data() {
            return {
                map: null
            }
        },
        components: {
            RestaurantItem
        },
        computed: {
            ...mapState(['userProfile', 'restaurants'])
        },
        mounted() {
            this.initMap()

            this.addRestaurantsToMap()
        },
        methods: {
            initMap: function () {
                this.map = new ol.Map({
                    target: 'map',
                    layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                    ],
                    view: new ol.View({
                        center: ol.proj.fromLonLat([37.41, 8.82]),
                        zoom: 4
                    })
                });
            },

            addRestaurantsToMap: function () {
                for(var i = 0; i < this.restaurants.length; i++) {

                    // add markers into map
                }

                var Markers =
                [
                    {lat: 41.28247976112171, lng: 28.000645778308126},
                    {lat: 41.28247976112171, lng: 28.000645778308126}
                ];

                var features = [];

                for (var i = 0; i < Markers.length; i++) {
                    var item = Markers[i];
                    var longitude = item.lng;
                    var latitude = item.lat;

                    var iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'))
                    });

                    var iconStyle = new ol.style.Style({
                        image: new ol.style.Icon(({
                            anchor: [0.5, 1],
                            src: "http://cdn.mapmarker.io/api/v1/pin?text=P&size=50&hoffset=1"
                        }))
                    });

                    iconFeature.setStyle(iconStyle);
                    features.push(iconFeature);
                }

                var vectorSource = new ol.source.Vector({
                    features: features
                });

                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource
                });

                this.map.addLayer(vectorLayer);
            }
        }
    }
</script>

<style scoped>
    .map {
        height: 400px;
        width: 100%;
      }
</style>
