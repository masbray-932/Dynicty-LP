import { submitContact } from "@/lib/api";
import { trackMetaLead } from "@/lib/metaPixel";

export const submitContactLead = async (payload, context = {}) => {
  const response = await submitContact(payload);
  trackMetaLead({
    form_type: "contact",
    source: context.source || "contact-page",
    selected_plan: context.selectedPlan || "unspecified",
    lead_channel: context.leadChannel || "unspecified",
  });
  return response;
};
