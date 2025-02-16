import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSection from "./container/account-section";
import SecuritySection from "./container/security-section";

export default function SettingsProfilePage() {
  return (
    <div className="flex w-full flex-col max-w-5xl mx-auto">
      <div className="flex flex-col ">
        <h1 className="text-3xl font-semibold">Profile</h1>
      </div>
      <Tabs
        defaultValue="account"
        className="grid grid-row md:grid-cols-12 w-full gap-x-4 "
      >
        <div className="col-span-2 py-3">
          <TabsList className="w-full flex justify-start p-0 bg-transparent pt-2">
            <nav className="flex flex-row md:flex-col w-full">
              <TabsTrigger value="account" className="rounded-sm ">
                <div className="w-full text-start">Account</div>
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-sm ">
                <div className="w-full text-start">Security</div>
              </TabsTrigger>
            </nav>
          </TabsList>
        </div>
        <div className="col-span-10">
          <TabsContent value="account">
            <div className="grid gap-6">
              <AccountSection />
            </div>
          </TabsContent>
          <TabsContent value="security">
            <div className="grid gap-6">
              <SecuritySection />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
