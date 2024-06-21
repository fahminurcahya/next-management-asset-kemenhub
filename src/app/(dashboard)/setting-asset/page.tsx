
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs"
import TabList from "./tab-list";
import TabContentKategoriAsset from "./(kategori-asset)/tab-content";
import TabContentJenisAsset from "./(jenis-asset)/tab-content";
import TabContentSatuanAsset from "./(satuan-asset)/tab-content";
import { auth } from "@/auth";
import Forbidden from "@/components/forbidden";

const SettingAssetPage = async () => {

    const session = await auth();

    if (session?.user.role != "ADMIN") {
        return (
            <Forbidden />
        )
    }

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardContent className="pt-4">
                    <Tabs defaultValue="week">
                        <TabList />
                        <TabsContent value="tab-kategori-asset">
                            <TabContentKategoriAsset />
                        </TabsContent>
                        <TabsContent value="tab-jenis-asset">
                            <TabContentJenisAsset />
                        </TabsContent>
                        <TabsContent value="tab-satuan-asset">
                            <TabContentSatuanAsset />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>

    );
}

export default SettingAssetPage;

