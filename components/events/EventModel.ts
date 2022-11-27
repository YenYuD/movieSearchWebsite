export interface EventProps{
    key:string,
    id:string,
    title:string,
    date:string,
    image:string,
    location:string
}

export interface FeaturedEventsModel{
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    image: string;
    isFeatured: boolean;
}