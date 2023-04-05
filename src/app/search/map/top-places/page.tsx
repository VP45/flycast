"use client"
// const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { BsBack } from 'react-icons/bs';
import { IoArrowUndo } from 'react-icons/io5';
import Navbar from '../../../../../components/Navbar';
import { AppContext } from "../../../../../context/AppContext";
import { Airport } from '../../../../../types/Airport';
import { TouristPlace } from '../../../../../types/Tourism';

export default function Home() {
    const [Map, setMap] = useState<mapboxgl.Map>();
    const [pageIsMounted, setPageIsMounted] = useState(false);

    // const { dstForMap, topPlaces } = useContext(AppContext);
    const [dstForMap, setDstForMap] = useState<Airport>();
    const [clickedTopPlace, setClickedTopPlace] = useState<TouristPlace>();
    const [topPlaces, setTopPlaces] = useState<TouristPlace[]>([]);

    // const stores = {
    //     'type': 'FeatureCollection',
    //     'features': [
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.034084142948, 38.909671288923]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(202) 234-7336',
    //                 'phone': '2022347336',
    //                 'address': '1471 P St NW',
    //                 'city': 'Washington DC',
    //                 'country': 'United States',
    //                 'crossStreet': 'at 15th St NW',
    //                 'postalCode': '20005',
    //                 'state': 'D.C.'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.049766, 38.900772]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(202) 507-8357',
    //                 'phone': '2025078357',
    //                 'address': '2221 I St NW',
    //                 'city': 'Washington DC',
    //                 'country': 'United States',
    //                 'crossStreet': 'at 22nd St NW',
    //                 'postalCode': '20037',
    //                 'state': 'D.C.'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.043929, 38.910525]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(202) 387-9338',
    //                 'phone': '2023879338',
    //                 'address': '1512 Connecticut Ave NW',
    //                 'city': 'Washington DC',
    //                 'country': 'United States',
    //                 'crossStreet': 'at Dupont Circle',
    //                 'postalCode': '20036',
    //                 'state': 'D.C.'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.0672, 38.90516896]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(202) 337-9338',
    //                 'phone': '2023379338',
    //                 'address': '3333 M St NW',
    //                 'city': 'Washington DC',
    //                 'country': 'United States',
    //                 'crossStreet': 'at 34th St NW',
    //                 'postalCode': '20007',
    //                 'state': 'D.C.'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.002583742142, 38.887041080933]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(202) 547-9338',
    //                 'phone': '2025479338',
    //                 'address': '221 Pennsylvania Ave SE',
    //                 'city': 'Washington DC',
    //                 'country': 'United States',
    //                 'crossStreet': 'btwn 2nd & 3rd Sts. SE',
    //                 'postalCode': '20003',
    //                 'state': 'D.C.'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-76.933492720127, 38.99225245786]
    //             },
    //             'properties': {
    //                 'address': '8204 Baltimore Ave',
    //                 'city': 'College Park',
    //                 'country': 'United States',
    //                 'postalCode': '20740',
    //                 'state': 'MD'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.097083330154, 38.980979]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(301) 654-7336',
    //                 'phone': '3016547336',
    //                 'address': '4831 Bethesda Ave',
    //                 'cc': 'US',
    //                 'city': 'Bethesda',
    //                 'country': 'United States',
    //                 'postalCode': '20814',
    //                 'state': 'MD'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.359425054188, 38.958058116661]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(571) 203-0082',
    //                 'phone': '5712030082',
    //                 'address': '11935 Democracy Dr',
    //                 'city': 'Reston',
    //                 'country': 'United States',
    //                 'crossStreet': 'btw Explorer & Library',
    //                 'postalCode': '20190',
    //                 'state': 'VA'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.10853099823, 38.880100922392]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(703) 522-2016',
    //                 'phone': '7035222016',
    //                 'address': '4075 Wilson Blvd',
    //                 'city': 'Arlington',
    //                 'country': 'United States',
    //                 'crossStreet': 'at N Randolph St.',
    //                 'postalCode': '22203',
    //                 'state': 'VA'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-75.28784, 40.008008]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(610) 642-9400',
    //                 'phone': '6106429400',
    //                 'address': '68 Coulter Ave',
    //                 'city': 'Ardmore',
    //                 'country': 'United States',
    //                 'postalCode': '19003',
    //                 'state': 'PA'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-75.20121216774, 39.954030175164]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(215) 386-1365',
    //                 'phone': '2153861365',
    //                 'address': '3925 Walnut St',
    //                 'city': 'Philadelphia',
    //                 'country': 'United States',
    //                 'postalCode': '19104',
    //                 'state': 'PA'
    //             }
    //         },
    //         {
    //             'type': 'Feature',
    //             'geometry': {
    //                 'type': 'Point',
    //                 'coordinates': [-77.043959498405, 38.903883387232]
    //             },
    //             'properties': {
    //                 'phoneFormatted': '(202) 331-3355',
    //                 'phone': '2023313355',
    //                 'address': '1901 L St. NW',
    //                 'city': 'Washington DC',
    //                 'country': 'United States',
    //                 'crossStreet': 'at 19th St',
    //                 'postalCode': '20036',
    //                 'state': 'D.C.'
    //             }
    //         }
    //     ]
    // };

    const [topPlacesGeoJson, setTopPlacesGeoJson] = useState<any>(null);

    mapboxgl.accessToken = 'pk.eyJ1IjoibG9ncmFzc285NiIsImEiOiJjanUzZ2cxNW0wMmtoM3pvMmtzb2w4ZGJuIn0.zqK9cllpLJugxixeSqOKGQ';

    /**
     * Assign a unique id to each store. You'll use this `id`
     * later to associate each point on the map with a listing
     * in the sidebar.
     */
    // stores.features.forEach((store, i) => {
    //     store.properties.id = i;
    // });


    useEffect(() => {
        if (clickedTopPlace) {
            setTimeout(() => {
                const clickedPlace = {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [clickedTopPlace.geometry.location.lng, clickedTopPlace.geometry.location.lat]
                    },
                    'properties': {
                        "photos": clickedTopPlace.photos,
                        "place_id": clickedTopPlace.place_id,
                        "icon": clickedTopPlace.icon,
                        "name": clickedTopPlace.name,
                        "icon_background_color": clickedTopPlace.icon_background_color,
                        "icon_mask_base_uri": clickedTopPlace.icon_mask_base_uri,
                        "rating": clickedTopPlace.rating,
                        "user_ratings_total": clickedTopPlace.user_ratings_total,
                        "vicinity": clickedTopPlace.vicinity,
                        "reference": clickedTopPlace.reference
                    }
                }
                createPopUp(clickedPlace)
                flyToStore(clickedPlace)
            }, 200)
        }
    }, [clickedTopPlace, setClickedTopPlace])


    useEffect(() => {
        if (topPlaces && topPlaces.length > 0) {
            const tempTopPlacesGeoJson = {
                'type': 'FeatureCollection',
                'features': topPlaces?.map((topPlace) => {
                    return {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [topPlace?.geometry?.location?.lng, topPlace?.geometry?.location?.lat]
                        },
                        'properties': {
                            "photos": topPlace.photos,
                            "place_id": topPlace.place_id,
                            "icon": topPlace.icon,
                            "name": topPlace.name,
                            "icon_background_color": topPlace.icon_background_color,
                            "icon_mask_base_uri": topPlace.icon_mask_base_uri,
                            "rating": topPlace.rating,
                            "user_ratings_total": topPlace.user_ratings_total,
                            "vicinity": topPlace.vicinity,
                            "reference": topPlace.reference
                        }
                    }
                })
            }

            setTopPlacesGeoJson(tempTopPlacesGeoJson);
        }
    }, [topPlaces, setTopPlaces])

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        // initialising map....
        if (dstForMap) {
            const map = new mapboxgl.Map({
                container: 'map',
                style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10',
                // center: [78.9629, 20.5937]
                center: dstForMap
                    ? [dstForMap?.lon, dstForMap?.lat]
                    : (topPlaces?.length > 0
                        ? [topPlaces[0]?.geometry?.location?.lng, topPlaces[0]?.geometry?.location?.lat]
                        : (clickedTopPlace
                            ? [clickedTopPlace?.geometry?.location?.lng, clickedTopPlace?.geometry?.location?.lat]
                            : [77.2090, 28.6139])),
                zoom: 10.5,
                // scrollZoom: false
            });

            // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl(), 'top-right');
            setMap(map);
        }
    }, [dstForMap]);

    useEffect(() => {
        setTopPlaces(localStorage.getItem('topPlaces') ? JSON.parse(localStorage.getItem('topPlaces') || '') : null)
        setDstForMap(localStorage.getItem('dstForMap') ? JSON.parse(localStorage.getItem('dstForMap') || '') : null)
        // render page after all processes are done :)
        setPageIsMounted(true);
    }, []);

    useEffect(() => {
        if (pageIsMounted && topPlacesGeoJson) {
            Map?.on('load', () => {
                Map?.addSource('places', {
                    'type': 'geojson',
                    'data': topPlacesGeoJson
                });
                buildLocationList(topPlacesGeoJson);
                addMarkers();

                // fly to clicked topPlace....
                setClickedTopPlace(localStorage.getItem('clickedTopPlace') ? JSON.parse(localStorage.getItem('clickedTopPlace') || '') : null)
            });
        }

    });


    /**
     * Add a marker to the map for every store listing.
     **/
    function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        for (const marker of topPlacesGeoJson.features) {
            /* Create a div element for the marker. */
            const el = document.createElement('div');
            /* Assign a unique `id` to the marker. */
            el.id = `marker-${marker?.properties?.place_id}`;
            /* Assign the `marker` class to each marker for styling. */
            el.className = 'marker marker--topPlaces';

            /**
             * Create a marker using the div element
             * defined above and add it to the map.
             **/
            new mapboxgl.Marker(el, { offset: [0, -23] })
                .setLngLat(marker.geometry.coordinates)
                .addTo(Map!);

            /**
             * Listen to the element and when it is clicked, do three things:
             * 1. Fly to the point
             * 2. Close all other popups and display popup for clicked store
             * 3. Highlight listing in sidebar (and remove highlight for all other listings)
             **/
            el.addEventListener('click', (e) => {
                /* Fly to the point */
                flyToStore(marker);
                /* Close all other popups and display popup for clicked store */
                createPopUp(marker);
                /* Highlight listing in sidebar */
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(
                    `listing-${marker?.properties?.place_id}`
                );
                listing?.classList.add('active');
            });
        }
    }

    /**
     * Add a listing for each store to the sidebar.
     **/
    function buildLocationList(topPlacess: any) {
        for (const store of topPlacess?.features) {
            /* Add a new listing section to the sidebar. */
            const listings = document.getElementById('listings');
            if (listings) {
                const listing = listings.appendChild(document.createElement('div'));
                /* Assign a unique `id` to the listing. */
                listing.id = `listing-${store?.properties?.place_id}`;
                /* Assign the `item` class to each listing for styling. */
                listing.className = 'item';

                /* Add the link to the individual listing created above. */
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'title';
                link.id = `link-${store?.properties?.place_id}`;
                link.innerHTML = `${store?.properties?.name}`;

                listing.appendChild(link);
                /* Add details to the individual listing. */
                const details = listing.appendChild(document.createElement('div'));
                details.innerHTML = `${store?.properties?.vicinity}`;
                // if (store.rating) {
                //     details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
                // }

                /**
                 * Listen to the element and when it is clicked, do four things:
                 * 1. Update the `currentFeature` to the store associated with the clicked link
                 * 2. Fly to the point
                 * 3. Close all other popups and display popup for clicked store
                 * 4. Highlight listing in sidebar (and remove highlight for all other listings)
                 **/
                link.addEventListener('click', function () {
                    for (const feature of topPlacess.features) {
                        if (this.id === `link-${feature?.properties?.place_id}`) {
                            flyToStore(feature);
                            createPopUp(feature);
                        }
                    }
                    const activeItem = document.getElementsByClassName('active');
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    // this.parentNode?.classList.add('active');
                    this.parentElement?.classList?.add('active');
                });
            }
        }
    }

    /**
     * Use Mapbox GL JS's `flyTo` to move the camera smoothly
     * a given center point.
     **/
    function flyToStore(currentFeature: any) {
        Map?.flyTo({
            center: currentFeature.geometry.coordinates,
            zoom: 15
        });
    }

    /**
     * Create a Mapbox GL JS `Popup`.
     **/
    function createPopUp(currentFeature: any) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();
        const popup = new mapboxgl.Popup({ closeOnClick: false })
            .setLngLat(currentFeature?.geometry?.coordinates)
            .setHTML(
                `<h3>${currentFeature?.properties?.name}</h3><h4>${currentFeature?.properties.vicinity}</h4>`
            )
            .addTo(Map!);
    }


    return (
        <div className='w-screen relative h-fit'>
            <div className='absolute top-6 left-6 z-10 md:hidden'>
                <IoArrowUndo
                    onClick={() => history.back()}
                    className="text-[#ff6f2a] hover:text-[#d8581d] w-6 h-6 cursor-pointer"
                />
            </div>
            <div className='sidebar'>
                <div className='heading flex flex-row space-x-2 justify-start items-center'>
                    <IoArrowUndo
                        className="text-white hover:text-gray-200 w-6 h-6 cursor-pointer"
                        onClick={() => history.back()}
                    />
                    <h1>Top Places</h1>
                </div>
                <div id='listings' className='listings'></div>
            </div>
            <div id="map" className="map"></div>
        </div>
    )
}
