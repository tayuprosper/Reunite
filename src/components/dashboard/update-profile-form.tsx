
import React, { useEffect, useState, useMemo } from "react";
import { FormBuilder, FormField } from "../form-builder";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { useRouter } from "next/navigation";
import { fileUploadService } from "@/services/fileUpload/fileUploadService";




const UpdateProfileForm = () => {
  const [uploading, setUploading] = useState(false);
  const { user: supabaseUser } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (supabaseUser === null) {
      // Handle unauthenticated state
      console.log("No user logged in");
      router.push("/auth/login");
    }
  }, [supabaseUser, router]);

  const updateProfile = async (formData: Record<string, unknown>) => {
    setUploading(true);
    const filelist = formData.profilePicture as unknown as FileList;
    const file = filelist[0];

    if (file) {
      const file_url = await fileUploadService.uploadFile(file, supabaseUser?.id);
      if (!file_url) {
        alert("Failed to upload profile picture. Please try again.");
        setUploading(false);
        return;
      }
      console.log("Profile update data: ", formData);
    console.log("fileUrl that will be added: ", file_url);
    try {
      const req = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          avatar_url: file_url,
        }),
      });
      const res = await req.json();
      if (!req.ok) {
        if (req.status === 500) {
          alert("An unknown error occurred. Try again");
        } else if (req.status === 400) {
          alert(res.error);
        }
      }
      if (res.success) {
        alert("Profile updated successfully");
        router.refresh(); // Refresh to get updated user data
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
    setUploading(false);
    }
    }
    
  };

  const formData: FormField[] = useMemo(
    () => [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
        defaultValue: supabaseUser?.user_metadata?.full_name ?? "",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        defaultValue: supabaseUser?.email ?? "",
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "text",
        required: false,
        placeholder: "Enter your phone number",
        defaultValue: supabaseUser?.user_metadata?.phone ?? "",
      },
      {
        name: "profilePicture",
        label: "Profile Picture",
        type: "file",
        required: false,
        defaultValue: supabaseUser?.user_metadata?.avatar_url ?? "",
      }
    ],
    [supabaseUser]
  );

  if (!supabaseUser) return null; // or a spinner

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] md:w-[50%] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Update Profile
          </Dialog.Title>
          <Dialog.Close asChild>
            <button>
              <X />
            </button>
          </Dialog.Close>
        </div>

        <FormBuilder
          fields={formData}
          submitLabel={uploading ? "..." : "Save Changes"}
          onSubmit={updateProfile}
        />
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default UpdateProfileForm;
