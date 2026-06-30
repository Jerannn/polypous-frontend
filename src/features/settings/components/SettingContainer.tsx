import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Business from "./Business";
import DangerZone from "./DangerZone";
import Profile from "./Profile";

export default function SettingContainer() {
  return (
    <div>
      <Tabs defaultValue="profile" className="gap-8">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="delete">Delete Account</TabsTrigger>
        </TabsList>
        {/* profile settings */}
        <TabsContent value="profile">
          <Profile />
        </TabsContent>

        {/* subcription plan */}
        <TabsContent value="subscription">
          <h1>This feature is coming soon</h1>
        </TabsContent>

        {/* business settings */}
        <TabsContent value="business">
          <Business />
        </TabsContent>

        {/* delete account */}
        <TabsContent value="delete">
          <DangerZone />
        </TabsContent>
      </Tabs>
    </div>
  );
}
