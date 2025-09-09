import React, { useState } from 'react'
import { FormBuilder, FormField } from '../form-builder';
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react';
import { fileUploadService } from '@/services/fileUpload/fileUploadService';
import { useSupabase } from '@/lib/supabase/supabase-provider';
import { itemUploadService } from '@/services/Upload/itemUpload';
import { useRouter } from 'next/navigation';
import ItemPost from '@/types/forms/item-post';
const postItemForm: FormField[] = [
  {
    name: "itemName",
    label: "Item Name",
    type: "text",
    required: true,
    placeholder: "Enter Item Name"

  },
  {
    name: "itemDescription",
    label: "Item Description",
    required: true,
    type: "textarea",
    placeholder: "Give detail description of the item..."
  },
  {
    name: "itemCategory",
    label: "Category",
    required: true,
    type: "select",
    options: [
      { label: "Gadget", value: "gadget" },
      { label: "Clothing", value: "clothing" },
      { label: "Accessories", value: "accessories" },
      { label: "Documents", value: "documents" },
      { label: "Others", value: "others" },
    ],
    placeholder: "Select a category"
  },
  {
    name: "itemLocation",
    label: "location",
    required: true,
    type: "text",
    placeholder: "Where did you find this item?"
  },
  {
    name: "dateFound",
    label: "Date Found",
    type: "date",
    required: true,
    placeholder: "When did you find this item?"
  },
  {
    name: "collectableAt",
    label: "Collectable At",
    type: "text",
    required: false,
    placeholder: "Where can the owner collect the item?"
  },
  {
    name: "image",
    label: "Upload an image",
    type: "file",
    required: true,
  },]
const PostItemForm = () => {
  const [uploadError, setUploadError] = useState("");
  const { user } = useSupabase();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const postItem = async (formData: ItemPost)=>{
    setUploading(true);
    const fileList = formData.image as unknown as FileList;
    const file: File = fileList[0];

    if (file){
      const url = await fileUploadService.uploadFile(file,user?.id);
      if (!url) {
        setUploadError("Failed to upload file. Please Try Again");
        return;
      }
      console.log(uploadError)
      console.log("File upoadeded! Public URL: ", url);
      const dataForUpload: Record<string,string> = {
        userid: user?.id ?? "",
        title: formData.itemName,
        description: formData.itemDescription,
        location: formData.itemLocation,
        status: "found",
        img_url: url,
        date_found: formData.dateFound,
        collectable_at: formData.collectableAt || "Not Specified",
        category: formData.itemCategory
      };
      console.log("Data for upload: ", dataForUpload);
      const uploadRes = await itemUploadService.uploadItem(dataForUpload);
      if (!uploadRes){
        setUploadError("Failed to upload item. Please Try Again");
        setUploading(false);
        return;
      }
      setUploading(false);
      router.push("/all-items");
      
    }

  }
  return (

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] md:w-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <div className='flex justify-between items-center'>
          <Dialog.Title className="text-lg font-semibold mb-4">
            Post Item
          </Dialog.Title>
           <Dialog.Close asChild>
            <X/>
          </Dialog.Close>
        </div>
          
          <FormBuilder
            fields={postItemForm}
            submitLabel= {` ${uploading ?  "..." : "Post Item" }`}
            onSubmit={postItem}
          />
         
        </Dialog.Content>
      </Dialog.Portal>
    
  )
}

export default PostItemForm;