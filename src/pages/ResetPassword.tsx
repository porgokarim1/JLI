import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePasswordReset = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Error searching for user:", error);
        toast({
          title: "Error",
          description: "No user found with that email.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const userId = data?.id;
      if (!userId) {
        toast({
          title: "Error",
          description: "User not found.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { error: procedureError } = await supabase.rpc(
        "resend_student_password_email",
        { user_id: userId }
      );

      if (procedureError) {
        console.error("Error calling procedure:", procedureError);
        toast({
          title: "Error",
          description: "The email could not be sent. Please try again later.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Success",
        description: "Reset email sent successfully.",
      });
    } catch (err) {
      console.error("Error in handlePasswordReset:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Enter your email and we will send you a link to reset your password.
        </p>
        <div className="mt-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1"
          />
        </div>
        <Button
          onClick={handlePasswordReset}
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send reset email"}
        </Button>
      </div>
    </div>
  );
}