import { contractDetailDummyData } from "@/data/dummy-contract"
import ContractDetailHeader from "./contract-detail-header"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ChatComponent from "./chat/chat-component"

export default function ContractDetail() {
  const data = contractDetailDummyData

  return (
    <section className="flex flex-col gap-8 sm:gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Badge variant={"secondary"}>{data.contractNumber}</Badge>
          <Badge className="uppercase">{data.status}</Badge>
        </div>
        <ContractDetailHeader
          requesterDetail={data.requester}
          workerDetail={data.worker}
          taskDetail={data.task}
          createdAt={data.createdAt}
          termsDetail={data.terms}
        />
      </div>
      <div className="w-full">
        <Tabs defaultValue="overview" className="w-full">
          {/* Put the border-b on a wrapper around TabsList (or directly on TabsList) */}
          <div className="w-full border-b">
            <TabsList variant="line">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="reports">Attachments</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="pt-4">
            {/* Overview content */}
          </TabsContent>

          <TabsContent value="chat" className="pt-4">
            <ChatComponent />
          </TabsContent>

          <TabsContent value="reports" className="pt-4">
            {/* Attachments content */}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
