<template>
    <div class="ui">
        <div id="map" class="map"></div>
        <div v-show="selectedRestaurant.name != ''" class="details-popup">
            <a :href="selectedRestaurantMapUrl()" target="_blank" class="title">
                {{ selectedRestaurant.name }}
            </a>
            <br>
            {{ selectedRestaurant.address }}
            <br><br>
            <a v-for="(tag, index) in selectedRestaurant.tags.split(',')" :key="index" class="ui label">
                {{tag}}
            </a>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import RestaurantItem from '../components/RestaurantItem.vue'
    import { debounce } from 'debounce';
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
                selectedRestaurant: {
                    name: '',
                    address: '',
                    description: ''
                }
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
                fetch(
                    `https://nominatim.openstreetmap.org/search?&format=json&limit=1&namedetails=1&q=${ restaurant.address }`, 
                    {
                        mode: 'no-cors',
                        cache: 'force-cache',
                        referrer: window.location.origin,
                        referrerPolicy: 'origin-when-cross-origin',
                        headers: new Headers({
                            "Accept"       : "application/json",
                            "Content-Type" : "application/json",
                            "User-Agent"   : "Tryeat.me v.2.0.0 contact nguyen.ismail@gmail.com"
                        }),
                    }
                    )
                    .then(response => response.json())
                    .then(json => {
                        if (json.length) {
                            var latitude = parseFloat(json[0].lat);  
                            var longitude = parseFloat(json[0].lon);

                            this.addSecondaryMarker({ locationId: restaurant.id, locationName: restaurant.name, longitude: longitude, latitude: latitude })
                        }
                    })
            },

            addRestaurantsToMap: function () {
                for (var i = 0; i < this.restaurants.length; i++) {

                    //debounce(() => {
                    // if coordinates are not present, find coordinates using address
                    if (this.restaurants[i].latitude == null || this.restaurants[i].longitude == null) {
                        this.fetchRestaurantLocation(this.restaurants[i]);
                    }
                    else {
                        var latitude = parseFloat(this.restaurants[i].latitude);  
                        var longitude = parseFloat(this.restaurants[i].longitude);

                        this.addSecondaryMarker({ locationId: this.restaurants[i].id, locationName: this.restaurants[i].name, longitude: longitude, latitude: latitude })
                    }
                    //}, 1000);
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
                this.selectedRestaurant.name = '';
            },

            showRestaurantDetails: function(event) {
                var feature = this.map.forEachFeatureAtPixel(event.pixel,
                    function(feature) {
                        return feature;
                    });
                    if (feature) {
                        var restaurantId = feature.get('id');

                        if (restaurantId === 0)
                            return;
                        
                        this.selectedRestaurant = this.restaurants.find(restaurant => restaurant.id === restaurantId);
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

                this.addMarker({ locationId: 0, locationName: locationName, longitude: longitude, latitude: latitude, style: style });
            },

            addSecondaryMarker: function ({ locationId, locationName, longitude, latitude }) {
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

                this.addMarker({ locationId: locationId, locationName: locationName, longitude: longitude, latitude: latitude, style: style });
            },

            addMarker: function ({ locationId, locationName, longitude, latitude, style }) {
                this.map.addLayer(new VectorLayer({
                    source: new Vector({
                        features: [
                            new Feature({
                                id: locationId,
                                name: locationName,
                                geometry: new Point(
                                        transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
                                    )
                            })
                        ]
                    }),
                    style: style
                }));
            },

            selectedRestaurantMapUrl: function () {
                let query = this.selectedRestaurant.name;

                if (this.selectedRestaurant.address)
                    query = `${query} ${this.selectedRestaurant.address}`

                return `https://www.google.com/maps/search/?api=1&query=${query}`;
            }
        }
    }
</script>

<style scoped>
    .map {
        width: 100%;
        height: 100%;
        position: fixed;
    }

    .details-popup {
        z-index: 999;
        position: absolute;
        bottom: 145px;
        background: #292e4f;
        width: 100%;
        padding: 10px;
        text-align: center;
    }

    .details-popup .title {
        color: #eb4b8a;
        font-size: 2rem;
        font-weight: 700;
    }
</style>
