"use client";
import { LoaderCircleIcon, LogOut, PenSquare, Settings, Table2Icon, Trash2 } from "lucide-react";
import React from "react";
import Image from "next/image";
import ConfirmationDialog from "../confirmation-dialog";
import { useRouter } from "next/navigation";
import PostItemForm from "./post-item-form";
import * as Dialog from "@radix-ui/react-dialog";
import UpdateProfileForm from "./update-profile-form";
import { useSupabase } from "@/lib/supabase/supabase-provider";
import { ProfileSkeleton } from "../skeletons/profile-skeleton";

const ProfileInfo = () => {
  const router = useRouter();
  const { user: supabaseUser, supabase } = useSupabase();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);

  const signout = async () => {
    setSigningOut(true);
    try {
      await supabase.auth.signOut(); // ✅ simpler: directly sign out
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out failed", error);
      alert("Oops!! Failed to sign out, please try again");
    } finally {
      setSigningOut(false);
    }
  };

  if (!supabaseUser) {
    // While user is loading or not logged in
    return (
      <ProfileSkeleton/>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {showDeleteDialog && (
        <ConfirmationDialog
          type="warning"
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={() => {
            console.log("Account deleted");
            setShowDeleteDialog(false);
          }}
          title="Delete Account"
          content="Are you sure you want to delete your account?"
        />
      )}

      <div className="info flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-lg shadow-md md:mt-7 mt-10 mb-6 gap-6">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto mb-4 md:mb-0">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden shrink-0">
            <Image
              src={supabaseUser.user_metadata?.avatar_url || "https://picsum.photos/300/300"}
              fill
              alt="profile image"
              className="object-cover"
            />
          </div>

          <div className="name flex flex-col gap-2 text-center sm:text-left">
            <h1 className="font-bold text-xl sm:text-2xl">
              {supabaseUser.user_metadata?.full_name ?? "Anonymous"}
            </h1>
            <div className="text-gray-600">
              <p>{supabaseUser.email}</p>
              <span className="font-bold text-xs block mt-1">
                Joined{" "}
                {new Date(supabaseUser.created_at!).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div
              className="signout flex gap-2 justify-center sm:justify-start text-sm font-bold text-gray-600 cursor-pointer items-center hover:text-red-500 transition-colors"
              onClick={signout}
            >
              <h1>Sign Out</h1>
              <LogOut color="red" height={15} width={15} />
              {signingOut && (
                <LoaderCircleIcon height={15} width={15} className="animate-spin ml-1" />
              )}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="actions grid grid-cols-2 sm:flex sm:flex-col gap-3 w-full sm:w-auto">
          <div className="top flex flex-col sm:flex-row gap-3 col-span-2 sm:col-span-1">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="p-2 flex font-bold text-xs bg-blue-600 text-white rounded-sm items-center gap-2">
                  <Table2Icon width={15} height={15} />
                  Post an item
                </button>
              </Dialog.Trigger>
              <PostItemForm />
            </Dialog.Root>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="flex justify-center cursor-pointer font-bold text-xs bg-green-600 text-white p-2 rounded-sm items-center gap-2 hover:bg-green-700 transition-colors">
                  <PenSquare height={15} width={15} />
                  <span>Edit Profile</span>
                </button>
              </Dialog.Trigger>
              <UpdateProfileForm />
            </Dialog.Root>
          </div>

          <div className="bottom flex flex-col sm:flex-row gap-3 col-span-2 sm:col-span-1">
            <button className="flex justify-center cursor-pointer items-center gap-2 rounded-sm text-xs font-bold p-2 shadow-sm hover:bg-gray-100 transition-colors">
              <Settings width={15} height={15} />
              <span>Account Settings</span>
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex justify-center bg-red-600 cursor-pointer items-center font-bold text-xs p-2 rounded-sm gap-2 text-white hover:bg-red-700 transition-colors"
            >
              <Trash2 height={15} width={15} />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
