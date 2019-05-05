<template>
    <div class="ui">
        <div id="map" class="map"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import RestaurantItem from '../components/RestaurantItem.vue'

    import * as ol from 'ol';
    import 'ol/ol.css';
    import { Map, View, Feature } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import VectorLayer from 'ol/layer/Vector';
    import OSM from 'ol/source/OSM';
    import Vector from 'ol/source/Vector';
    import Point from 'ol/geom/Point';
    import Style from 'ol/style/Style';
    import Icon from 'ol/style/Icon';
    import { fromLonLat, transform } from 'ol/proj';

    export default {
        data() {
            return {
                title: 'Near you',
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

            this.setCurrentPosition()

            this.addRestaurantsToMap()
        },
        methods: {
            initMap: function () {
                this.map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        })
                    ],
                    view: new View({
                        center: fromLonLat([37.41, 8.82]),
                        zoom: 4
                    })
                });
            },

            setCurrentPosition: function () {
                if (!navigator.geolocation) {
                    return;
                }

                navigator.geolocation.getCurrentPosition(this.movePosition);
            },

            movePosition: function(position) {
                const coords = fromLonLat([position.coords.longitude, position.coords.latitude]);

                this.map.getView().animate({ center: coords, zoom: 16 });

                this.addMarker({ locationName: 'Me', latitude: position.coords.latitude, longitude: position.coords.longitude });
            },

            addRestaurantsToMap: function () {
                for(var i = 0; i < this.restaurants.length; i++) {
                    let restaurant = this.restaurants[i]
                    fetch(`https://nominatim.openstreetmap.org/search?&format=json&q=${ this.restaurants[i].location }`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.length) {
                            console.log(json[0])
                            this.addMarker({ locationName: restaurant.name, longitude: json[0].lon, latitude: json[0].lat })
                        }
                    })
                }
            },

            addMarker: function ({ locationName, longitude, latitude }) {
                this.map.addLayer(new VectorLayer({
                    source: new Vector({
                        features: [
                            new Feature({
                                geometry: new Point(
                                        transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
                                    )
                            })
                        ]
                    }),
                    style: new Style({
                        image: new Icon(({
                            anchor: [0.5, 1],
                            src: `http://cdn.mapmarker.io/api/v1/pin?text=${ locationName }&size=50&hoffset=1`
                        }))
                    })
                }));
            }
        }
    }
</script>

<style scoped>
    .map {
        width: 100%;
        height: 100%;
        position:fixed;
      }
</style>
