import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

serve(async (req) => {
  // Only handle POST requests
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await req.json();

    // Paddle sends events in a specific format
    const event = body.data?.type || body.event_type;
    const customData = body.data?.custom_data || {};
    const userId = customData.user_id;

    console.log(`Received Paddle event: ${event}`);

    // Handle subscription activated event
    if (event === "subscription.activated" || event === "subscription.created") {
      if (!userId) {
        throw new Error("Missing user_id in custom_data");
      }

      const priceId = body.data?.items?.[0]?.price?.id || body.price_id;
      let plan = "free";

      // Determine plan based on price ID
      if (priceId === "pri_pro_12345") {
        // Replace with your actual Pro price ID
        plan = "pro";
      } else if (priceId === "pri_agency_12345") {
        // Replace with your actual Agency price ID
        plan = "agency";
      }

      // Update user's plan in your database
      const { error } = await supabase
        .from("user_subscriptions")
        .upsert(
          {
            user_id: userId,
            plan: plan,
            subscription_id: body.data?.id || body.subscription_id,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      console.log(`Updated user ${userId} to plan: ${plan}`);
    }

    // Handle subscription canceled event
    if (event === "subscription.canceled") {
      const { error } = await supabase
        .from("user_subscriptions")
        .update({
          plan: "free",
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      console.log(`Downgraded user ${userId} to free plan`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
});
