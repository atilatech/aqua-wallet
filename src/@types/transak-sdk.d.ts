declare module '@transak/transak-sdk' {
    export enum Foo {
        STAGING = "STAGING",
        PRODUCTION = "PRODUCTION"
    } 
    export interface Settings {
      apiKey: string;
      environment: string; // tried to set this to be ->  environment: 'STAGING' | 'PRODUCTION', but it gave error: 'string is not assignable to type 'STAGING' | 'PRODUCTION''
      defaultCryptoCurrency: string;
      themeColor: string;
      hostURL: string;
      widgetHeight: string;
      widgetWidth: string;
    }
  
    export interface EventData {
      [key: string]: any;
    }
  
    export interface OrderData {
      [key: string]: any;
    }
  
    export default class Transak {
      public readonly ALL_EVENTS = 'ALL_EVENTS';
      public readonly ERROR = 'TRANSAK_ERROR';
      public readonly EVENTS: {
        TRANSAK_ORDER_CANCELLED: "TRANSAK_ORDER_CANCELLED"
        TRANSAK_ORDER_CREATED: "TRANSAK_ORDER_CREATED"
        TRANSAK_ORDER_FAILED: "TRANSAK_ORDER_FAILED"
        TRANSAK_ORDER_SUCCESSFUL: "TRANSAK_ORDER_SUCCESSFUL"
        TRANSAK_WIDGET_CLOSE: "TRANSAK_WIDGET_CLOSE"
        TRANSAK_WIDGET_CLOSE_REQUEST: "TRANSAK_WIDGET_CLOSE_REQUEST"
        TRANSAK_WIDGET_INITIALISED: "TRANSAK_WIDGET_INITIALISED"
        TRANSAK_WIDGET_OPEN: "TRANSAK_WIDGET_OPEN"
      };
  
      constructor(settings: Settings);
  
      public init(): void;
      public on(event: string, callback: (data: EventData) => void): void;
      public close(): void;
    }
}
