import React from 'react';
import transakSDK from "@transak/transak-sdk";
import { Environment } from '../utils/Environment';

function BuySellCrypto() {

    const settings = {
        apiKey: Environment.TRANSAK_API_KEY,  // Your API Key
        environment: "STAGING", // STAGING/PRODUCTION
        defaultCryptoCurrency: 'ETH',
        themeColor: '000000', // App theme color
        hostURL: window.location.origin,
        widgetHeight: "700px",
        widgetWidth: "500px",
    }

    function openTransak() {
        const transak = new transakSDK(settings);

        transak.init();

        console.log({transakSDK, transak, settings, Environment})

        // To get all the events
        transak.on(transak.ALL_EVENTS, (data: any) => {
            console.log(data)
        });

        // This will trigger when the user closed the widget
        transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, (eventData: any) => {
            console.log(eventData);
            transak.close();
        });

        // This will trigger when the user marks payment is made.
        transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
            console.log(orderData);
            window.alert("Payment Success")
            transak.close();
        });
    }
    return (
        <div className="BuySellCrypto">
            <button onClick={openTransak} className='btn btn-primary'>
                Buy/Sell Crypto
            </button>
        </div>
    );
}

export default BuySellCrypto;