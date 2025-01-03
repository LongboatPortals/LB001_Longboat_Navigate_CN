/*
export const sample=[
    {
        country: 'Ireland',
        countryISO: 'IE',
        states: [
            {
                name: 'Dublin',
                sites: [
                    {
                        name: 'Test site 1',
                        position: {
                            lat: 53.3498,
                            lng: -6.2603
                        }
                    }
                ]
            }
        ],
    },
    {
        country: 'United States',
        countryISO: 'US',
        states: [
            {
                name: 'New York',
                stateISO: 'NY',
                sites: [
                    {
                        name: 'New York',
                        position: {
                            lat: 40.7128,
                            lng: -74.0060
                        }
                    }
                ]
            },
            {
                name: 'California',
                sites: [
                    {
                        name: 'Los Angeles',
                        position: {
                            lat: 34.0522,
                            lng: -118.2437
                        }
                    }
                ]
            },
            {
                name: 'Illinois',
                sites: [
                    {
                        name: 'Chicago',
                        position: {
                            lat: 41.8781,
                            lng: -87.6298
                        }
                    }
                ]
            }
        ],
    }
]
*/

export const siteData = [

    /*==========================================================================
                                   Ireland
    ==========================================================================  */
    {
        id: "ie",
        name: "Ireland",
        states: [
            {
                active: true,
                id: "12345",
                name: "Test Site 1",
                address: 'Dublin, Ireland',
                email: 'email@example.com',
                position: {
                    lat: 53.3498,
                    lng: -6.2603
                }
            },
            {
                active: true,
                id: "6789",
                name: "Test Site 2",
                address: 'Dublin, Ireland',
                email: 'email@example.com',
                position: {
                    lat: 53.3498,
                    lng: -6.2603
                }
            }
        ]
    },

        /*==========================================================================
                                   United States
    ==========================================================================  */
    {
        id: "us",
        name: "United States",
        states: [
            {
                active: true,
                id: "840019",
                name: "University of South Alabama - Division of Clinical Research",
                address: 'Mobile, Alabama',
                email: 'email@example.com',
                position: {
                    lat: 30.695365,
                    lng: -88.175715
                }
            },
            {
                active: true,
                id: "840023",
                name: "Clearview Cancer Institute",
                address: 'Huntsville, Alabama',
                email: 'email@example.com',
                position: {
                    lat: 34.730369,
                    lng: -86.586104
                }
            },
            {
                active: true,
                id: "840021",
                name: "University of Alabama at Birmingham",
                address: 'Birmingham, Alabama',
                email: 'email@example.com',
                position: {
                    lat: 33.5053,
                    lng: -86.8104
                }
            },
            {
                active: true,
                id: "840038",
                name: "Mayo Clinic - Scottsdale",
                address: 'Scottsdale, Arizona',
                email: 'email@example.com',
                position: {
                    lat: 33.619,
                    lng: -111.887
                }
            },
            {
                active: true,
                id: "840070",
                name: "Banner Health-  MD Anderson Cancer Center",
                address: 'Gilbert, Arizona',
                email: 'email@example.com',
                position: {
                    lat: 33.619,
                    lng: -111.887
                }
            },
          
        ]
    }
];
