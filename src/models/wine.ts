
// TODO: APPLY.
export default interface Wine {
    id: string;
    name: string;
    type: string;
    year: Long;
    fitsTo: string[];
    ineRating: number; // TODO: FIX
    sanderRating: number; 
    grape: string;
    region: string;
    country: string; 
    image_url?: string;

}
