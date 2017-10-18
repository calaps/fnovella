let initialState = {

    auth: {
        user: null,
        // don't use this key after login, its just dummy flag for user selection.
        // instead use 'auth.user.driver.carrier'
        isOwner: false,
    },
    shipments: {
        count: 0,
        Shipment: [],
        selectedShipment: {},
        searchQuery: {

        }
    }

};

export default initialState;