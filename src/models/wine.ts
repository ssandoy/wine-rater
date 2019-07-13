

export default interface Wine {
    id: string;
    name: string;
    type: string;
    year: Long;
    pairs_to?: string[];
    ratings?: string; // TODO: FIX 
    image_url?: string;

}
