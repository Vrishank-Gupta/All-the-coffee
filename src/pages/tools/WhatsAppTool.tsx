import { ToolPageLayout } from "../../components/tools/ToolPageLayout";
import { WhatsAppDesk } from "../../components/tools/WhatsAppDesk";
import { toolBySlug } from "../../lib/tools/registry";

export default function WhatsAppTool() {
  return (
    <ToolPageLayout
      tool={toolBySlug("whatsapp-follow-ups")!}
      intro={<>Half of Indian business happens on WhatsApp, and half of it is "just following up". Keep your list here, see who's due today, and open each chat with the message already written.</>}
      howItWorks={
        <>
          <p>
            Each follow-up gets a "Send on WhatsApp" button. It opens WhatsApp (on your phone, or WhatsApp Web on a
            computer) with that person's chat and your message typed in. You still press send yourself, so nothing
            goes out by accident.
          </p>
          <p>
            Behind the button is WhatsApp's click-to-chat link. It needs the number in one exact form, country code
            and digits only, so the tool tidies whatever you type: 098200 12345, +91-98200-12345 and 9820012345 all
            become the same number.
          </p>
          <p>Your list is saved in this browser, on this device. Nothing is sent to All The Coffee.</p>
        </>
      }
    >
      <WhatsAppDesk />
    </ToolPageLayout>
  );
}
