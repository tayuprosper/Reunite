// use authService to update profile
import { authService } from "@/services/auth/authservice";

export const POST = async (request: Request) => {
    try {
        const { full_name, phone, email, avatar_url } = await request.json();
        console.log("Received profile update data:", { full_name, phone, email, avatar_url });

        if (!email) {
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }

        const updatedUser = await authService.updateProfile({ full_name, phone, email, avatar_url });
        console.log("Profile update successful:", updatedUser);

        return new Response(JSON.stringify({ success: true, user: updatedUser }), { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(JSON.stringify({ error: "Failed to update profile" }), { status: 500 });
    }
};