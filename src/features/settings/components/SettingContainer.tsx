import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Profile from "./Profile";

export default function SettingContainer() {
  return (
    <div>
      <Tabs defaultValue="profile">
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
          <h1>SUBSCRIPTION</h1>
        </TabsContent>

        {/* business settings */}
        <TabsContent value="business">
          <h1>BUSINESS </h1>
        </TabsContent>

        {/* delete account */}
        <TabsContent value="delete">
          <h1>DELETE ACCOUNT</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}
