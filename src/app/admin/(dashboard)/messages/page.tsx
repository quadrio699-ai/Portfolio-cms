import { createClient } from "@/lib/supabase/server";
import { PageHeader, EmptyState } from "@/components/admin/ui";
import { MessageRow } from "@/components/admin/MessageRow";
import type { Message } from "@/lib/types";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Message[]>();

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Submissions from your site's contact form."
      />

      {!messages?.length ? (
        <EmptyState label="Nothing here yet." />
      ) : (
        <ul className="divide-y divide-line rounded-lg border border-line bg-paper">
          {messages.map((message) => (
            <MessageRow key={message.id} message={message} />
          ))}
        </ul>
      )}
    </div>
  );
}
