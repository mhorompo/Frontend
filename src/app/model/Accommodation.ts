export interface Accommodation {
    id?: number;
    userId: number;
    name: string;
    city: string;
    zipCode: string;
    streetName: string;
    description: string;
    longitude: number;
    latitude: number;
    price: any;
    freeParking: boolean;
    airConditioning: boolean;
    barrierFree: boolean;
    breakfastIncluded: boolean;
    freeWifi: boolean;
    reception: boolean;
}