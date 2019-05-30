<template>
    <div class="ui">
        <div id="map" class="map"></div>
        <div v-show="clikedRestaurantName != ''" class="details-popup">
            <a :href="'https://www.google.com/maps/search/?api=1&query=' + clikedRestaurantName" target="_blank">
                {{ clikedRestaurantName }}
            </a>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import RestaurantItem from '../components/RestaurantItem.vue'

    import * as ol from 'ol';
    import 'ol/ol.css';
    import { Map, View, Feature, Geolocation } from 'ol';
    import { Tile, Vector as VectorLayer } from 'ol/layer';
    import { OSM, Vector, Cluster } from 'ol/source';
    import Point from 'ol/geom/Point';
    import { Circle, Fill, Stroke, Style, Text, Icon } from 'ol/style';
    import { fromLonLat, transform } from 'ol/proj';

    export default {
        data() {
            return {
                title: 'Near you',
                map: null,
                geolocation: null,
                clikedRestaurantName: ''
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
                        new Tile({
                            source: new OSM()
                        })
                    ],
                    view: new View({
                        center: fromLonLat([37.41, 8.82]),
                        zoom: 2
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

                this.addPrimaryMarker({ locationName: 'Me', latitude: position.coords.latitude, longitude: position.coords.longitude });
            },

            fetchRestaurantLocation: function (restaurant) {
                fetch(`https://nominatim.openstreetmap.org/search?&format=json&limit=1&namedetails=1&q=${ restaurant.location }`)
                    .then(response => response.json())
                    .then(json => {
                        if (json.length) {
                            var latitude = parseFloat(json[0].lat);  
                            var longitude = parseFloat(json[0].lon);

                            this.addSecondaryMarker({ locationName: restaurant.name, longitude: longitude, latitude: latitude })
                        }
                    })
            },

            addRestaurantsToMap: function () {
                for (var i = 0; i < this.restaurants.length; i++) {
                    this.fetchRestaurantLocation(this.restaurants[i]);
                }

                 this.map.on('click', this.showRestaurantDetails);

                 this.map.on('pointermove', this.onPointerMove);
            },

            onPointerMove: function (event) {
                if (event.dragging) {
                    this.hideRestaurantDetailPopup()
                }
            },

            hideRestaurantDetailPopup: function () {
                this.clikedRestaurantName = '';
            },

            showRestaurantDetails: function(event) {
                var feature = this.map.forEachFeatureAtPixel(event.pixel,
                    function(feature) {
                        return feature;
                    });
                    if (feature) {
                        var restaurantName = feature.get('name');

                        this.clikedRestaurantName = restaurantName;
                    }
            },

            addPrimaryMarker: function ({ locationName, longitude, latitude }) {
                const style = new Style({
                    image: new Circle({
                        radius: 20,
                        fill: new Fill({
                            color: '#292e4f'
                        })
                    }),
                    text: new Text({
                        font: 'bold 17px "Miriam Libre","Helvetica Neue",Helvetica,Arial,sans-serif',
                        text: locationName,
                        fill: new Fill({
                            color: '#eb4b8a'
                        })
                    })
                });

                this.addMarker({ locationName: locationName, longitude: longitude, latitude: latitude, style: style });
            },

            addSecondaryMarker: function ({ locationName, longitude, latitude }) {
                const style = new Style({
                    image: new Circle({
                        radius: 20,
                        fill: new Fill({
                            color: '#eb4b8a'
                        })
                    }),
                    text: new Text({
                        font: 'bold 17px "Miriam Libre","Helvetica Neue",Helvetica,Arial,sans-serif',
                        text: locationName,
                        fill: new Fill({
                            color: '#292e4f'
                        })
                    })
                });

                this.addMarker({ locationName: locationName, longitude: longitude, latitude: latitude, style: style });
            },

            addMarker: function ({ locationName, longitude, latitude, style }) {
                this.map.addLayer(new VectorLayer({
                    source: new Vector({
                        features: [
                            new Feature({
                                name: locationName,
                                geometry: new Point(
                                        transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
                                    )
                            })
                        ]
                    }),
                    style: style
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

    .details-popup {
        z-index: 999;
        position: absolute;
        bottom: 50px;
        background: #292e4f;
        width: 100%;
        height: 5%;
        padding: 10px;
        text-align: center;
    }

    .details-popup a {
        color: #eb4b8a;
        font-size: 2rem;
        font-weight: 700;
    }
</style>
