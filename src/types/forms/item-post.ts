type ItemPost = {
    itemName: string;
    itemDescription: string;
    itemLocation: string;
    image: FileList; // Assuming image is uploaded as a FileList
    dateFound: string; // ISO date string
    collectableAt?: string; // Optional field
    itemCategory: string; // e.g., "document", "gadget", etc.
    status?: string; // e.g., "lost", "found"
  };
  
  export default ItemPost;