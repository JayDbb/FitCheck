export interface Post {
    writterID: string,
    createdDate: string,
    ratings: [{}],
    comments: [{}],
    taggedClothes: [{
        taggedShirt: string,
        taggedPants: string,
        taggedShoes: String
    }],
    overallRating: Number,
    type: string,
    imageURL:  string,
    caption: string,
    searchTags: [string],
    AIrating: Number,
    category: string;
  }